/*
 * @description: ApiService
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-05-27 19:28:55
 * @lastEditors: brisky
 * @lastEditTime: 2021-05-27 20:56:29
 */

import _ from 'lodash'
import axios from 'axios'
import Cookies from 'js-cookie'
import { DataCheck } from '@brisky/util'
import ApiServiceOpt from '../interface/api-service-opt'
import $loadConfig from '../util/load-config'
const CancelToken = axios.CancelToken

export default class ApiService {

  private option: ApiServiceOpt
  private $dataCheck: DataCheck
  private axiosObj: any = null
  private apiCancelToken: Object = {}

  /**
   *服务配置
   */
  serviceConfigs: Object = {}

  constructor(option: ApiServiceOpt) {
    this.$dataCheck = new DataCheck()
    this.option = option
    this.loadServiceConfig()
  }

  /**
   * 动态加载api配置
   */
  async loadServiceConfig(): Promise<any> {
    const { api } = this.option
    const conf = await $loadConfig(api)
    this.$dataCheck.$isObject(conf) &&
      _.merge(this.serviceConfigs, conf)
  }

  /**
   *  获取服务配置
   * @param chainKey 
   * @param serviceConfigs 
   * @param idx 
   * @returns 
   */
  getServiceConfig(chainKey: string, serviceConfigs: any[] = [], idx = 0) {
    if (idx >= serviceConfigs.length) {
      return null
    }
    const keys = chainKey.split('.')
    let config: any = null
    keys.forEach((key) => {
      if (!config) {
        config = serviceConfigs[idx][key]
      } else {
        config = config[key]
      }
    })
    if (!config) {
      const nextIdx = idx + 1
      config = this.getServiceConfig(chainKey, serviceConfigs, nextIdx)
    }
    return config
  }
  /**
   * 设置请求头部信息
   * @param config 
   * @returns 
   */
  setRequestHeaders(config: any) {
    if (config.certificate) {
      const { option, $dataCheck } = this
      const createToken = () => {
        const { getToken, tokenKey } = option
        if ($dataCheck.$isFunction(getToken)) {
          return getToken()
        }
        if ($dataCheck.$isString(tokenKey)) {
          return Cookies.get(tokenKey as string)
        }
        return Cookies.get('Bearer_Token')
      }
      Object.entries({
        Author: config.author,
        Authorization: createToken(),
        // 特殊处理：当delete|put方法时，用这个告诉服务端重写请求类型，传输层面的类型统一替换为POSt
        // 场景：部分服务器无法直接支持delete|put时
        'X-Http-Method-Override': config._method,
        'Cache-Control': 'no-cache',
        'Cache-control': 'no-store',
        Pragma: 'no-cache', // in http 1.0 = Cache-Control
        Expires: 1 // 有效值
      }).forEach(([key, val]) => {
        if (val) {
          config.headers[key] = val
        }
      })
    } else {
      config.headers['X-Http-Method-Override'] = config._method
      config.headers['Author'] = config.author
    }
    return config
  }

  /**
   * 创建取消接口请求的cancel token的实例对象
   */
  newCancelToken(apiKey: string) {
    const cToken = new CancelToken((cFunc) => {
      if (!this.apiCancelToken) {
        this.apiCancelToken = {}
      }
      this.apiCancelToken[apiKey] = cFunc
    })
    return cToken
  }

  /**
  * 注销Axios实例对象
  */
  disposeAxios() {
    if (this.axiosObj) {
      this.axiosObj = null
    }
  }

  /**
   * 获取请求服务
   * @returns 
   */
  getService() {
    let axiosObj = this.axiosObj
    if (!axiosObj) {
      const { axiosOpt = {} } = this.option
      axiosObj = axios.create(axiosOpt)
      // 配置发送请求前的拦截器 可以设置token信息
      axiosObj.interceptors.request.use(
        (config: any) => {
          this.setRequestHeaders(config)
          return config
        },
        (error: any) => {
          console.warn('[@brisky/api] 发起接口请求出现异常！')
          console.warn(error)
          return Promise.reject(error)
        }
      )
      // 配置响应拦截器
      axiosObj.interceptors.response.use(
        (resp: any) => {
          return Promise.resolve(resp)
        },
        (error: any) => {
          return Promise.resolve(error)
        }
      )
      this.axiosObj = axiosObj
    }
    return axiosObj
  }

  /**
   * 请求数据
   * @param apiChainKey 
   * @param apiOpt 
   * @returns 
   */
  $fetchData(apiChainKey: string, apiOpt: object) {
    const service = this.getService()
    const options = this.getServiceConfig(
      apiChainKey,
      [
        this.serviceConfigs || {},
      ],
      0
    )
    if (!options) {
      console.warn(`[@brisky/api] api配置例子：\n
        {
            "system": {
              "system": {
                "remark": "login api",
                "author": "author",
                "method": "get",
                "url": "/api/v1/login",
                "params": {}
              }
            }
        }或配置路径,文件内容规范一样`)
      throw new Error(
        `【${apiChainKey}】接口未配置`
      )
    }
    const opt = Object.assign(
      {
        params: {},
        cancelToken: this.newCancelToken(apiChainKey)
      },
      options,
      apiOpt
    )

    // 判断是否启用debug模式
    if (this.option.debug) {
      opt.params.debug = true
      console.log(`${apiChainKey}请求参数`, opt)
    }
    const promise = service(opt)
    return promise
  }

  /**
   * 请求数据
   * @param url 
   * @param apiOpt 
   * @returns 
   */
  $fetchDataByUrl(url: string, apiOpt: object) {
    if (!url || !url.length) {
      throw new Error('【url】参数未配置！')
    }
    const service = this.getService()
    const options = {
      url
    }
    const opt = Object.assign(
      {
        params: {},
        cancelToken: this.newCancelToken(url)
      },
      options,
      apiOpt
    )
    // 判断是否启用debug模式
    if (this.option.debug) {
      (opt.params as any).debug = true
      console.log(`${url}请求参数`, opt)
    }
    const promise = service(opt)
    return promise
  }

  /**
  * 取消接口请求
  */
  $cancelFetchApi(apiKey: string) {
    const { apiCancelToken, $dataCheck } = this
    let cancelFunc = {}
    if ($dataCheck.$isString(apiKey) && $dataCheck.$isObject(apiCancelToken[apiKey])) {
      cancelFunc[apiKey] = apiCancelToken[apiKey]
    } else {
      cancelFunc = apiCancelToken
    }
    for (var funcKey in cancelFunc) {
      if ($dataCheck.$isObject(apiCancelToken[apiKey])) {
        cancelFunc[funcKey].abort()
      }
      apiCancelToken[funcKey] = null
    }
  }
}