/*
 * @description: CoreMenuPlugin 核心Token插件
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-21 23:24:18
 * @lastEditors: brisky
 * @lastEditTime: 2021-07-07 23:30:14
 */
import { Router } from "vue-router"
import core from "src/core"
import { BriskyPlugin } from "src/interface/option"
import lifeOpt from "src/life-cycle/life-opt"
import extendUrl from "src/util/extend-url"
import parseToken from 'src/util/pase-token'
import Signer from "src/util/signer"
import log from "src/util/log"
export default class CoreTokenPlugin implements BriskyPlugin {
  name: String;
  sysId: String | null
  tokenSigner: any
  refreshTokenSigner: any
  timer: any
  lock: any
  constructor() {
    this.name = 'core-token'
    this.sysId = null
    this.tokenSigner = null
    this.refreshTokenSigner = null
    this.timer = null
    this.lock = null
  }

  get ACCESS_TOKEN() {
    return this.tokenSigner && this.tokenSigner?.read()
  }

  get REFRESH_TOKEN() {
    return this.refreshTokenSigner && this.refreshTokenSigner?.read()
  }


  apply($core: core) {
    // 每次跳转 带上sysid
    $core.$lifeCycle.beforeGetSystem.$on(lifeOpt.beforeGetSystemOpt, ($core: core) => {
      const sysId = this.sysId = window.$sysId
      var params: any = {}
        ; (/sysId=[\w-]+/.test(location.search)) && (params.sysId = sysId)
      if (JSON.stringify(params) !== '{}') {
        // 路由刷新时保持
        const $router = $core.$router as Router
        $router.beforeEach((to, _from, next) => {
          const has = Object.keys(params).every(key => to.query[key])
          if (has) {
            next()
          } else {
            const query = Object.assign({}, to.query, params)
            next(Object.assign({}, to, { query }))
          }
        })

        // 窗口打开时保持
        const _open = window.open
        //@ts-ignore
        window.open = function (url) {
          url = extendUrl(url as string, params)
          _open(url)
        }
      }
    })

    // 初始化token refresh_token
    $core.$lifeCycle.awaitCoreReady.$on(lifeOpt.awaitCoreReadyOpt, async ($core: core) => {
      this.sysId = this.sysId || $core.$frame.sysId
      const sign = `${this.sysId}_${location.port}`
      this.tokenSigner = new Signer({ sign, name: 'access_token' })
      this.refreshTokenSigner = new Signer({ sign, name: 'refresh_token' })
      $core.defineDynamicProxy('AUTHORIZED', !!this.ACCESS_TOKEN)
      $core.defineDynamicProxy('TOKEN', this.ACCESS_TOKEN)
      $core.defineDynamicProxy('PAYLOAD', parseToken(this.ACCESS_TOKEN))
      if (!this.ACCESS_TOKEN && this.REFRESH_TOKEN) {
        return this.refresh($core)
      } else {
        return new Promise<void>(resolve => resolve())
      }
    })

    //定期检查token
    $core.$lifeCycle.afterAuthSuccess.$on(lifeOpt.afterAuthSuccessOpt, async ($core: core) => {
      this.regularCheck($core)
    })

    // 登录成功保存token
    $core.$lifeCycle.afterLogin.$on(lifeOpt.afterLoginOpt, (token: any) => {
      this.lock = null
      this.write(token)
      $core.AUTHORIZED = !!this.ACCESS_TOKEN
      $core.TOKEN = this.ACCESS_TOKEN
      $core.PAYLOAD = parseToken(this.ACCESS_TOKEN)
    })

    // 登出删除token
    $core.$lifeCycle.afterLogout.$on(lifeOpt.afterLogoutOpt, () => {
      this.erase()
      this.cancelRegularCheck()
      $core.AUTHORIZED = !!this.ACCESS_TOKEN
      $core.TOKEN = this.ACCESS_TOKEN
      $core.PAYLOAD = parseToken(this.ACCESS_TOKEN)
    })

    // 每次请求带上sysId
    $core.$lifeCycle.onXhrOpen.$on(lifeOpt.onXhrOpenOpt, (xhr: any) => {
      const { url } = xhr
      if (url.includes(($core.$apiService?.serviceConfigs as any)?.system?.login?.url)) {
        xhr.url = extendUrl(url, { sysId: this.sysId })
      }
      return xhr
    })

    // 若是刷新请求token 带上refresh_token
    $core.$lifeCycle.onXhrOpen.$on(lifeOpt.onXhrOpenOpt, (xhr: any) => {
      const { url } = xhr
      if (url.includes(($core.$apiService?.serviceConfigs as any)?.system?.refreshToken?.url)) {
        xhr.url = extendUrl(url, { refreshToken: this.REFRESH_TOKEN })
      }
      return xhr
    })

    // 判断每次请求带上token
    $core.$lifeCycle.onXhrSend.$on(lifeOpt.onXhrSendOpt, (xhr: any) => {
      if (/^http/.test(xhr.url)) {
        //请求不同源 不加token
        return
      }
      this.ACCESS_TOKEN && xhr.setRequestHeader('Authorization', this.ACCESS_TOKEN)
      return xhr
    })


    $core.$lifeCycle.onXhrChange.$on(lifeOpt.onXhrChangeOpt, (xhr: any) => {
      this.catch(xhr, $core)
    })

  }
  catch(xhr: any, $core: core) {
    if (xhr.status === 401) {
      if (xhr.readyState === 4) {
        const response = typeof xhr.response === 'string' ? JSON.parse(xhr.response) : xhr.response
        const code = response.error.errorCode
        const message = $core.$frame.messages[code]
        const status = { code, message }
        if (!this.lock) {
          // 标记一个状态，防止并发接口时重复调用注销方法
          this.lock = status
          // 先擦除刷新token，防止注销接口被401时阻塞勾子
          this.erase()
          $core.logout(status)
        }
        // 停止change事件分发给业务层
        xhr.go = false
      }
    }
    return xhr
  }

  /**
   * 定时刷新token
   * @param $core 
   * @returns 
   */
  regularCheck($core: core) {
    const interval = $core.$frame.tokenInterval || 5 // 5分钟刷新确认一次，该属性暂不开放
    if (this.timer) return
    this.timer = window.setInterval(() => {
      const payload = parseToken(this.ACCESS_TOKEN)
      const deadline = payload.exp * 1000 // token过期时间
      const diff = (deadline - new Date().valueOf()) / 1000 / 60
      if (diff > interval) return // 临近token的过期时间时，才进行token预刷新操作
      this.refresh($core)
    }, interval * 60 * 1000)
  }

  cancelRegularCheck() {
    window.clearInterval(this.timer)
  }

  /**
   * 刷新token
   * @param $core 
   */
  refresh($core: core) {
    return $core?.$apiService?.$fetchData('system.refreshToken').then((res: any) => {
      const token = $core.$dataMatch.$matchData4String($core.$frame.matched?.data || '@data.data@', res)
      this.write(token)
    }).catch((err: any) => {
      log('刷新token失败', err)
    })
  }

  /**
   * 保存token refreshToken
   * @param token 
   */
  write(token: { tokenType: any; accessToken: any; token: any; expiresIn: any; refreshToken: any; refreshTokenExpiresIn: any }) {
    this.tokenSigner.write(`${token.tokenType || 'Bearer'} ${token.accessToken || token.token}`, token.expiresIn)
    this.refreshTokenSigner.write(`${token.refreshToken}`, token.refreshTokenExpiresIn)
  }

  /**
   * 删除token
   */
  erase() {
    this.tokenSigner.erase()
    this.refreshTokenSigner.erase()
  }


}