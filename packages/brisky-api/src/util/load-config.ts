/*
 * @description: 加载配置
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-05-27 17:29:00
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-19 16:15:59
 */

import axios from 'axios'
import { String2Function as $string2function, DataCheck } from '@brisky/util'

const cacheConfigs = {}
const $dataCheck = new DataCheck()

/**
 * LoadConfig
 * @param key 
 * @returns 
 */
export default function loadConfig(key: any) {
  const promise = new Promise((resolve) => {
    const REG_JS = /(\.js)$/
    const REG_JSON = /(\.json)$/
    const REG_API = /^(api|\/api)/ // 不太好
    if (cacheConfigs[key]) {
      resolve(cacheConfigs[key])
    } else if ($dataCheck.$isFunction(key)) {
      resolve(key())
    } else if (REG_JSON.test(key)) {
      axios
        .get(key, {
          baseURL: ''
        })
        .then((res: any) => {
          const config = res.data
          resolve((cacheConfigs[key] = config))
        })
    } else if (REG_API.test(key)) {
      axios.get(key).then((res: any) => {
        const config = res.data.data
        resolve((cacheConfigs[key] = config))
      })
    } else if (REG_JS.test(key)) {
      window.require && window.require([key], (config: any) => {
        resolve(config)
      })
    } else if ($dataCheck.$isObject(key)) {
      // Object对象判断
      resolve(key)
    } else {
      // string函数字符串
      resolve($string2function('', key)())
    }
  })
  return promise
}