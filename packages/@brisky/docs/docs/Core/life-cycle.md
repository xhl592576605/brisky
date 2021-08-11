# 生命周期
> 正常来说 ，一个vue的生命周期是本身在vue里面的，brisky框架封装了而外的生命周期来统一管理，而外扩展业务等，

![CoreBase](/brisky-docs/images/life-cycle.png)

## 生命周期说明
生命周期是以表格内的业务流转的。当然你也可以自己替换，但是生命周期的调用的不变，就是这几个，brisky的周期调用是以插件的形式`插件是传入到option，后续会说到`存在的，插件里面注册生命周期的回调，到了哪个步骤的生命周期就会调用回调，部分生命周期支持异步（await开头）。当然若不以插件使用，在初始化`core.init(option)`,也可以将生命周期注册到option，或者更在`window.$frame`进行注册

当然，不止这些自定义的生命周期，你也可以注册vue生命周期，vue-router路由守卫，同样是能生效的，当然，还是在`option`或者`window.$frame`

具体查看[Option](./option.md),[$frame](./frame.md)

| 生命周期     | 说明     | 内容|
| -------     | -----  | --- |
| beforeGetSystem   | 初始化系统配置之前    | 自行扩展|
| awaitGetSystem    | 初始化系统配置       |1. 初始化配置 <br>|
| afterGetSystem    | 初始化系统配置之后    |自行扩展|
| beforeCoreReady   | 初始化核心之前       |自行扩展|
| awaitCoreReady    | 初始化核心          | 1. 设置授权信息，并将token保存到core里面|
| afterCoreReady    | 初始化核心之后       |自行扩展|
| beforeCreateApp   | 创建app之前         |1. 注入动态属性到core对<br> 2. 设置登录，404，合并静态路由，创建$router对象 <br> 3. 初始化user <br> 4 初始化menu，meta permission值 <br> 5 设置路由守卫，用于鉴权路由|
| createApp         | 创建app            |自行扩展|
| afterCreateApp    | 创建app之后         |1. 重新路由addRoute方法|
| afterAuthSuccess  | 路由鉴权成功         |1. 判断token请求用户信息，赋值给core.user <br> 2.定期检查token <br> 3. 判断user 请求菜单，组成动态路由，添加动态路由，赋值menu，meta permission |
| afterAuthFailure  | 路由鉴权失败         |自行扩展|
| beforeLogin       | 登录之前            |自行扩展|
| afterLogin        | 登录之后            |1. 获取token,写入cookie|
| beforeLogout      | 登出之前            |自行扩展|
| afterLogout       | 登出之后            |1. 移除动态路由 <br> 2. 移除user <br> 3. 移除menu <br> 4. 移除token|
|vue.mounted| vue的生命周期，其余的类似`vue.**`|
|router.beforeEach|router的路由守卫，其余的类似`router.**`|
