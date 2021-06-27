/*!
  * @brisky/util v0.0.0
  * (c) 2021 brisky-util
  * @license MIT
  */
var BriskyUtil = (function (exports) {
  'use strict';

  /*
   * @description: 类型检查
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-27 15:42:14
   * @lastEditors: brisky
   * @lastEditTime: 2021-06-09 20:21:02
   */
  class DataCheck {
      /**
       * 是否是Object对象
       * @param obj
       * @returns
       */
      $isObject(obj) {
          return Object.prototype.toString.call(obj) === '[object Object]';
      }
      /**
       * 是否是Array对象
       * @param obj
       * @returns
       */
      $isArray(obj) {
          return Array.isArray(obj);
      }
      /**
       *  是否是字符串
       * @param str
       * @returns
       */
      $isString(str) {
          const typeStr = str instanceof String || (typeof str).toLowerCase();
          return typeStr === 'string';
      }
      /**
       * 是否是函数
       * @param fun
       * @returns
       */
      $isFunction(fun) {
          return typeof fun === 'function';
      }
      /**
       * 检查特殊字符
       * @param {*} str
       */
      $checkSpecialKey(str) {
          if (str) {
              // var specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
              const specialKey = '~!@#$%^&*+{}|"<>?';
              for (var i = 0; i < str.length; i++) {
                  if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
                      return false;
                  }
              }
              return true;
          }
          else {
              return true;
          }
      }
  }

  /*
   * @description: 数据匹配
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-27 15:45:45
   * @lastEditors: brisky
   * @lastEditTime: 2021-05-27 16:02:44
   */
  class DataMatch {
      $dataCheck;
      constructor() {
          this.$dataCheck = new DataCheck();
      }
      /**
       * 匹配Array中的{}/@@占位的属性值，支持链式字符串
       * 如： 当前用户{user.userName}，当前用户@user.userName@
       * 如： 所在地区{user.area.areaName}，所在地区@user.area.areaName@
       * 返回Array
       */
      $matchData4Array(arr, data) {
          arr = arr || [];
          const matched = [];
          arr.forEach((a) => {
              if (Array.isArray(a)) {
                  matched.push(this.$matchData4Array(a, data));
              }
              else if (this.$dataCheck.$isObject(a)) {
                  matched.push(this.$matchData4Object(a, data));
              }
              else {
                  matched.push(this.$matchData4String(a, data));
              }
          });
          return matched;
      }
      /**
      * 匹配Object中value的{}/@@占位的属性值，支持链式字符串
      * 如： 当前用户{user.userName}，当前用户@user.userName@
      * 如： 所在地区{user.area.areaName}，所在地区@user.area.areaName@
      * 返回Object
      */
      $matchData4Object(obj, data) {
          const matched = {};
          Object.entries(obj).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                  matched[key] = this.$matchData4Array(value, data);
              }
              else if (this.$dataCheck.$isObject(value)) {
                  matched[key] = this.$matchData4Object(value, data);
              }
              else {
                  matched[key] = this.$matchData4String(value, data);
              }
          });
          return matched;
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
      $matchData4String(str, data) {
          let newStr = str || null;
          if (newStr) {
              // 判断是否是替换原字符串方式
              const isReplace = newStr.indexOf('@') === -1;
              // 获取匹配规则数组
              const mappings = newStr
                  .replace(/{/g, '@')
                  .replace(/}/g, '@')
                  .split('@');
              if (Array.isArray(data)) {
                  const matched = [];
                  mappings.forEach((m, idx) => {
                      matched.push(false);
                      if (m && m.length > 0) {
                          const props = m.split('.');
                          if (props.length > 0) {
                              data.forEach((d) => {
                                  if (!matched[idx]) {
                                      const mappingData = this.$iterateProps(d, props, 0, isReplace);
                                      if (mappingData !== null) {
                                          matched[idx] = true;
                                          newStr = isReplace
                                              ? newStr.replace(['{', m, '}'].join(''), mappingData)
                                              : mappingData;
                                      }
                                  }
                              });
                          }
                      }
                  });
                  // 未匹配到的设置为空字符串
                  matched.forEach((match, idx) => {
                      const m = mappings[idx];
                      if (!match && m && m.length > 0) {
                          newStr = isReplace
                              ? newStr.replace(['{', m, '}'].join(''), '')
                              : null;
                      }
                  });
              }
              else {
                  mappings.forEach((m) => {
                      if (m && m.length > 0) {
                          const props = m.split('.');
                          if (props.length > 0) {
                              const mappingData = this.$iterateProps(data, props, 0, isReplace);
                              if (mappingData !== null) {
                                  newStr = isReplace
                                      ? newStr.replace(['{', m, '}'].join(''), mappingData)
                                      : mappingData;
                              }
                              else {
                                  newStr = isReplace
                                      ? newStr.replace(['{', m, '}'].join(''), '')
                                      : null;
                              }
                          }
                      }
                  });
              }
          }
          return newStr;
      }
      /**
       * 迭代匹配
       * @param data
       * @param props
       * @param levelIndex
       * @param isReplace
       * @returns
       */
      $iterateProps(data, props, levelIndex, isReplace = true) {
          let mappingData = null;
          if (data !== null && data !== undefined) {
              if (levelIndex < props.length) {
                  const prop = props[levelIndex];
                  const idx = prop * 1;
                  if (Number.isFinite(idx) && Array.isArray(data) && data[idx]) {
                      mappingData = this.$iterateProps(data[idx], props, ++levelIndex, isReplace);
                      // } else if (data.hasOwnProperty(prop)) { // 这个判断一直为false
                  }
                  else if (prop in data) {
                      mappingData = this.$iterateProps(data[prop], props, ++levelIndex, isReplace);
                  }
              }
              else {
                  if (isReplace) {
                      mappingData = Array.isArray(data) ? data.join(',') : data;
                  }
                  else {
                      mappingData = data;
                  }
              }
          }
          return mappingData;
      }
  }

  /*
   * @description: 字符串转函数
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-27 17:29:34
   * @lastEditors: brisky
   * @lastEditTime: 2021-05-27 17:31:57
   */
  /**
   * String2Function
   * @param args
   * @param body
   * @returns
   */
  function String2Function(args, body) {
      if (arguments.length === 1) {
          body = args;
          args = undefined;
      }
      if (!body) {
          return () => { };
      }
      if (!body.includes('return')) {
          // 去除前后空格、换行
          body = body.replace(/^\s*/g, '');
          body = 'return ' + body;
      }
      try {
          return args ? new Function(...args, body) : new Function(body);
      }
      catch (e) {
          // 这里需要把异常抛出来吗
          console.warn('函数解析失败', `'${body}'`);
          throw new Error(`函数解析失败:${body}'`);
      }
  }

  /*
   * @description: AsyncConstructor
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-06-27 00:57:39
   * @lastEditors: brisky
   * @lastEditTime: 2021-06-27 00:58:16
   */
  class AsyncConstructor {
      then;
      constructor(asyncConstructor) {
          const init = (async () => {
              await asyncConstructor();
              delete this.then;
              return this;
          })();
          this.then = init.then.bind(init);
      }
  }

  exports.AsyncConstructor = AsyncConstructor;
  exports.DataCheck = DataCheck;
  exports.DataMatch = DataMatch;
  exports.String2Function = String2Function;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
