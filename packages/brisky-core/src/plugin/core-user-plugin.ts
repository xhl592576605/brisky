/*
 * @description: CoreUserPlugin 核心用户插件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-21 23:24:18
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-22 23:54:08
 */

import core from "src/core"
import lifeOpt from '../life-cycle/life-opt'
import { BriskyPlugin } from "src/interface/option"

export default class CoreUserPlugin implements BriskyPlugin {
  name: String;
  cache: {}
  constructor() {
    this.name = 'core-user'
    this.cache = {}
  }
  apply($core: core) {
    //定义用户
    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      $core.defineDynamicProxy('user', $core.$frame.user || {})
    })

    // 获取用户信息
    $core.$lifeCycle.afterAuthSuccess.$on(lifeOpt.afterAuthSuccessOpt, async ($core: core) => {
      const Token = $core.Token
      if (!Token) {
        return
      }
      if (!this.cache[Token]) {
        return
      }
      const result = await $core.$apiService?.$fetchData('system.user')
      const user = $core.$dataMatch.$matchData4Object(result, $core.$frame.matched?.user || '{data.data}')
      $core.user && ($core.user = user)
    })

    // 登出用户信息删除
    $core.$lifeCycle.afterLogout.$on(lifeOpt.afterLogoutOpt, () => {
      $core.user = $core.$frame.user || {}
      this.cache = {}
    })
  }
}