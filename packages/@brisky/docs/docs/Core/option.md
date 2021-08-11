# init的选项
## 构造函数(newc core(appComp))
core默认会导出一个`$core`对象，可以直接使用`$core.init(option)`进行brisky框架的初始化，当然如果觉得这个不符合预期，可以重新`new core(appComp)`,new 出来的新对象，也会覆盖到原来默认导出的`$core`

### appComp
default:appComp
appComp是一个vue组件（可以理解为官方例子的`app.vue`），可以自由定义组件，自定义render函数

## init
init是初始化app的唯一入口，生命周期的调用便是在这边调用

### option
  option是init的选项值

  ```js
  export interface CoreOption {
    store?: StoreOptions<any>, //createStore的参数
    routers?: RouterOptions, // createRouter的参数
    plugins?: Array<any> // 第三方vue插件，如element-ui等
    hooks?: EventObject, // 自定义生命钩子函数,参考EventObject说明
    briskyPlugins?: Array<BriskyPlugin>, // brisky很插件
    apiServiceOpt?: ApiServiceOpt //实例化ApiService的参数，可参靠ApiService的说明
  }

  /**
   * 事件key值,可以直接注册brisky生命周期与vue内部生命，路由导航守卫
   {
        'beforeGetSystem': (core) => {
          console.log('beforeGetSystem', core)
        },
        'awaitGetSystem': async (core) => {
          console.log('awaitGetSystem', core)
        },
        'afterGetSystem': (core) => {
          console.log('afterGetSystem', core)
        },

        'beforeCoreReady': (core) => {
          console.log('beforeCoreReady', core)
        },
        'awaitCoreReady': async (core) => {
          console.log('awaitCoreReady', core)
        },
        'beforeCreateApp': (core) => {
          console.log('beforeCreateApp', core)
        },
        'vue.beforeCreate': () => {
          console.log('vue.beforeCreate')
        },
        'vue.created': () => {
          console.log('vue.created')
        },
        'vue.beforeMount': () => {
          console.log('vue.beforeMount')
        },
        'vue.mounted': () => {
          console.log('vue.mounted')
        },
        'vue.beforeUpdate': () => {
          console.log('vue.beforeUpdate')
        },
        'vue.updated': () => {
          console.log('vue.updated')
        },
        'afterCreateApp': (core) => {
          console.log('afterCreateApp', core)
        },
        'router.beforeEach': (to, from) => {
          console.log('router.beforeEach', to, from)
        },
        'router.afterEach': (to, from) => {
          console.log('router.afterEach', to, from)
        },
    }
   */
  export interface EventObject {
  [key: string]: Function | Array<Function> | string
  }

  /**
   * brisky插件，自定义插件必须继承这个接口
   * 可以在apply函数中调用生命周期注册函数，如
   *  
   $core.$lifeCycle.awaitGetSystem.$on(lifeOpt.awaitGetSystemOpt, async ($core: core) => {
      ...
    })
  */
  export interface BriskyPlugin {
    name: String,
    apply: ($core: core) => void
  }

  ```