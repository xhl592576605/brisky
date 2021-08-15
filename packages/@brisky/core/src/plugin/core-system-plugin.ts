/*
 * @description: CoreSystemPlugin 核心系统插件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-19 17:20:04
 * @lastEditors: brisky
 * @lastEditTime: 2021-08-15 10:56:11
 */


import lifeOpt from 'src/life-cycle/life-opt'
import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import { loadConfig } from '@brisky/api'

export default class CoreSystemPlugin implements BriskyPlugin {
  name: String;

  constructor() {
    this.name = 'core-system'
  }

  apply = ($core: core) => {
    // 定义$frame 并加载配置
    $core.$lifeCycle.awaitGetSystem.$on(lifeOpt.awaitGetSystemOpt, async ($core: core) => {
      let config = window.$frame || {}
      config = await loadConfig(config)
      window.$frame = config
      const { $apiService } = $core
      if (Object.keys($apiService?.serviceConfigs || {}).length == 0) {
        await $apiService?.loadServiceConfig()
      }
      return config
    })

    // 定义$system 别名
    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      $core.defineDynamicProxy('system', $core.frame)
      $core.defineDynamicProxy('alias', $core.frame?.alias || {})
      $core.defineDynamicProxy('theme', $core.frame?.theme || 'light')
    })
  }

}