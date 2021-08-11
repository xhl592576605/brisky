# 实例化参数
ApiService是类库的服务，使用需先要实例化，实例化需要传递一个对象

## debug
default:false

这个仅是一个调试参数，请求时会将`debug=true`带入请求，作为url参数，并打印请求参数

```js
  if (this.option.debug) {
      opt.params.debug = true
      console.log(`${apiChainKey}请求参数`, opt)
    }
```

## api
require：true   
type:string|Object

api是请求配置信息，可以是一个路径（路径应该返回一个对象），或者一个对象，详细信息请看 [Api](./api.md)

例子
```json
{
  "system": {
     "login": {
        "remark": "login api",
        "author": "author",
        "method": "get",
        "url": "/api/v1/login",
        "params": {},
        "data":{}
         }
  }
}
```
## tokenKey
default:null  
type:string|null 
`tokenKey`是配置Cookie获取token的，与下面的`getToken`互斥，`tokenKey`优先级高，若是2个都没有设置，默认取`Bearer_Token`

## getToken
default:null  
type：() => string | null 
`getToken`是配置函数获取token的，与下面的`getToken`互斥，若是2个都没有设置，默认取`Bearer_Token`

## axiosOpt
default：null   
type:Object | null  
`axiosOpt`为axios的参数，具体参考[axios](http://www.axios-js.com/zh-cn/docs/)

## beforeSetRequestHeaders
default:null  
type:(config: any) => void | null   
设置头部信息之前调用，可以而外设置想要的参数
## afterSetRequestHeaders
default:null  
type:(config: any) => void | null   
设置头部信息之后调用，可以而外设置想要的参数