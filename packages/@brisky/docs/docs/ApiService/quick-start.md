# 基础
> 以axios为核心，统一管理的接口配置，可定制的拦截机制，规范的调用函数，即开即用的请求类库

## 快速开始

### 安装
``` sh
# 最新稳定版
$ npm install @brisky/api
```

### 实例化

直接实例化对象，将接口信息配置传入，即可完成实例化

``` js
import {ApiService} from ‘@brisky/api’
const apiService=new ApiService({
    api:{
      system:{
        login:{
          url:'api/login',
          author:'brisky',
          method:'post',
          params:{
            sign:'brisky'
          },
          data:{
            account: 'admin',
	          password: '123456'
          }
        }
      }
    }
  })
```

### 调用

调用`$fetchData`方法,并请求接口

``` js
apiService.$fetchData('system.login')
```
## 依赖
``` sh
npm i lodash
npm i axios
npm i js-cookie
```