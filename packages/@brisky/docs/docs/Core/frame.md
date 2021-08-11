# 框架配置
框架配置，即是window.$frame对象，下面直接说明这个对象

```js
windw.$frame={
  // 打开开发调试日志
  debug: true,
  sysId: 'brisky_123456',
  // 系统标题
  title: 'brisky',
  // 主题变量
  theme: 'light',
  // 登录后默认跳转的地址，支持函数
  root: '/',
  // 组件别名
  alias: {
    // 'exception-404': '../examples/component/exception-404/index.js'
  },
  // 静态路由
  routes:[
    {
      //路径
      path: '/first',
      // 路由指向的组件，可以是一个json，一个组件对象，一个函数字符串
      component: '../examples/component/hello-word/index.js',
      // 路由meta信息
      meta: {
         // 传递给路由组件的值
         moduleConfig: {
             msg: 'first'
          }
      }
    },
    ...
  ]，
  // 登录配置
  login: {
      //路径
      path: '/login',
      // 路由指向的组件，可以是一个json，一个组件对象，一个函数字符串
      component: '../examples/component/hello-word/index.js',
      // 传递给路由组件的值
       moduleConfig: {
           msg: 'first'
      }
  },
  // 自定义渲染函数，可以替换内部的渲染函数，通常要根据业务觉得
  render: (h) => {
        const {
          $core
        } = this
        const {
          meta = {}
        } = $core.$router.currentRoute.value
        const {
          module
        } = meta
        return h(module)
  },
  待续...
}
```