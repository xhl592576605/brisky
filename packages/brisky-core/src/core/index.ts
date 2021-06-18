/*
 * @description: birsky-core
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-08 21:56:08
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-11 21:39:14
 */
import _ from 'lodash'
import { App, Component, createApp } from 'vue'
import { createRouter, Router, RouterOptions } from 'vue-router'
import { createStore, Store, StoreOptions } from 'vuex'
import { version } from '../../package.json'
import { BriskyPlugin, CoreOption } from 'src/interface/option'
import { EventBusService } from '@brisky/eventbus'
import { DataCheck } from '@brisky/util'
import LifeCycle from 'src/life-cycle'
import lifeOpt from 'src/life-cycle/cycle-opt'
import defaultRouter from '../router/idnex'

export default class Core {
  private $dataCheck: DataCheck
  public readonly version = version
  public readonly app: Component
  public readonly appOpts = {}
  public $el: string = '#app'
  public $vm?: App
  public $store: Store<any> | null = null
  public $router: Router | null = null
  public $frame: any = {}
  public $alias: Object = {}
  public $eventServcie = new EventBusService()
  public $lifeCycle: LifeCycle = new LifeCycle()
  public $plugins?: Array<BriskyPlugin> = []


  constructor(app: Component) {
    this.app = app
    this.$dataCheck = new DataCheck()
    window.$core = this
  }

  /**
   * 初始化app
   * @param option 
   */
  public async init(option: CoreOption = {}) {

    // 初始化config
    this.initConfig(option)

    // 注册生命周期
    this.registerLifeCycle(option.hooks)

    // 注册内部插件
    this.useBriskyPlugin(option.briskyPlugins)

    // 开始生命周期

    // init system config
    this.$lifeCycle.beforeGetSystem.$emit(lifeOpt.beforeGetSystemOpt, this)
    await this.$lifeCycle.awaitGetSystem.$emit(lifeOpt.awaitGetSystemOpt, this)
    this.$lifeCycle.afterGetSystem.$emit(lifeOpt.afterCreateAppOpt, this)

    // init core
    this.$lifeCycle.beforeCoreReady.$emit(lifeOpt.beforeCoreReadyOpt, this)
    await this.$lifeCycle.awaitCoreReady.$emit(lifeOpt.awaitCoreReadyOpt, this)
    this.$lifeCycle.afterCoreReady.$emit(lifeOpt.afterCoreReadyOpt, this)


    // create app
    this.$lifeCycle.beforeCreateApp.$emit(lifeOpt.beforeCreateAppOpt, this)
    this.$vm = createApp({ ...this.app, ...this.appOpts })
    this.$lifeCycle.afterCreateApp.$emit(lifeOpt.afterCreateAppOpt, this)

    // 结束生命周期

    //use plugin
    this.usePlugin(option.plugins)

    this.$vm.config.globalProperties.$core = this
    this.$vm.mount(this.$el)
    return this.$vm
  }

  /**
   * 使用插件
   * @param plugins 
   */
  public usePlugin(plugins: any[] | undefined) {
    if (this.$vm) {
      this.$store && this.$vm.use(this.$store)
      this.$router && this.$vm.use(this.$router)
      plugins && plugins.forEach(plugin => {
        this.$vm?.use(plugin)
      })
    }
  }

  /**
   * 注册生命周期
   * @param hooks 
   */
  public registerLifeCycle(hooks: any) {
    for (const key in hooks) {
      const type = key.split('.')[0]
      const name = key.split('.')[1]
      let hook: any = hooks[key]
      if (type === 'vue') {
        this.appOpts[name] = hook
      }
      if (type === 'router' && this.$router) {
        this.$router[name](hook)
      }
      const lifeCycle = this.$lifeCycle[name || type] as EventBusService
      if (lifeCycle) {
        const opt = lifeOpt[`${name || type}Opt`]
        if (!this.$dataCheck.$isArray(hook)) {
          hook = [hook]
        }
        lifeCycle.$on(opt, hook)
      }
    }
  }

  /**
   * 使用brisky插件
   * @param plugins 
   */
  public useBriskyPlugin(plugins: Array<BriskyPlugin> | undefined): void {
    this.$plugins = plugins
    plugins && plugins.forEach(plugin => {
      if (!plugin.name || this.$dataCheck.$isFunction(plugin.apply)) {
        console.warn('no standard plugin', plugin.constructor)
        return
      }
      plugin.apply(this)
    })
  }
  /**
   * 初始化配置
   * @param option 
   */
  private initConfig(option: CoreOption) {
    window.$frame = this.$frame = _.merge(this.$frame, window.$frame || {})
    this.$alias = _.merge(this.$alias, option.alias || {}, this.$frame.alias || {})
    this.$store = createStore(option.store as StoreOptions<any> || {})
    this.$router = createRouter(option.routers as RouterOptions || defaultRouter)
  }
}