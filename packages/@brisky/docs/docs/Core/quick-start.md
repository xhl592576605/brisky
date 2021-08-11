# 基础
> brisky的核心，一套生命周期，可扩展的插件，一个可定制化的vueApp

core是整个brisky，它承担的就是创建vue，并且他而外扩展的生命周期，不仅仅限于vue的生命周期，你完全可以做这类生命周期做想要做的事情，比如获取菜单等等，当然我们也集成了这些基础的内容，像登录，获取用户信息，获取菜单，根据菜单构建动态路由，可以完整构建一个web，你完全可以直接考虑业务，无需要考虑底层

## 快速开始

### 安装
``` sh
# 最新稳定版
$ npm install @brisky/core
```

### 调用

直接使用init变可以初始化一个vueApp

``` js
   $core.init()
```
效果
![CoreBase](/brisky-docs/images/CoreBase.png)
## 依赖
``` sh
npm i lodash
npm i @brisky/api
npm i @brisky/eventbus
npm i @brisky/util
npm i crypto-js
npm i js-cookie
npm i query-string
npm i requirejs
npm i vue@next
npm i vue-router@next
npm i vuex@next
```