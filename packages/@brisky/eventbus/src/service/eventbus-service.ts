/*
 * @description: EventBusServcie
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-05-28 15:59:42
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-18 23:24:48
 */

import { DataCheck } from '@brisky/util'
import { BaseEventOption, HookOption } from "src/interface/eventbus-opt"
import { TapableHookFactory } from 'src/tapable/tapable-hook-factory'

export default class EventBusService {

  private $dataCheck: DataCheck

  private baseHookOpt: any = {
    name: 'event',
    prefix: 'prefix',
    suffix: 'suffix'
  }
  private eventStore: any = {}

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
      opt.callBack = fn
    }
    let hook = this.getHook(opt)
    if (hook.length > 0) {
      (opt.callBack as Function[]).forEach(_callback => {
        hook.forEach((_hook: any) => {
          this.newTap(_hook.hook, _callback)
        })
      })
    } else {
      hook = new TapableHookFactory(opt).createHook()
      this.setHook(hook)
    }
  }


  /**
   * 触发事件
   */
  async $emit(option: BaseEventOption | string, ...params: any[]) {
    const { $dataCheck } = this
    if ($dataCheck.$isString(option)) {
      option = {
        name: option as string,
      }
    }
    const hooks = this.getHookByBaseOpt(option as BaseEventOption)
    const hookCalls: any[] = []
    hooks.forEach((_hook: any) => {
      const { hook } = _hook
      const isAsync = hook.isAsync
      hookCalls.push(!isAsync ? hook.call(...params) : hook.promise(...params))
    })
    return await Promise.all(hookCalls)
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
   * 获取hook,根据key值，注册事件使用
   * @param option 
   * @returns 
   */
  private getHook(option: HookOption) {
    const { eventStore } = this
    const { name, prefix, suffix } = option
    const key = `${prefix}-${name}-${suffix}`
    const eventStoreArray = Object.values(eventStore).flat() || []
    return eventStoreArray.filter((i: any) => {
      return i.key == key
    }) || []
  }
  /**
   * 获取hook,根据key值，触发事件使用
   * @param option 
   */
  private getHookByBaseOpt(option: BaseEventOption) {
    const { eventStore, $dataCheck } = this
    const { name, prefix, suffix, matchObject } = option
    const key = `${prefix}-${name}-${suffix}`
    const eventStoreArray = Object.values(eventStore).flat() || []
    const _eventStore = eventStoreArray.filter((s: any) => {
      let flag = true
      for (const mKey in matchObject) {
        let match = matchObject[mKey]
        if ($dataCheck.$isString(match)) {
          match = match.split(',')
          const sValue = (s[mKey] || '').split(',')
          const idx = match.findIndex((m: any) => {
            return sValue.indexOf(m) > -1
          })
          flag = flag && idx > -1
        } else {
          flag = flag && s[mKey] === match
        }
      }
      return flag
    })
    if (!name) {
      return _eventStore
    }
    return _eventStore.filter((i: any) => {
      return !(prefix && suffix) ? i.name === name : i.key === key
    }) || []
  }

  /**
   * 设置hook
   * @param hook 
   * @param option 
   */
  private setHook(hook: any) {
    const { eventStore = {} } = this
    const { name, key, matchObject = {} } = hook
    if (!eventStore[name]) {
      eventStore[name] = []
    }
    const len = eventStore[name].filter((i: { key: any }) => { return i.key === key }).length
    if (len > 0) {
      return
    }
    eventStore[name].push({
      name,
      key,
      ...matchObject,
      hook
    })
  }
}