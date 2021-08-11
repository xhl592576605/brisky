
export enum TapableHookType {
  Default,
  Bail, // 返回undefined 不再执行
  Waterfall, // 返回的值会带入到下个回调
  Loop // 返回非 undefined 时继续再次执行当前的回调。
}

export interface BaseEventOption {
  prefix?: string
  suffix?: string
  name: string
  matchObject?: Object | {} //额外匹配信息

}

export interface HookOption extends BaseEventOption {
  args: Array<string> | Number // 用于实例化参数个数
  callBack: Array<Function> | Function // 回调函数
  hookType?: TapableHookType
  interceptOpt?: Object, // 用于拦截器
  context?: boolean //用于启用上下文，是直接配置在拦截器上，若是需要设置上下文的值，请在拦截器的拦截方法声明
}