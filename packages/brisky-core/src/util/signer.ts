/*
 * @description: Signer
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-24 22:42:12
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-27 00:41:11
 */

import Cookie from 'js-cookie'

const PENCILS = {
  cookie: {
    read: (sign: string) => {
      return Cookie.get(sign)
    },
    write: (sign: string, value: any, expires = 86400) => {
      Cookie.set(sign, value, { expires: expires / 86400 })
    },
    erase: (sign: string) => {
      Cookie.remove(sign)
    }
  },
  local: {
    read: (sign: string) => {
      const result = localStorage.getItem(sign)
      return result === null ? undefined : result
    },
    write: (sign: string, value: any) => {
      localStorage.setItem(sign, value)
    },
    erase: (sign: string) => {
      localStorage.removeItem(sign)
    }
  },
  ram: {
    read(sign: string | number) {
      return this[sign]
    },
    write(sign: string | number, value: any) {
      this[sign] = value
    },
    erase(sign: string | number) {
      delete this[sign]
    }
  }
}


export default class Signer {
  name: string
  sign: any
  target: string
  constructor({ name, sign = location.port, target = 'cookie' }: any = {}) {
    this.name = name
    this.sign = sign
    this.target = target
  }
  read() {
    return PENCILS[this.target].read(this.$sign)
  }
  write(value: any, expires = 86400) {
    PENCILS[this.target].write(this.$sign, value, expires)
  }
  erase() {
    PENCILS[this.target].erase(this.$sign)
  }
  get $sign() {
    return `__${typeof this.sign === 'function' ? this.sign() : this.sign}__${this.name}`
  }
}