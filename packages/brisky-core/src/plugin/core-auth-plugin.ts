/*
 * @description: CoreAuthPlugin 授权验证插件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-25 21:14:24
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-25 22:25:47
 */

import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import lifeOpt from "src/life-cycle/life-opt"
import { RouteLocationNormalized, Router } from "vue-router"
export default class CoreAuthPlugin implements BriskyPlugin {
  name: String;

  constructor() {
    this.name = 'core-auth'

  }

  apply($core: core) {

    // 设置路由守卫
    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      this.authorize($core)
    })

    // 登录完跳转指定页面 一般是“/”
    $core.$lifeCycle.afterLogin.$on(lifeOpt.afterLoginOpt, () => {
      const { root } = $core.$frame
      $core.$router?.push(typeof root === 'function' ? root($core) : root)
    })

    // 登出时跳转登录页面
    $core.$lifeCycle.afterLogout.$on(lifeOpt.afterLogoutOpt, () => {
      const { $router, $vm, $frame: { login: { path } } } = $core
      if ($vm) {
        $router?.push(path).catch(() => { }) // ditto
      } else {
        // 当vm未实例时，路由跳转会失效，此时尝试强制刷新页面
        // *** 可能导致死循环
        location.reload()
      }
    })

  }

  /**
   * 路由授权检查
   * @param $core 
   */
  authorize($core: core) {
    const { $router } = $core
    $router?.beforeEach(async (to, from, next) => {
      const isAuthorizedUser = $core.AUTHORIZED //是否登录
      const isAuthorizedPath = this.isAuthorizedPath(to, $core) //是否为授权页面

      if (isAuthorizedUser && isAuthorizedPath) {
        await $core.$lifeCycle.afterAuthSuccess.$emit(lifeOpt.afterAuthSuccessOpt, $core)
      }
      if (isAuthorizedUser && !isAuthorizedPath) {
        await $core.$lifeCycle.afterAuthSuccess.$emit(lifeOpt.afterAuthSuccessOpt, $core)
      }
      if (!isAuthorizedUser && isAuthorizedPath) {
        await $core.$lifeCycle.afterAuthSuccess.$emit(lifeOpt.afterAuthSuccessOpt, $core)
      }
      if (!isAuthorizedUser && !isAuthorizedPath) {
        await $core.$lifeCycle.afterAuthFailure.$emit(lifeOpt.afterAuthFailureOpt, $core)
      }
      if (isAuthorizedUser + isAuthorizedPath > 0) {
        next()
      } else {
        $core.logout({ code: 10000, message: $core.$frame?.messages[20000] })

      }
    })
  }

  /**
   * 是否授权页面
   * @param to 
   * @param $core 
   * @returns 
   */
  isAuthorizedPath(to: RouteLocationNormalized, $core: core) {
    const path = to.path
    const { $frame: { login, authorized = [] }, $router } = $core
    const routes = ($router as Router).options.routes
    return (
      // * 登录路由必须免登录
      login.path === path ||
      // $frame.routes && router.js#routes
      routes.some((route) => route.path === path && ((route as any).authorized)) ||
      // $frame.authorized = [] 包含路径
      authorized && authorized.some((val: string) => val === path)
    )
  }

}