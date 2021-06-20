/*
 * @description: CoreSystemPlugin
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-19 17:20:04
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-20 18:04:48
 */


import lifeOpt from 'src/life-cycle/cycle-opt'
import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import { loadConfig } from '@brisky/api'

export default class CoreSystemPlugin implements BriskyPlugin {
  name: String;

  constructor() {
    this.name = 'core-system'
  }

  apply = ($core: core) => {
    $core.$lifeCycle.awaitGetSystem.$on(lifeOpt.awaitGetSystemOpt, async ($core: core) => {
      let config = window.$frame || {}
      config = await loadConfig(config)
      window.$frame = config
      return config
    })

    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      $core.defineDynamicProxy('$system', $core.$frame)
      $core.defineDynamicProxy('$alias', $core.$frame?.alias || {})
    })
  }

}