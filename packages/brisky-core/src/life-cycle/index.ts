import { EventBusService } from '@brisky/eventbus'
import lifeOpt from './cycle-opt'
export default class LifeCycle {
  // 配置生成
  beforeGetSystem: EventBusService = new EventBusService()
  awaitGetSystem: EventBusService = new EventBusService()
  afterGetSystem: EventBusService = new EventBusService()
  // 实例准备
  beforeCoreReady: EventBusService = new EventBusService()
  awaitCoreReady: EventBusService = new EventBusService()
  afterCoreReady: EventBusService = new EventBusService()
  // 生成vue
  beforeCreateApp: EventBusService = new EventBusService()
  afterCreateApp: EventBusService = new EventBusService()
  // 注入props
  beforeInjectProps: EventBusService = new EventBusService()
  // 鉴权相关
  afterAuthSuccess: EventBusService = new EventBusService()
  afterAuthNothing: EventBusService = new EventBusService()
  afterAuthFailure: EventBusService = new EventBusService()
  // 登录相关
  beforeLogin: EventBusService = new EventBusService()
  afterLogin: EventBusService = new EventBusService()
  beforeLogout: EventBusService = new EventBusService()
  afterLogout: EventBusService = new EventBusService()
  // 接口请求拦截
  onXhrOpen: EventBusService = new EventBusService()
  onXhrSend: EventBusService = new EventBusService()
  onXhrChange: EventBusService = new EventBusService()

  constructor() {
    this.beforeGetSystem.$on(lifeOpt.beforeGetSystemOpt, [])
    this.awaitGetSystem.$on(lifeOpt.awaitGetSystemOpt, [])
    this.afterGetSystem.$on(lifeOpt.afterGetSystemOpt, [])
    this.beforeCoreReady.$on(lifeOpt.beforeCoreReadyOpt, [])
    this.awaitCoreReady.$on(lifeOpt.awaitCoreReadyOpt, [])
    this.afterCoreReady.$on(lifeOpt.afterCoreReadyOpt, [])
    this.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, [])
    this.afterCreateApp.$on(lifeOpt.afterCreateAppOpt, [])
    this.beforeInjectProps.$on(lifeOpt.beforeInjectPropsOpt, [])
    this.afterAuthSuccess.$on(lifeOpt.afterAuthSuccessOpt, [])
    this.afterAuthNothing.$on(lifeOpt.afterAuthNothingOpt, [])
    this.afterAuthFailure.$on(lifeOpt.afterAuthFailureOpt, [])
    this.beforeLogin.$on(lifeOpt.beforeLoginOpt, [])
    this.afterLogin.$on(lifeOpt.afterLoginOpt, [])
    this.beforeLogout.$on(lifeOpt.beforeLogoutOpt, [])
    this.afterLogout.$on(lifeOpt.afterLogoutOpt, [])
    this.onXhrOpen.$on(lifeOpt.onXhrOpenOpt, [])
    this.onXhrSend.$on(lifeOpt.onXhrSendOpt, [])
    this.onXhrChange.$on(lifeOpt.onXhrChangeOpt, [])
  }
}