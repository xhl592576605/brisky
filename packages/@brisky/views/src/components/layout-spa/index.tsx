/*
 * @description: LayoutSpa 布局，没有做任何操作
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-08-14 11:29:29
 * @lastEditors: brisky
 * @lastEditTime: 2021-08-15 13:11:05
 */
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'LayoutSpa',
  props: {
  },
  setup() {
  },
  render() {
    const $slots = this.$slots
    return (<div class='layout-spa'>
      {{
        default: $slots.default
      }}
    </div>)
  }
})
