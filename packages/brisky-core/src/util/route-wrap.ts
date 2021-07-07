/*
 * @description: 路由修饰
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-20 15:17:56
 * @lastEditors: brisky
 * @lastEditTime: 2021-07-06 22:18:28
 */

import core from "src/core"
import { RouteRecordRaw } from "vue-router"

const metaWrap = ({ meta = {}, component }: any, $core: core) => {
  const $frame = $core.$frame
  let { layoutKey, layoutConfig, vesselKey, vesselConfig, moduleKey, moduleConfig } = meta

  layoutKey = $frame.isLayout ? layoutKey || 'layout-spa' : null
  vesselKey = $frame.isLayout ? vesselKey || 'vessel-blank' : null
  moduleKey = component || meta.moduleKey || 'exception-501'

  const layout = !!layoutKey ? $core.loadComponent(layoutKey, layoutConfig, { props: $frame[layoutKey] }) : null
  const vessel = !!vesselKey ? $core.loadComponent(vesselKey, vesselConfig, { props: $frame[vesselKey] }) : null
  const module = $core.loadComponent(moduleKey, moduleConfig, { props: $frame[moduleKey] })

  return {
    ...meta,
    layout,
    layoutKey,
    layoutConfig,
    vessel,
    vesselKey,
    vesselConfig,
    module,
    moduleKey,
    moduleConfig
  }
}

const routeWrap = (route: RouteRecordRaw | any, $core: core) => {
  const meta = metaWrap(route, $core)
  const component = meta.module
  return Object.assign({}, route, { component, meta })
}

export default routeWrap