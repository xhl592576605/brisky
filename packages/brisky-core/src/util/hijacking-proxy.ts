/*
 * @description: hijacking-proxy 拦截对象
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-07-06 23:08:33
 * @lastEditors: brisky
 * @lastEditTime: 2021-07-08 22:02:53
 */

const hijackingCache = new Map()


/**
 * 拦截，重新定义对象
 * @param target 需要拦截的对象
 * @param options 要覆盖的新参数
 * @param attach 对象原始的挂载对象
 */
export function hijacking(target: any, options: any = {}, attach: any = window) {

  if (!target.name && typeof target.name !== 'string') {
    console.warn('target.name must be a string')
    return
  }
  const cacheTarget = hijackingCache.get(target)
  if (cacheTarget) {
    const [source, options] = cacheTarget
    console.warn(`${source.name} has been hijack`)
    console.warn(options)
    return
  } else {
    let proxy = function (this: any, ...args: any[]) {
      const nativeInstance = new target(args)
      const proxyInstance = this

      for (const key in nativeInstance) {
        if (typeof nativeInstance[key] === 'function') {
          const nativeMethod = nativeInstance[key]
          const proxyMethod = options[key]
          proxyInstance[key] = function (...args: any) {
            if (typeof proxyMethod === 'function' && proxyMethod.apply(nativeInstance, args) === false) {
              return
            }
            return nativeMethod.apply(nativeInstance, args)
          }
        } else {
          Object.defineProperty(proxyInstance, key, {
            get: () => {
              return nativeInstance[key]
            },
            set: (value) => {
              const property = options[key]
              if (typeof property === 'function') {
                nativeInstance[key] = function (...args: any) {
                  property.apply(nativeInstance, args) !== false && value.apply(nativeInstance, args)
                }
              } else {
                nativeInstance[key] = value
              }
            }
          })
        }
      }
      proxyInstance.name = target.name
      proxyInstance.__proxy__ = true
    }
    hijackingCache.set(proxy, [target, options, attach])
    attach[target.name] = proxy
  }
}

/**
 * 还原劫持对象
 * @param proxy 
 */
export function rescue(proxy: any) {
  const [target, , attach] = hijackingCache.get(proxy) || []
  if (target) {
    attach[target.name] = target
    hijackingCache.delete(target)
  }
}