/*
 * @description: CoreMenuPlugin 核心菜单插件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-21 23:24:18
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-21 23:50:41
 */

import core from "src/core"
import { BriskyPlugin } from "src/interface/option"

export default class CoreMenuPlugin implements BriskyPlugin {
  name: String;
  cache: {}
  constructor() {
    this.name = 'core-menu'
    this.cache = {}
  }
  apply($core: core) {
   
  }
}