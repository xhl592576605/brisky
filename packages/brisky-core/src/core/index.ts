/*
 * @description: birsky-core
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-08 21:56:08
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-20 16:56:48
 */
import _ from 'lodash'
import { App, Component, createApp, ref } from 'vue'
import { createRouter, Router, RouterOptions } from 'vue-router'
import { createStore, Store, StoreOptions } from 'vuex'
import { version } from '../../package.json'
import { BriskyPlugin, CoreOption } from 'src/interface/option'
import { EventBusService } from '@brisky/eventbus'
import { DataCheck, DataMatch } from '@brisky/util'
import { ApiService, ApiServiceOpt } from '@brisky/api'
import LifeCycle from 'src/life-cycle'
import lifeOpt from 'src/life-cycle/cycle-opt'
import defaultRouter from '../router/idnex'
import log from 'src/util/log'
import loadComponent from 'src/util/load-component'
import defaultBriskyPlugin from 'src/plugin'
import frame from '../frame'

export default class Core {
  [key: string]: any
  private $dataCheck: DataCheck
  private $dataMatch: DataMatch
  public readonly version = version
  public readonly app: Component
  public readonly appOpts = {}
  public $el: string = '#app'
  public $vm?: App
  public $store: Store<any> | null = null
  public $router: Router | null = null
  public $eventServcie = new EventBusService()
  public $apiService?: ApiService
  public $lifeCycle: LifeCycle = new LifeCycle()
  public $plugins?: Array<BriskyPlugin> = []
  // public $alias: Object = {}
  // public $frame:Object={}



  constructor(app: Component) {
    this.app = app
    this.$dataCheck = new DataCheck()
    this.$dataMatch = new DataMatch()
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
    this.useBriskyPlugin(this.$plugins)

    // 开始生命周期

    // init system config
    this.$lifeCycle.beforeGetSystem.$emit(lifeOpt.beforeGetSystemOpt, this)
    await this.$lifeCycle.awaitGetSystem.$emit(lifeOpt.awaitGetSystemOpt, this)
    this.$lifeCycle.afterGetSystem.$emit(lifeOpt.afterCreateAppOpt, this)

    this.defineDynamicProxy('$frame', Object.assign(frame, window.$frame || {}))

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
    log('core init success', this)
    return this.$vm
  }

  /**
   * 使用第三方vue插件，比如element-ui等等
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
   * 使用brisky插件，可以插件内部实现各生命周期所需的事情
   * @param plugins 
   */
  public useBriskyPlugin(plugins: Array<BriskyPlugin> | undefined): void {
    plugins && plugins.forEach(plugin => {
      if (!plugin.name || !this.$dataCheck.$isFunction(plugin.apply)) {
        console.warn('no standard plugin', plugin.constructor)
        return
      }
      plugin.apply(this)
    })
  }

  /**
   * 登录
   * @param  {object}   data 登录数据，{ username,password,... }必填
   */
  public async login(data: any, tokenMatchStr: string) {
    this.$lifeCycle.beforeLogin.$emit(lifeOpt.beforeLoginOpt, this)
    const res = await this.$apiService?.$fetchData('system.login', data)
    const token = this.$dataMatch.$matchData4String(tokenMatchStr, res)
    this.$lifeCycle.afterLogin.$emit(lifeOpt.afterLoginOpt, token)
  }

  /**
 * 登出
 * @param status 
 */
  public async loginout(status: any) {
    this.$lifeCycle.beforeLogout.$emit(lifeOpt.beforeLogoutOpt, status)
    // this.Token && await this.$apiService?.$fetchData('system.loginout')
    this.$lifeCycle.afterLogout.$emit(lifeOpt.afterLogoutOpt, status)
  }

  /**
   * 定义动态响应属性
   * @param prop 
   * @param value 
   */
  public defineDynamicProxy(prop: string, value: any) {
    let __value__ = ref(value)
    const KEY = prop
    Object.defineProperty(this, KEY, {
      get: () => {
        return __value__.value
      },
      set: (val: any) => {
        __value__.value = val
      }
    })
  }

  /**
   * 获取全部定义的动态响应属性
   * @returns 
   */
  public definedDynamicProxy() {
    const getDefined = (self: any) => {
      return Object
        .entries(Object.getOwnPropertyDescriptors(self))
        .filter(([key, val]) => {
          return typeof val.get === 'function'
        })
        .reduce((cache, [key, val]) => {
          cache[key] = this[key]
          return cache
        }, {})
    }
    return { ...getDefined(this), ...getDefined(Object.getPrototypeOf(this)) }
  }


  /**
   * 加载组件，支持加载别名的组件
   * @param compKey 
   * @param configKey 
   * @param option 
   */
  public loadComponent(compKey: any, configKey: any, option: any = {}) {
    let view
    if (typeof compKey === 'string' && /\.js$/.test(compKey) === false) {
      const alias = this.$alias
      view = alias[compKey]
      if (!view) {
        console.warn(`【alias】中未匹配到组件：${compKey}`)
      }
    } else {
      view = compKey
    }
    return loadComponent(view, configKey, option)
  }

  /**
   * 初始化配置
   * @param option 
   */
  private initConfig(option: CoreOption) {
    this.$plugins = _.merge([], this.$plugins, defaultBriskyPlugin || [], option.briskyPlugins || [])
    this.$store = createStore(option.store as StoreOptions<any> || {})
    this.$router = createRouter(option.routers as RouterOptions || defaultRouter)
    this.$apiService = new ApiService(option.apiServiceOpt as ApiServiceOpt || {})
  }
}