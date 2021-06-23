/*
 * @description: CoreMenuPlugin 核心菜单插件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-21 23:24:18
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-22 23:55:40
 */

import qs from 'query-string'
import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import lifeOpt from "src/life-cycle/life-opt"
import log from 'src/util/log'
import routeWrap from 'src/util/route-wrap'

export default class CoreMenuPlugin implements BriskyPlugin {
  name: String;
  cache: {}
  constructor() {
    this.name = 'core-menu'
    this.cache = {}
  }
  apply($core: core) {

    // 定义菜单权限等
    $core.$lifeCycle.beforeCreateApp.$on(lifeOpt.beforeCreateAppOpt, ($core: core) => {
      $core.defineDynamicProxy('menu', $core.$frame.menu || [])
      $core.defineDynamicProxy('meta', $core.$router?.currentRoute?.value.meta)
      $core.defineDynamicProxy('permissions', $core.$router?.currentRoute?.value.meta?.permissions)
    })

    // 获取菜单并创建菜单路由
    $core.$lifeCycle.afterAuthSuccess.$on(lifeOpt.afterAuthSuccessOpt, async ($core: core) => {
      const { userId } = $core?.user
      if (this.cache[userId]) {
        return
      }
      const menusRow = await this.getMenus($core)
      if (!menusRow) {
        return
      }
      const reorganizeMenus = this.reorganizeMenus($core, menusRow)
      const { menusCachedById, menusCachedByPid } = this.menusCached($core, reorganizeMenus)
      const routes = this.routesGenerate($core, menusCachedById, menusCachedByPid)
      var menus = this.menusResolve($core, routes)
      log('菜单', menus)
      this.addRoutes($core, routes, menus)
      $core.menus = this.cache[userId] = menus
    })

    //登出，菜单删除
    $core.$lifeCycle.afterLogout.$on(lifeOpt.afterLogoutOpt, () => {
      this.cache = {}
      $core.menus = $core.$frame.menus || []
    })
  }

  /**
   * 添加路由
   * @param $core 
   * @param routes 
   * @param menus 
   */
  addRoutes($core: core, routes: any[], menus: any[]) {
    // 过滤掉包含协议头的路由，不算作正式路由
    routes = routes.filter(route => !route.meta.protocol)

    const roots = routes.filter(({ meta }) => meta.parent === undefined)
    const ROOT = roots.find(route => route.path === '/')
    if (ROOT) {
      // `/`优先级大于一切，不受target影响
      log('根路由：', [ROOT])
    } else {
      const redirect = this.normalizeRedirect(roots.map(root => root.meta))
      routes.unshift(routeWrap({
        path: '/',
        name: 'ROOT',
        redirect,
        component: redirect ? undefined : 'exception-404'
      }, $core))
      log('根路由：', roots)
    }

    log('菜单路由初始化完成：', routes)
    routes.forEach(route => {
      $core?.$router?.addRoute(route)
    })
  }

  /**
   * 生成菜单
   * @param $core 
   * @param routes 
   * @returns 
   */
  menusResolve($core: core, routes: any[]) {
    return routes.map(({ meta }) => ({
      id: meta.id,
      parentId: meta.parentId,
      path: meta.path,
      href: meta.href,
      query: meta.query,
      label: meta.label,
      icon: meta.icon,
      target: meta.target,
      layoutKey: meta.layoutKey,
      vesselKey: meta.vesselKey,
      moduleKey: meta.moduleConfig,
      protocol: meta.protocol
    }))
  }

  /**
   * 生成路由
   * @param $core 
   * @param menusCachedById 
   * @param menusCachedByPid 
   */
  routesGenerate($core: core, menusCachedById: {}, menusCachedByPid: {}) {
    const menuToMeta = (menu: any) => {
      const childrenMenus = menusCachedByPid[menu.id]
      const parent = menusCachedById[menu.parentId] || undefined
      const children = childrenMenus ? childrenMenus.map(menuToMeta) : undefined
      return {
        ...menu,
        parent,
        children
      }
    }

    return Object.values(menusCachedById).map((menu: any) => {
      const children = menusCachedByPid[menu.id] || []
      // 有协议头的过滤下，不能作为路由
      const childrenValid = children.filter((child: { protocol: any; }) => !child.protocol)
      const redirect = this.normalizeRedirect(childrenValid)
      return routeWrap({
        path: menu.path,
        query: menu.query,
        params: menu.params,
        name: `${menu.label}_${(menu.id).substring(0, 8)}`,
        redirect,
        meta: menuToMeta(menu)
      }, $core)
    })
  }

  /**
   * 菜单缓存
   * @param $core 
   * @param menus 
   * @returns 
   */
  menusCached($core: core, menus: any[]) {
    const menusCachedById = {}
    const menusCachedByPid = {}
    menus.forEach(menu => {
      const { id, parentId } = menu
      menusCachedById[id] = menu
      if (menusCachedByPid[parentId]) {
        menusCachedByPid[parentId].push(menu)
      } else {
        menusCachedByPid[parentId] = [menu]
      }
    })
    return { menusCachedById, menusCachedByPid }
  }

  /**
   * 整理菜单
   * @param $core 
   * @param menus 
   * @returns 
   */
  reorganizeMenus($core: core, menus: any) {
    return menus.map((menu: any) => {
      const layoutKey = menu.layoutKey || 'layout-nav'
      const vesselKey = menu.vesselKey || 'vessel-blank'
      const moduleKey = menu.accessible
        ? menu.moduleKey
          ? menu.moduleKey
          : 'exception-501'
        : 'exception-401'

      let url = menu.url || Math.random().toString(16).substring(2, 6)
      // 是否有协议头
      let protocol = ''
        ; /^http:/.test(url) && (protocol = 'http')
        ; /^https:/.test(url) && (protocol = 'https')

      // 兼容用户未输入斜杠开头
      if (!protocol && url[0] !== '/') {
        url = '/' + url
      }
      const ctx = $core.definedDynamicProxy()

      // 可以使用{}方式会使用匹配到的指替换掉原字符串的{}，支持多组占位；
      url = $core.$dataMatch.$matchData4String(url, Object.assign({ menu }, ctx))

      const query = qs.parse(url.split('?')[1] || '')
      const path = url.split('?')[0]
      return {
        id: menu.menuId,
        href: url,
        path,
        query,
        protocol,
        // 如果后代是个数组，当作是多模块节点，避免标示不统一
        children: vesselKey[0] === '#' ? [] : undefined,
        parent: undefined,
        parentId: menu.parentId,
        default: !!menu.isDefault,
        label: menu.menuName || menu.label,
        icon: menu.image || menu.icon,
        // 导航打开的方式
        target: menu.target,
        layoutKey: layoutKey,
        layoutConfig: menu.layoutConfig,
        visible: menu.visible,
        vesselKey: vesselKey,
        vesselConfig: menu.vesselConfig,
        moduleKey,
        moduleConfig: menu.moduleConfig,
        permissions: menu.permissions
      }
    })
  }

  /**
   * 获取菜单
   * @param $core 
   * @returns 
   */
  async getMenus($core: core) {
    const result = await $core.$apiService?.$fetchData('system.menu')
    const menu = $core.$dataMatch.$matchData4Object(result, $core.$frame.matched?.menu || '{data.data}')
    return menu
  }

  // 计算重定向
  normalizeRedirect(children: any[]) {
    // 过滤新标签页打开的路由
    children = children.filter(child => child.target !== '_blank')
    const route = (children.find(child => child.default === true) || children[0])
    return route ? { path: route.path, query: route.query } : undefined
  }
}