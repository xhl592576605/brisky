/*
 * @description:  CoreOrtherPlugin 其他
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-07-06 22:30:28
 * @lastEditors: brisky
 * @lastEditTime: 2021-07-07 23:52:24
 */

import _ from "lodash"
import minimatch from 'minimatch'
import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import lifeOpt from "src/life-cycle/life-opt"
export default class CoreXhrRewritePlugin implements BriskyPlugin {
  name: String;

  constructor() {
    this.name = 'core-xhr-rewrite'

  }

  apply($core: core) {

    /**
     * 重写url
    proxy=[
    {
      context: '/api/**',
      target: function (method, url) {
        return '/service/' + url
      }
    }] 
     */
    $core.$lifeCycle.onXhrOpen.$on(lifeOpt.onXhrOpenOpt, (xhr: any) => {
      const { proxy } = $core.frame
      let { method, url } = xhr
      let matched
      // 匹配
      if (Array.isArray(proxy)) {
        proxy.some(({ context, target }) => {
          if (!Array.isArray(context)) {
            context = [context]
          }
          const isMatch = context.some((pattern: string) => minimatch(url, pattern))
          if (isMatch) {
            matched = target
            return true
          } else {
            return false
          }
        })
      } else {
        for (const pattern in proxy) {
          if (minimatch(url, pattern)) {
            matched = proxy[pattern]
            break
          }
        }
      }
      // 重写
      if (matched) {
        if (typeof matched === 'function') {
          url = matched(method, url)
        } else {
          url = matched + url
        }
      }

      xhr.url = url

      return xhr
    })

  }



}