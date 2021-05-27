/*
 * @description: 类型检查
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-05-27 15:42:14
 * @lastEditors: brisky
 * @lastEditTime: 2021-05-27 15:50:06
 */

export default class DataCheck {
  /**
   * 是否是Object对象
   * @param obj 
   * @returns 
   */
  $isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  /**
   * 是否是Array对象
   * @param obj 
   * @returns 
   */
  $isArray(obj: any) {
    return Array.isArray(obj)
  }

  /**
   *  是否是字符串
   * @param str 
   * @returns 
   */
  $isString(str: any) {
    const typeStr = str instanceof String || (typeof str).toLowerCase()
    return typeStr === 'string'
  }
  /**
   * 是否是函数
   * @param fun 
   * @returns 
   */
  $isFunction(fun: any) {
    return typeof fun === 'function'
  }

  /**
   * 检查特殊字符
   * @param {*} str
   */
  $checkSpecialKey(str: string) {
    if (str) {
      // var specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
      const specialKey = '~!@#$%^&*+{}|"<>?'
      for (var i = 0;i < str.length;i++) {
        if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
          return false
        }
      }
      return true
    } else {
      return true
    }
  }
}