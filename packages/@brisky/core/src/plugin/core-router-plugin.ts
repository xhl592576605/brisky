/*
 * @description: CoreRouterPlugin 核心路由插件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-19 18:52:17
 * @lastEditors: brisky
 * @lastEditTime: 2021-08-14 16:32:23
 */

import core from "src/core"
import lifeOpt from '../life-cycle/life-opt'
import { BriskyPlugin } from "src/interface/option"
import { createRouter, Router } from "vue-router"
import routeWrap from "src/util/route-wrap"
import log from "src/util/log"
import _ from "lodash"

export default class CoreRouterPlugin implements BriskyPlugin {
  name: String
  constructor() {
    this.name = 'core-couter'
  }
  apply = ($core: core) => {
    //定义配置路由
    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      const $router = $core.$router as Router
      const { login = {}, routes = [] } = $core.frame
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
      options.routes = [notFoundRoute, loginRoute].filter(r => r.path)
        .concat(options.routes as any[])
        .concat(routes)
        .map((route: any) => {
          let authorized = (route.authorized === undefined) ? true : route.authorized // 配置路由默认免鉴权
          return {
            ...route,
            meta: { ...route.meta, authorized },
            authorized
          }
        }).map((route: any) => {
          return routeWrap(route, $core)
        })
      $core.defineDynamicProxy('staticRoutes', options.routes, true)
      $core.$router = createRouter(options)
      log('路由加载完毕', $core.$router)
    })

    //重写$router的addRoute方法，用于保存返回函数，以便在登出的时候移除路由
    $core.$lifeCycle.afterCreateApp.$on(lifeOpt.afterCreateAppOpt, ($core: core) => {
      let $router = $core.$router as Router
      const _addRoute = $router.addRoute
      $core.defineDynamicProxy('dynamicRoutes', []);
      // 重写$router的addRoute方法，用于保存返回函数，以便在登出的时候移除路由
      ((($core || {}).$router || {}) as any).addRoute = (parentOrRoute: any, route?: any): () => void => {
        const removeRoute = _addRoute(parentOrRoute, route)
        let _route = route ? route : parentOrRoute
        $core.dynamicRoutes.push({ removeRoute, route: _route })
        return removeRoute
      }
    })

    //登出是 菜单路由要移除
    $core.$lifeCycle.afterLogout.$on(lifeOpt.afterLogoutOpt, () => {
      let dynamicRoutes = $core.dynamicRoutes || []
      for (const item of dynamicRoutes) {
        item.removeRoute()
      }
      $core.dynamicRoutes = []
    })
  }

}