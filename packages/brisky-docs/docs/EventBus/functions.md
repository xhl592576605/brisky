# 公共方法

## $on
注册一个唯一key，以及对应一个或过个的回调函数，回调函数会按照添加顺序依次触发，可以多次调用，已存在便是增加回调
### 入参:   
- option：HookOption | string   
  设置注册参数，若是字符串则是key，其余默认，可以传入详细对象HookOption进行设置
- fn:fn: Function | Function[]    
  注册的回调函数

HookOption
``` js
export interface BaseEventOption {
  prefix?: string// key的前缀，没有设置则默认
  suffix?: string//key的后缀，没有设置则默认
  name: string // key，若是异步方法，可以直接应该以’async.‘开头，以’async.**‘命名
  matchObject?: Object | {} //额外匹配信息，触发可以传入，以便精确触发

}

export interface HookOption extends BaseEventOption {
  args: Array<string> | Number // 用于实例化参数个数，因为采用了tapable，回调函数的入参在此设置，若是没有设置，自动生成10个回调函数的入参
  callBack: Function[] | Function // 回调函数，这个参数可以不设置，已$on的第二个参数fn为准
  hookType?: TapableHookType // tapable的钩子类型，详情可以查看https://zhuanlan.zhihu.com/p/79221553
  interceptOpt?: Object, // 用于拦截器
  context?: boolean //用于启用上下文，是直接配置在拦截器上，若是需要设置上下文的值，请在拦截器的拦截方法声明
}

export enum TapableHookType {
  Default,
  Bail, // 返回undefined 不再执行
  Waterfall, // 返回的值会带入到下个回调
  Loop // 返回非 undefined 时继续再次执行当前的回调。
}
```

例子：
``` js
eventBusServie.$on('test', async () => {
    console.log('test')
  })
  eventBusServie.$on('async.test1', async () => {
    setTimeout(() => {
      console.log('async.test1-setTimeout')
    }, 0)
    const  a=async ()=>{
      console.log('a')
    }
    console.log('async.test1')
    console.log('async2.test1')
    a()
    console.log('async3.test1')
   
  })

eventBusServie.$on({
    prefix: 'qwe',
    suffix: 'asdf',
    name: 'Waterfall',
    hookType: TapableHookType.Waterfall
  }, [() => {
    console.log('init')
    return 1
  }, (a) => {
    console.log(a)
  }])

eventBusServie.$on({
    prefix: 'qwe',
    suffix: 'asdf',
    name: 'async.Waterfall',
    hookType: TapableHookType.Waterfall
  }, [async (c) => {
    console.log('init-async')
    console.log(c)
    return 2
  }, async (a, c) => {
    console.log(a)
    console.log(c)
  }])

eventBusServie.$on({
    prefix: 'qwe',
    suffix: 'asdf',
    name: 'async.Waterfall-match',
    hookType: TapableHookType.Waterfall,
    matchObject: {
      a: 1111
    }
  }, [async (c) => {
    console.log('init-async-match')
    console.log(c)
    return 3
  }, async (a, c) => {
    console.log(a)
    console.log(c)
  }])
```

## $emit
触发事件，调用回调
### 入参:   
- option: BaseEventOption | string, 
 匹配key
- ...params: any[]
 传递给回调函数的参数值
### 返回值:
- 请求结果 promise

例子：
``` js
eventBusServie.$emit('test')

await eventBusServie.$emit('async.test1')
  
eventBusServie.$emit('Waterfall')

eventBusServie.$emit('async.Waterfall', 'c')

eventBusServie.$emit({
    matchObject: {
      a: 1111
    }
  }, 'b')
```
