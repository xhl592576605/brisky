/*
 * @description: CoreMenuPlugin 核心菜单插件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-21 23:24:18
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-23 23:27:23
 */

import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import lifeOpt from "src/life-cycle/life-opt"
import extendUrl from "src/util/extend-url"
import { Router } from "vue-router"
export default class CoreTokenPlugin implements BriskyPlugin {
  name: String;
  sysId: String | null
  constructor() {
    this.name = 'core-token'
    this.sysId = null
  }
  apply($core: core) {

    $core.$lifeCycle.beforeGetSystem.$on(lifeOpt.beforeGetSystemOpt, ($core: core) => {
      const sysId = this.sysId = window.$sysId
      var params: any = {}
        ; (/sysId=[\w-]+/.test(location.search)) && (params.sysId = sysId)
      if (JSON.stringify(params) !== '{}') {
        // 路由刷新时保持
        const $router = $core.$router as Router
        $router.beforeEach((to, _from, next) => {
          const has = Object.keys(params).every(key => to.query[key])
          if (has) {
            next()
          } else {
            const query = Object.assign({}, to.query, params)
            next(Object.assign({}, to, { query }))
          }
        })

        // 窗口打开时保持
        const _open = window.open
        //@ts-ignore
        window.open = function (url) {
          url = extendUrl(url as string, params)
          _open(url)
        }
      }
    })
  }
}