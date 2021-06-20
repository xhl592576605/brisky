/*
 * @description: cycle-opt 生命周期参数
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-09 22:05:02
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-20 16:55:45
 */

import { BaseEventOption, HookOption, TapableHookType } from "@brisky/eventbus"

const baseOpt: BaseEventOption = {
  prefix: 'brisky',
  suffix: 'lifeCycle',
  name: 'lifeCycle'
}

const beforeGetSystemOpt: HookOption = {
  ...baseOpt,
  name: 'beforeGetSystem',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}

const awaitGetSystemOpt: HookOption = {
  ...baseOpt,
  name: 'async.getSystem',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}
const afterGetSystemOpt: HookOption = {
  ...baseOpt,
  name: 'afterGetSystem',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}

const beforeCoreReadyOpt: HookOption = {
  ...baseOpt,
  name: 'beforeCoreReady',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}

const awaitCoreReadyOpt: HookOption = {
  ...baseOpt,
  name: 'async.coreReady',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}

const afterCoreReadyOpt: HookOption = {
  ...baseOpt,
  name: 'afterCoreReady',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}

const beforeCreateAppOpt: HookOption = {
  ...baseOpt,
  name: 'beforeCreateApp',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}

const afterCreateAppOpt: HookOption = {
  ...baseOpt,
  name: 'afterCreateApp',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}

const beforeInjectPropsOpt: HookOption = {
  ...baseOpt,
  name: 'beforeInjectProps',
  hookType: TapableHookType.Default,
  args: ['props'],
  callBack: []
}

const afterAuthSuccessOpt: HookOption = {
  ...baseOpt,
  name: 'async.afterAuthSuccess',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}

const afterAuthNothingOpt: HookOption = {
  ...baseOpt,
  name: 'async.afterAuthNothing',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}
const afterAuthFailureOpt: HookOption = {
  ...baseOpt,
  name: 'async.afterAuthFailure',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}
const beforeLoginOpt: HookOption = {
  ...baseOpt,
  name: 'beforeLogin',
  hookType: TapableHookType.Default,
  args: ['core'],
  callBack: []
}
const afterLoginOpt: HookOption = {
  ...baseOpt,
  name: 'afterLogin',
  hookType: TapableHookType.Default,
  args: ['token'],
  callBack: []
}
const beforeLogoutOpt: HookOption = {
  ...baseOpt,
  name: 'beforeLogout',
  hookType: TapableHookType.Default,
  args: ['status'],
  callBack: []
}
const afterLogoutOpt: HookOption = {
  ...baseOpt,
  name: 'afterLogout',
  hookType: TapableHookType.Default,
  args: ['status'],
  callBack: []
}
const onXhrOpenOpt: HookOption = {
  ...baseOpt,
  name: 'async.onXhrOpen',
  hookType: TapableHookType.Waterfall,
  args: ['context'],
  callBack: []
}
const onXhrSendOpt: HookOption = {
  ...baseOpt,
  name: 'async.onXhrSend',
  hookType: TapableHookType.Waterfall,
  args: ['core'],
  callBack: []
}
const onXhrChangeOpt: HookOption = {
  ...baseOpt,
  name: 'async.onXhrChange',
  hookType: TapableHookType.Waterfall,
  args: ['core'],
  callBack: []
}

export default {
  beforeGetSystemOpt,
  awaitGetSystemOpt,
  afterGetSystemOpt,
  beforeCoreReadyOpt,
  awaitCoreReadyOpt,
  afterCoreReadyOpt,
  beforeCreateAppOpt,
  afterCreateAppOpt,
  beforeInjectPropsOpt,
  afterAuthSuccessOpt,
  afterAuthNothingOpt,
  afterAuthFailureOpt,
  beforeLoginOpt,
  afterLoginOpt,
  beforeLogoutOpt,
  afterLogoutOpt,
  onXhrOpenOpt,
  onXhrSendOpt,
  onXhrChangeOpt
}