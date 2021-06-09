
import { EventBusService } from '@brisky/eventbus'
export default {
  // 配置生成
  beforeGetSystem: new EventBusService(),
  awaitGetSystem: new EventBusService(),
  afterGetSystem: new EventBusService(),
  // 实例准备
  beforeCoreReady: new EventBusService(),
  awaitCoreReady: new EventBusService(),
  afterCoreReady: new EventBusService(),
  // 生成vue
  beforeNewVue: new EventBusService(),
  afterNewVue: new EventBusService(),
  // 注入props
  beforeInjectProps: new EventBusService(),
  // 鉴权相关
  afterAuthSuccess: new EventBusService(),
  afterAuthNothing: new EventBusService(),
  afterAuthFailure: new EventBusService(),
  // 登录相关
  beforeLogin: new EventBusService(),
  afterLogin: new EventBusService(),
  beforeLogout: new EventBusService(),
  afterLogout: new EventBusService(),
  beforeSwitch: new EventBusService(),
  afterSwitch: new EventBusService(),
  // 接口请求拦截
  onXhrOpen: new EventBusService(),
  onXhrSend: new EventBusService(),
  onXhrChange: new EventBusService(),
}