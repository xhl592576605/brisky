/*
 * @description: 渲染函数
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-08-14 10:23:31
 * @lastEditors: brisky
 * @lastEditTime: 2021-08-15 13:16:18
 */

import { h } from 'vue'
import { core, lifeOpt } from '@brisky/core'

export default function (this: core, _h: typeof h): any {
  const $core = this.$core as core
  const { frame } = $core
  const { layout, vessel, module } = this.$route.meta
  const props = this.$core.definedDynamicProxy()
  $core.$lifeCycle.beforeInjectProps.$emit(lifeOpt.beforeInjectPropsOpt, props)

  return layout && _h('div',
    { id: 'app-container', class: `app-container--${frame.theme}` },
    [_h(layout, props,
      {
        default: () =>
          _h(vessel, props, {
            default: () =>
              _h(module, props)
          })
      }
    )]
  )
}