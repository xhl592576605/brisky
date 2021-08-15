/*
 * @description:  CoreOrtherPlugin 其他
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-07-06 22:30:28
 * @lastEditors: brisky
 * @lastEditTime: 2021-08-15 10:55:54
 */

import _ from "lodash"
import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import lifeOpt from "src/life-cycle/life-opt"
export default class CoreOrtherPlugin implements BriskyPlugin {
  name: String;

  constructor() {
    this.name = 'core-orther'

  }

  apply($core: core) {

    // 设置标题
    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      const title = $core.frame.title
      if (!title) return
      document.title = title
    })
    // 设置样式
    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      const css = $core.frame.css
      if (!css) return
      const style = document.createElement('style')
      style.setAttribute('name', '$brisky-css')
      style.innerHTML = css
      document.getElementsByTagName('head')[0].appendChild(style)
    })

  }



}