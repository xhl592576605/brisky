/*!
  * @brisky/api v0.0.0
  * (c) 2021 @brisky/api
  * @license MIT
  */
var BriskyApi = (function (exports, axios, _, Cookies) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
  var Cookies__default = /*#__PURE__*/_interopDefaultLegacy(Cookies);

  /*!
    * @brisky/util v0.0.0
    * (c) 2021 brisky-util
    * @license MIT
    */
  /*
   * @description: 类型检查
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-27 15:42:14
   * @lastEditors: brisky
   * @lastEditTime: 2021-06-09 20:12:48
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
          return Array.isArray(obj) || true;
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
   * @description: 加载配置
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-27 17:29:00
   * @lastEditors: brisky
   * @lastEditTime: 2021-06-19 16:15:59
   */
  const cacheConfigs = {};
  const $dataCheck = new DataCheck();
  /**
   * LoadConfig
   * @param key
   * @returns
   */
  function loadConfig(key) {
      const promise = new Promise((resolve) => {
          const REG_JS = /(\.js)$/;
          const REG_JSON = /(\.json)$/;
          const REG_API = /^(api|\/api)/; // 不太好
          if (cacheConfigs[key]) {
              resolve(cacheConfigs[key]);
          }
          else if ($dataCheck.$isFunction(key)) {
              resolve(key());
          }
          else if (REG_JSON.test(key)) {
              axios__default
                  .get(key, {
                  baseURL: ''
              })
                  .then((res) => {
                  const config = res.data;
                  resolve((cacheConfigs[key] = config));
              });
          }
          else if (REG_API.test(key)) {
              axios__default.get(key).then((res) => {
                  const config = res.data.data;
                  resolve((cacheConfigs[key] = config));
              });
          }
          else if (REG_JS.test(key)) {
              window.require && window.require([key], (config) => {
                  resolve(config);
              });
          }
          else if ($dataCheck.$isObject(key)) {
              // Object对象判断
              resolve(key);
          }
          else {
              // string函数字符串
              resolve(String2Function('', key)());
          }
      });
      return promise;
  }

  /*
   * @description: ApiService
   * @version: 1.0
   * @autor: brisky
   * @email: 592576605@qq.com
   * @date: 2021-05-27 19:28:55
   * @lastEditors: brisky
   * @lastEditTime: 2021-06-19 12:53:27
   */
  const CancelToken = axios__default.CancelToken;
  class ApiService {
      option;
      $dataCheck;
      axiosObj = null;
      apiCancelToken = {};
      /**
       *服务配置
       */
      serviceConfigs = {};
      constructor(option) {
          this.$dataCheck = new DataCheck();
          this.option = option;
          this.loadServiceConfig();
      }
      /**
       * 动态加载api配置
       */
      async loadServiceConfig() {
          const { api } = this.option;
          const conf = await loadConfig(api);
          this.$dataCheck.$isObject(conf) &&
              ___default.merge(this.serviceConfigs, conf);
      }
      /**
       *  获取服务配置
       * @param chainKey
       * @param serviceConfigs
       * @param idx
       * @returns
       */
      getServiceConfig(chainKey, serviceConfigs = [], idx = 0) {
          if (idx >= serviceConfigs.length) {
              return null;
          }
          const keys = chainKey.split('.');
          let config = null;
          keys.forEach((key) => {
              if (!config) {
                  config = serviceConfigs[idx][key];
              }
              else {
                  config = config[key];
              }
          });
          if (!config) {
              const nextIdx = idx + 1;
              config = this.getServiceConfig(chainKey, serviceConfigs, nextIdx);
          }
          return config;
      }
      /**
       * 设置请求头部信息
       * @param config
       * @returns
       */
      setRequestHeaders(config) {
          if (config.certificate) {
              const { option, $dataCheck } = this;
              const createToken = () => {
                  const { getToken, tokenKey } = option;
                  if ($dataCheck.$isFunction(getToken)) {
                      return getToken();
                  }
                  if ($dataCheck.$isString(tokenKey)) {
                      return Cookies__default.get(tokenKey);
                  }
                  return Cookies__default.get('Bearer_Token');
              };
              Object.entries({
                  Author: config.author,
                  Authorization: createToken(),
                  // 特殊处理：当delete|put方法时，用这个告诉服务端重写请求类型，传输层面的类型统一替换为POSt
                  // 场景：部分服务器无法直接支持delete|put时
                  'X-Http-Method-Override': config._method,
                  'Cache-Control': 'no-cache',
                  'Cache-control': 'no-store',
                  Pragma: 'no-cache',
                  Expires: 1 // 有效值
              }).forEach(([key, val]) => {
                  if (val) {
                      config.headers[key] = val;
                  }
              });
          }
          else {
              config.headers['X-Http-Method-Override'] = config._method;
              config.headers['Author'] = config.author;
          }
          return config;
      }
      /**
       * 创建取消接口请求的cancel token的实例对象
       */
      newCancelToken(apiKey) {
          const cToken = new CancelToken((cFunc) => {
              if (!this.apiCancelToken) {
                  this.apiCancelToken = {};
              }
              this.apiCancelToken[apiKey] = cFunc;
          });
          return cToken;
      }
      /**
      * 注销Axios实例对象
      */
      disposeAxios() {
          if (this.axiosObj) {
              this.axiosObj = null;
          }
      }
      /**
       * 获取请求服务
       * @returns
       */
      getService() {
          let axiosObj = this.axiosObj;
          if (!axiosObj) {
              const { axiosOpt = {}, beforeSetRequestHeaders, afterSetRequestHeaders } = this.option;
              axiosObj = axios__default.create(axiosOpt || {});
              // 配置发送请求前的拦截器 可以设置token信息
              axiosObj.interceptors.request.use((config) => {
                  this.$dataCheck.$isFunction(beforeSetRequestHeaders) && beforeSetRequestHeaders(config);
                  this.setRequestHeaders(config);
                  this.$dataCheck.$isFunction(afterSetRequestHeaders) && afterSetRequestHeaders(config);
                  return config;
              }, (error) => {
                  console.warn('[@brisky/api] 发起接口请求出现异常！');
                  console.warn(error);
                  return Promise.reject(error);
              });
              // 配置响应拦截器
              axiosObj.interceptors.response.use((resp) => {
                  return Promise.resolve(resp);
              }, (error) => {
                  return Promise.resolve(error);
              });
              this.axiosObj = axiosObj;
          }
          return axiosObj;
      }
      /**
       * 请求数据
       * @param apiChainKey
       * @param apiOpt
       * @returns
       */
      $fetchData(apiChainKey, apiOpt = {}) {
          const service = this.getService();
          const options = this.getServiceConfig(apiChainKey, [
              this.serviceConfigs || {},
          ], 0);
          if (!options) {
              console.warn(`[@brisky/api] api配置例子：\n
        {
            "system": {
              "login": {
                "remark": "login api",
                "author": "author",
                "method": "get",
                "url": "/api/v1/login",
                "params": {}
              }
            }
        }或配置路径,文件内容规范一样`);
              throw new Error(`【${apiChainKey}】接口未配置`);
          }
          const opt = Object.assign({
              params: {},
              cancelToken: this.newCancelToken(apiChainKey)
          }, options, apiOpt);
          // 判断是否启用debug模式
          if (this.option.debug) {
              opt.params.debug = true;
              console.log(`${apiChainKey}请求参数`, opt);
          }
          const promise = service(opt);
          return promise;
      }
      /**
       * 请求数据
       * @param url
       * @param apiOpt
       * @returns
       */
      $fetchDataByUrl(url, apiOpt = {}) {
          if (!url || !url.length) {
              throw new Error('【url】参数未配置！');
          }
          const service = this.getService();
          const options = {
              url
          };
          const opt = Object.assign({
              params: {},
              cancelToken: this.newCancelToken(url)
          }, options, apiOpt);
          // 判断是否启用debug模式
          if (this.option.debug) {
              opt.params.debug = true;
              console.log(`${url}请求参数`, opt);
          }
          const promise = service(opt);
          return promise;
      }
      /**
      * 取消接口请求
      */
      $cancelFetchApi(apiKey) {
          const { apiCancelToken = {}, $dataCheck } = this;
          let cancelFunc = {};
          if ($dataCheck.$isString(apiKey) && $dataCheck.$isFunction(apiCancelToken[apiKey])) {
              cancelFunc[apiKey] = apiCancelToken[apiKey];
          }
          else {
              cancelFunc = apiCancelToken;
          }
          for (var funcKey in cancelFunc) {
              if ($dataCheck.$isFunction(cancelFunc[funcKey])) {
                  cancelFunc[funcKey]();
              }
              apiCancelToken[funcKey] = null;
          }
      }
  }

  exports.ApiService = ApiService;
  exports.loadConfig = loadConfig;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, axios, _, Cookies));
