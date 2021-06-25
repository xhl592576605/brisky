/*
 * @description:  定义框架的一些基本属性
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-08 21:54:39
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-25 21:45:15
 */

export default {
  sysId: 'brisky_123456',
  // 系统标题
  title: 'brisky',
  // 主题变量
  theme: 'light',
  // 代理配置
  proxy: {},
  // 登录后默认跳转的地址，支持函数
  root: '/',
  // 全局鉴权配置，支持多种，默认鉴权
  authorized: false,
  // 别名
  alias: {},
  // 路由
  routes: [],
  // 缓存控制函数
  version: function version() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    return [year, month > 9 ? month : '0' + month, day].join('')
  },
  messages: {
    10000: '请登录',
    12000: '登录状态已过期',
    12001: '登录状态已过期',
    12002: '登录状态已过期',
    12004: '该账户在其它地方登录',
    12005: '登录状态已过期',
    12008: '登录状态已过期',
    12009: '该账户已被注销',
    12010: '您已被管理员强制下线',
    12011: '请登录'
  },
}