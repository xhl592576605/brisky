/*
 * @description: EventBusServcie
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-05-28 15:59:42
 * @lastEditors: brisky
 * @lastEditTime: 2021-05-28 17:59:16
 */

import { DataCheck } from '@brisky/util'
import { BaseEventOption, HookOption } from "src/interface/eventbus-opt"
import { TapableHookFactory } from 'src/tapable/tapable-hook-factory'

export default class EventBusServcie {

  private $dataCheck: DataCheck

  private baseHookOpt: any = {
    name: 'event',
    prefix: 'prefix',
    suffix: 'suffix'
  }

  public readonly eventStore: any = {}

  constructor() {
    this.$dataCheck = new DataCheck()
  }

  /**
   * 设置监听
   * @param option 
   * @param fn 
   */
  $on(option: HookOption | string, fn: Function | Array<Function>) {
    const { $dataCheck, baseHookOpt } = this
    if (!fn) {
      console.warn(`[@brisky/evnetbus] $on:至少需要一个回调函数`)
    }
    if ($dataCheck.$isFunction(fn)) {
      fn = [fn as Function]
    }
    let opt: HookOption
    if ($dataCheck.$isString(option)) {
      opt = {
        name: option as string,
        prefix: baseHookOpt.prefix,
        suffix: baseHookOpt.suffix,
        callBack: fn,
        args: 10
      }
    } else {
      opt = option as HookOption
      !opt.name && (opt.name = baseHookOpt.name)
      !opt.prefix && (opt.prefix = baseHookOpt.prefix)
      !opt.suffix && (opt.suffix = baseHookOpt.suffix)
      !opt.args && (opt.args = 10)
    }
    let hook = this.getHook(opt)
    if (hook) {
      (opt.callBack as Function[]).forEach(_callback => {
        this.newTap(hook, _callback)
      })
    } else {
      hook = new TapableHookFactory(opt).createHook()
      this.setHook(hook, opt)
    }
  }


  $emit(option: BaseEventOption | string, ...params: any[]) {

  }


  /**
  * 新增钩子注册
  * @param isAsync 
  * @param hook 
  * @param callBack 
  * @returns 
  */
  private newTap(hook: any, callBack: Function) {
    hook.isAsync ? hook.tapPromise(hook.key, callBack) : hook.tap(hook.key, callBack)
    return hook
  }

  /**
   * 获取hook
   * @param option 
   * @returns 
   */
  private getHook(option: HookOption) {
    let hook = null
    return hook
  }

  /**
   * 设置hook
   * @param hook 
   * @param option 
   */
  private setHook(hook: any, option: BaseEventOption) {

  }
}