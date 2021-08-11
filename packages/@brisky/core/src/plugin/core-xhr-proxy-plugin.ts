/*
 * @description:  CoreOrtherPlugin 其他
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-07-06 22:30:28
 * @lastEditors: brisky
 * @lastEditTime: 2021-07-07 23:33:55
 */

import _ from "lodash"
import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import lifeOpt from "src/life-cycle/life-opt"
import { hijacking } from "src/util/hijacking-proxy"
export default class CoreXhrProxyPlugin implements BriskyPlugin {
  name: String;

  constructor() {
    this.name = 'core-xhr-proxy'

  }

  apply($core: core) {

    // 拦截 XMLHttpRequest
    $core.$lifeCycle.beforeCoreReady.$on(lifeOpt.beforeCoreReadyOpt, ($core: core) => {
      hijacking(XMLHttpRequest, {
        open(method: any, url: any, async: any, user: any, password: any) {
          const xhr = this
          Object.assign(this, { method, url, async, user, password })
          $core.$lifeCycle.onXhrOpen.$emit(lifeOpt.onXhrOpenOpt, xhr)
          this.open(xhr.method, xhr.url, xhr.async, xhr.user, xhr.password)
          return false
        },
        send(data: any) {
          const xhr = this
          // 补充xhr上下文
          Object.assign(xhr, { data })
          $core.$lifeCycle.onXhrSend.$emit(lifeOpt.onXhrSendOpt, xhr)
          this.send(xhr.data)
          return false
        },
        onreadystatechange() {
          const xhr = this
          $core.$lifeCycle.onXhrChange.$emit(lifeOpt.onXhrChangeOpt, xhr)
          return xhr.go
        }
      })
    })

  }



}