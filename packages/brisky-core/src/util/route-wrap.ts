/*
 * @description: 路由修饰
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-20 15:17:56
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-22 23:41:01
 */

import core from "src/core"
import { RouteRecordRaw } from "vue-router"

const metaWrap = ({ meta = {}, component }: any, $core: core) => {
  const $frame = $core.$frame
  // 读取组件
  const layoutKey = meta.layoutKey || 'layout-spa'
  const vesselKey = meta.vesselKey || 'vessel-blank'
  const moduleKey = component || meta.moduleKey || 'exception-501'
  const { layoutConfig, vesselConfig, moduleConfig } = meta

  const layout = $core.loadComponent(layoutKey, layoutConfig, { props: $frame[layoutKey] })
  const vessel = $core.loadComponent(vesselKey, vesselConfig, { props: $frame[vesselKey] })
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