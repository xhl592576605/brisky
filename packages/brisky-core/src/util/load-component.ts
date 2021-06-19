/*
 * @description: 加载异步组件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-19 13:59:19
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-19 16:55:02
 */

import { defineAsyncComponent, defineComponent } from "vue"
import loadModule from '../util/load-module'
import { loadConfig } from "@brisky/api"
import _ from "lodash"
const loadComponent = (compKey: any, configKey: any, { props = {}, delay = 200, timeout = 3000, suspensible = false, loadingComponent = undefined, errorComponent = undefined } = {}) => {
  let component = null
  component = defineAsyncComponent(
    {
      // 工厂函数
      loader: () => new Promise<any>((resolve, reject) => {
        Promise.all([loadModule(compKey), loadConfig(configKey)]).then(([comp, config]) => {
          const _config = _.merge({}, props, config)
          const _comp = comp
          const _props = {}
          Object
            .entries(_comp.props || {}).forEach(([key, prop]) => {
              const value = _config[key]
              _props[key] = _.merge({}, prop)
              if (value === undefined) {
                return
              }
              // 如果是数组或者对象就构造成工厂
              _props[key].default = Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]'
                ? () => (value)
                : value
              // 已经是注入的情况，就不需要必填了
              _props[key].required = false
              // 数据备份
              _props[key].__injected__ = value
            })
          _.merge(_comp.props, _props)
          const component = defineComponent(_comp)
          resolve(component)
        }).catch(error => {
          reject()
          console.error(`【组件加载失败】：${compKey}`, error)
          return {}
        })
      }),
      // 加载异步组件时要使用的组件
      loadingComponent,
      // 加载失败时要使用的组件
      errorComponent,
      // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
      delay,
      // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
      // 默认值：Infinity（即永不超时，单位 ms）
      timeout,
      // 定义组件是否可挂起 | 默认值：true
      suspensible,
      /**
       *
       * @param {*} error 错误信息对象
       * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
       * @param {*} fail  一个函数，指示加载程序结束退出
       * @param {*} attempts 允许的最大重试次数
       */
      onError(error, retry, fail, attempts) {
        if (error.message.match(/fetch/) && attempts <= 3) {
          // 请求发生错误时重试，最多可尝试 3 次
          retry()
        } else {
          // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
          // 必须调用其中一个才能继续错误处理。
          fail()
        }
      }
    }
  )
  return component
}
export default loadComponent