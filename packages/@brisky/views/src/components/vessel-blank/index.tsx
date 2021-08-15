/*
 * @description: VesselBlank 空白容器
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-08-14 13:23:46
 * @lastEditors: brisky
 * @lastEditTime: 2021-08-15 13:15:52
 */

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VesselBlank',
  props: {
  },
  render() {
    const $slots = this.$slots
    return (<div class='vessel-blank'>
      {{
        default: $slots.default
      }}
    </div>)
  }
})
