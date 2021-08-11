# 基础
> 以"tapble",支持aysnc，await的事件总线，brisky生命周期的底层机制

## 快速开始

### 安装
``` sh
# 最新稳定版
$ npm install @brisky/eventbus
```

### 实例化与调用

``` js
import {EventBusService} from ‘@brisky/eventbus‘
const eventBusServie = new EventBusService()

//监听一个回调函数
eventBusServie.$on('test1', () => {
    console.log('test1')
  })
// 触发该回调函数
eventBusServie.$emit('test1')

//监听一个异步回调函数
eventBusServie.$on('async.test1', async () => {
    console.log('async.test1')
  })
// 触发该回调函数
await eventBusServie.$emit('async.test1')
```

## 依赖
``` sh
npm i lodash
npm i @brisky/util
npm i tapable
```