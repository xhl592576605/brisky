# 属性与方法

## 公共属性
### version
core的版本号
### app
layout组件
### appOpts
createApp的option
###  $el
挂载在那个元素下
### $vm
createApp返回的vue对象
### $store
状态管理
### $router
路由
### $eventServcie
事件服务（事件总线）
### $apiService
api请求服务
### $lifeCycle
生命周期信息
### $plugins
brisky插件信息
### $frame,$system,menu,meta等等动态属性
动态属性是由`defineDynamicProxy`方法定义，方法说明查看下方

## 公共方法

### login
登录函数，会触发登录生命周期，自动将token存储
#### 入参:   
- data  
login接口的对象，账户，密码等

### loginout
登出函数，会触发登出生命周期，自动将token，user，menu等信息清除
#### 入参:   
- status   
  用来匹配具体啥原因登出系统     
#### 返回值:
- 请求结果 promise


### defineDynamicProxy
定义动态属性，并挂载`$core`对象，动态属性是一个`ref`值，也就是说是一个响应的数据
#### 入参:   
- prop   
  属性key值
- value   
  初始化值
- isReadonly   
  是否只读   


### definedDynamicProxy
查看所有定义的动态属性


### loadComponent
加载组件，支持加载别名的组件
#### 入参:   
- compKey   
  若不是js后缀，默认是别名池
- configKey   
  传递到组件的prop值，可以直接一个对象，也可以是一个js，json地址（必须要返回对象）
- option   
  defineAsyncComponent的部分属性值  