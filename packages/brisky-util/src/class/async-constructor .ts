/*
 * @description: AsyncConstructor
 * @version: 1.0
 * @autor: brisky
 * @email: 592576605@qq.com
 * @date: 2021-06-27 00:57:39
 * @lastEditors: brisky
 * @lastEditTime: 2021-06-27 00:58:16
 */

export default class AsyncConstructor {
  then: any
  constructor(asyncConstructor: () => any) {
    const init = (async () => {
      await asyncConstructor()
      delete this.then
      return this
    })()
    this.then = init.then.bind(init)
  }
}