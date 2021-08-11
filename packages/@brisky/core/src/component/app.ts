/*
 * @description: App
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-10 22:48:01
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-15 23:35:56
 */

import { h, compile } from 'vue'
const defaultRender = compile(`<div style="font-size: 40px;display: flex;justify-content: center;align-items: center;">Welcome to  brisky</div>`) as any
export default {
  name: 'App',
  render() {
    const { $core } = this as any
    const { $frame = {} } = $core
    if ($frame.render) {
      return $frame.render.call(this, h)
    } else {
      return defaultRender.call(this, h)
    }
  }
}