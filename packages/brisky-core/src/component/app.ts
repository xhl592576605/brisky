/*
 * @description: App
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-10 22:48:01
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-10 22:49:12
 */

import { h } from 'vue'
export default {
  name: 'App',
  render() {
    const { $core } = this as any
    const { $frame = {} } = $core
    return ($frame.render && $frame.render.call(this, h)) ||
      h('h1', {}, 'brisky')
  }
}