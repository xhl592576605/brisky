/*
 * @description: 主控app
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-07-10 21:45:35
 * @lastEditors: brisky
 * @lastEditTime: 2021-07-11 13:38:44
 */

import { defineComponent } from 'vue'
import './style/index.scss'
import HelloWorld from '../hello-word'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  render: () => {
    return (<div>
      <img alt="Vue logo" src="/logo.png" />
      <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    </div>)
  }
})