# 公共属性
## serviceConfigs
api配置信息，转成对象存在这个值里面
# 公共方法

## $fetchData
根据api配置信息，使用key请求接口
### 入参:   
- apiChainKey   
  请求key值，对于api配置信息    
- apiOpt    
  请求的数据,与axios一致   
### 返回值:
- 请求结果 promise

```js
{
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },
  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  }
}
```
例子：
``` js
apiService.$fetchData('system.login',{
  parms:{userId:'admin'},
  data:{userId:'admin',pass:'123456'}
  }
).then(res=>{})
```

## $fetchDataByUrl
直接使用url请求数据
### 入参:   
- url   
  即就是url   
- apiOpt  
  请求的数据,与axios一致   
### 返回值:
- 请求结果 promise

```js
{
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },
  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  }
}
```
例子：
``` js
apiService.$fetchDataByUrl('http://xx.xx.com/api/login',{
  method:'post'
  parms:{userId:'admin'},
  data:{userId:'admin',pass:'123456'}
  }
).then(res=>{})
```

## $cancelFetchApi
取消请求
### 入参:   
- apiKey   
  apiChainKey或者url   

例子：
``` js
apiService.$cancelFetchApi('system.login')
apiService.$cancelFetchApi('http://xx.xx.com/api/login')
```

## disposeAxios
注销axios实例，每个ApiService中都有一个axios实例