/*
 * @description: CoreRouterPlugin
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-19 18:52:17
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-20 18:57:33
 */

import core from "src/core"
import lifeOpt from '../life-cycle/cycle-opt'
import { BriskyPlugin } from "src/interface/option"
import { createRouter, Router } from "vue-router"
import routeWrap from "src/util/route-wrap"
import log from "src/util/log"

export default class CoreRouterPlugin implements BriskyPlugin {
  name: String
  constructor() {
    this.name = 'core-couter'
  }
  apply = ($core: core) => {
    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      const $router = $core.$router as Router
      const { login = {}, routes = [] } = $core.$frame

      const loginRoute = {
        path: login.path,
        name: login.name,
        component: login.component || 'module-login',
        meta: {
          ...login.meta,
          moduleConfig: login
        }
      }

      const notFoundRoute = {
        path: '/:pathMatch(.*)*',
        component: 'exception-404'
      }
      const { options } = $router
      options.routes = [notFoundRoute, loginRoute]
        .concat(options.routes as any[])
        .concat(routes)
        .map((route: any) => {
          return {
            ...route,
            authorized: (route.authorized === undefined) ? true : route.authorized // 配置路由默认免鉴权
          }
        }).map((route: any) => {
          return routeWrap(route, $core)
        })
      $core.defineDynamicProxy('staticRoutes', options.routes)
      $core.$router = createRouter(options)
      log('路由加载完毕', $core.$router)
    })

    $core.$lifeCycle.afterLogout.$on(lifeOpt.afterLogoutOpt, () => {
      // $core.$router = createRouter({
      //   history: ($core.$router as Router).options.history,
      //   routes: $core.staticRoutes || []
      // })

      //todo:需要清除菜单或者其他新增的路由
    })
  }

}