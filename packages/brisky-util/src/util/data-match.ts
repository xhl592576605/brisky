/*
 * @description: 数据匹配
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-05-27 15:45:45
 * @lastEditors: brisky
 * @lastEditTime: 2021-05-27 16:02:44
 */

import DataCheck from './data-check'
export default class DataMatch {
  private $dataCheck: DataCheck

  constructor() {
    this.$dataCheck = new DataCheck()
  }

  /**
   * 匹配Array中的{}/@@占位的属性值，支持链式字符串
   * 如： 当前用户{user.userName}，当前用户@user.userName@
   * 如： 所在地区{user.area.areaName}，所在地区@user.area.areaName@
   * 返回Array
   */
  $matchData4Array(arr: Array<any>, data: any): any {
    arr = arr || []
    const matched: any[] = []
    arr.forEach((a) => {
      if (Array.isArray(a)) {
        matched.push(this.$matchData4Array(a, data))
      } else if (this.$dataCheck.$isObject(a)) {
        matched.push(this.$matchData4Object(a, data))
      } else {
        matched.push(this.$matchData4String(a, data))
      }
    })
    return matched
  }

  /**
  * 匹配Object中value的{}/@@占位的属性值，支持链式字符串
  * 如： 当前用户{user.userName}，当前用户@user.userName@
  * 如： 所在地区{user.area.areaName}，所在地区@user.area.areaName@
  * 返回Object
  */
  $matchData4Object(obj: object, data: any): any {
    const matched = {}
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        matched[key] = this.$matchData4Array(value, data)
      } else if (this.$dataCheck.$isObject(value)) {
        matched[key] = this.$matchData4Object(value, data)
      } else {
        matched[key] = this.$matchData4String(value, data)
      }
    })
    return matched
  }

  /**
   * 匹配字符串中的{}/@@占位的属性值，支持链式字符串
   * 规则调整：
   * {}方式会使用匹配到的指替换掉原字符串的{}，支持多组占位；
   * @@ 方式直接返回匹配到的值，且不支持多组占位；
   * 如： 当前用户{user.userName}，当前用户@user.userName@
   * 如： 所在地区{user.area.areaName}，所在地区@user.area.areaName@
   * 返回String
   */
  $matchData4String(str: string, data: any): any {
    let newStr = str || null
    if (newStr) {
      // 判断是否是替换原字符串方式
      const isReplace = newStr.indexOf('@') === -1
      // 获取匹配规则数组
      const mappings = newStr
        .replace(/{/g, '@')
        .replace(/}/g, '@')
        .split('@')
      if (Array.isArray(data)) {
        const matched: any[] = []
        mappings.forEach((m, idx) => {
          matched.push(false)
          if (m && m.length > 0) {
            const props = m.split('.')
            if (props.length > 0) {
              data.forEach((d) => {
                if (!matched[idx]) {
                  const mappingData = this.$iterateProps(
                    d,
                    props,
                    0,
                    isReplace
                  )
                  if (mappingData !== null) {
                    matched[idx] = true
                    newStr = isReplace
                      ? (newStr as string).replace(['{', m, '}'].join(''), mappingData)
                      : mappingData
                  }
                }
              })
            }
          }
        })
        // 未匹配到的设置为空字符串
        matched.forEach((match, idx) => {
          const m = mappings[idx]
          if (!match && m && m.length > 0) {
            newStr = isReplace
              ? (newStr as string).replace(['{', m, '}'].join(''), '')
              : null
          }
        })
      } else {
        mappings.forEach((m) => {
          if (m && m.length > 0) {
            const props = m.split('.')
            if (props.length > 0) {
              const mappingData = this.$iterateProps(
                data,
                props,
                0,
                isReplace
              )
              if (mappingData !== null) {
                newStr = isReplace
                  ? (newStr as string).replace(['{', m, '}'].join(''), mappingData)
                  : mappingData
              } else {
                newStr = isReplace
                  ? (newStr as string).replace(['{', m, '}'].join(''), '')
                  : null
              }
            }
          }
        })
      }
    }
    return newStr
  }

  /**
   * 迭代匹配
   * @param data 
   * @param props 
   * @param levelIndex 
   * @param isReplace 
   * @returns 
   */
  $iterateProps(data: any, props: any, levelIndex: any, isReplace = true): any {
    let mappingData = null
    if (data !== null && data !== undefined) {
      if (levelIndex < props.length) {
        const prop = props[levelIndex]
        const idx = prop * 1
        if (Number.isFinite(idx) && Array.isArray(data) && data[idx]) {
          mappingData = this.$iterateProps(
            data[idx],
            props,
            ++levelIndex,
            isReplace
          )
          // } else if (data.hasOwnProperty(prop)) { // 这个判断一直为false
        } else if (prop in data) {
          mappingData = this.$iterateProps(
            data[prop],
            props,
            ++levelIndex,
            isReplace
          )
        }
      } else {
        if (isReplace) {
          mappingData = Array.isArray(data) ? data.join(',') : data
        } else {
          mappingData = data
        }
      }
    }
    return mappingData
  }
}