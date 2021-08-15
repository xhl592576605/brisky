/*
 * @description: 主控app
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-07-10 21:45:35
 * @lastEditors: brisky
 * @lastEditTime: 2021-07-11 13:54:33
 */

import { defineComponent, ref } from 'vue'
import './style/index.scss'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0)
    const handClick = () => {
      count.value++
    }
    return { count, handClick }
  },
  render () {
    const { msg } = this.$props
    const { handClick, count } = this
    return (<div>
      <h1>{msg}</h1>
      <p>
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
        +
        <a
          href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
          target="_blank"
        >
          Vetur
        </a>
        or
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
        (if using
        <code>&lt;script setup&gt;</code>)
      </p>
      <p>See <code>README.md</code> for more information.</p>
      <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank">
          Vite Docs
        </a>   |
        <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
      </p>
      <button onClick={handClick} >count is: {count}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
      </p>
    </div>)
  }
})
