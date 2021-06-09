/*
 * @description: birsky-core
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-08 21:56:08
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-08 22:31:01
 */
import _ from 'lodash'
import { App, Component, createApp } from 'vue'
import { createRouter, Router } from 'vue-router'
import { createStore, Store } from 'vuex'
import { version } from '../../package.json'
import { CoreOption } from 'src/interface/option'

export default class Core {
  public readonly version = version
  public readonly app: Component
  public $el: string = '#app'
  public $vm?: App
  public $store: Store<any> | null = null
  public $router: Router | null = null
  public $frame: any = {}
  public $alias: Object = {}

  constructor(app: Component) {
    this.app = app
    window.$core = this
  }

  /**
   * 初始化app
   * @param option 
   */
  public async init(option: CoreOption) {

    // 初始化config
    this.initConfig(option)
    // 开始生命周期
    this.$vm = createApp({})
    // 结束生命周期

    // 注册vue插件

    // 注册birsky插件

    this.$vm.config.globalProperties.$core = this
    this.$vm.mount(this.app)
  }

  /**
   * 初始化配置
   * @param option 
   */
  private initConfig(option: CoreOption) {
    window.$frame = this.$frame = _.merge(this.$frame, window.$frame || {})
    this.$alias = _.merge(this.$alias, option.alias || {}, this.$frame.alias || {})
    this.$store = createStore(option.store)
    this.$router = createRouter(option.router)
  }
}