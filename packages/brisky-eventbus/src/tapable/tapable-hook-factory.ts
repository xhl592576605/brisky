/*
 * @description: TapableHookFactory
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-05-28 16:00:00
 * @lastEditors: brisky
 * @lastEditTime: 2021-05-30 19:11:57
 */

import _ from 'lodash'
import { HookOption, TapableHookType } from "src/interface/eventbus-opt"
import { AsyncHook, AsyncSeriesBailHook, AsyncSeriesLoopHook, AsyncSeriesWaterfallHook, SyncBailHook, SyncHook, SyncLoopHook, SyncWaterfallHook } from 'tapable'

export class TapableHookFactory {
  private option: HookOption

  constructor(option: HookOption) {
    _.merge(this.option = option)
  }


  /**
   * 根据配置创建hook实例
   * @returns 
   */
  createHookInstance() {
    const { option } = this
    let hook: any = null
    let args: string[] = []
    if (!Array.isArray(option.args)) {
      for (let i = 0;i < option.args;i++) {
        args.push(`args${i}`)
      }
    } else {
      args = option.args
    }
    const name = `${option.prefix}-${option.name}-${option.suffix}`
    const isAsync = option.name.includes('async.')
    switch (option.hookType) {
      case TapableHookType.Bail:
        //@ts-ignore
        hook = isAsync ? new AsyncSeriesBailHook(args, name) : new SyncBailHook(args, name)
        break
      case TapableHookType.Waterfall:
        //@ts-ignore
        hook = isAsync ? new AsyncSeriesWaterfallHook(args, name) : new SyncWaterfallHook(args, name)
        break
      case TapableHookType.Loop:
        //@ts-ignore
        hook = isAsync ? new AsyncSeriesLoopHook(args, name) : new SyncLoopHook(args, name)
        break
      default:
        //@ts-ignore
        hook = isAsync ? new AsyncHook(args, name) : new SyncHook(args, name)
        break
    }
    _.merge(hook, {
      isAsync,
      name: option.name,
      key: name,
      matchObject: option.matchObject || {}
    })
    return hook
  }

  /**
   * 创建钩子
   * @returns 
   */
  createHook() {
    const { option } = this
    const hook = this.createHookInstance()
    const interceptOpt = Object.assign({}, option.interceptOpt || {}, { context: option.context })
    hook.intercept(interceptOpt as Object)

    if (!Array.isArray(option.callBack) && option.callBack) {
      option.callBack = [option.callBack]
    }
    if (!option.callBack) {
      option.callBack = []
    }
    option.callBack.forEach((_callback) => {
      hook.isAsync ? hook.tapPromise(hook.key, _callback) : hook.tap(hook.key, _callback)
    })
    return hook
  }

}