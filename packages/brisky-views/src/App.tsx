/*
 * @description:  主入口
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-08-08 17:46:35
 * @lastEditors: brisky
 * @lastEditTime: 2021-08-08 17:55:10
 */

import { defineComponent } from 'vue';
import HelloWorld from './components/hello-word';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  render() {
    return (<div>
      <img alt="Vue logo" src="/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>)
  }
});