/*
 * @description: LayoutSpa 布局，没有做任何操作
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-08-14 11:29:29
 * @lastEditors: brisky
 * @lastEditTime: 2021-08-25 20:51:28
 */
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'LayoutSpa',
  props: {
  },
  mounted() {
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
