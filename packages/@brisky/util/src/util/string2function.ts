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
export default function String2Function(args: any, body: any) {
  if (arguments.length === 1) {
    body = args
    args = undefined
  }
  if (!body) {
    return () => { }
  }
  if (!body.includes('return')) {
    // 去除前后空格、换行
    body = body.replace(/^\s*/g, '')
    body = 'return ' + body
  }
  try {
    return args ? new Function(...args, body) : new Function(body)
  } catch (e) {
    // 这里需要把异常抛出来吗
    console.warn('函数解析失败', `'${body}'`)
    throw new Error(`函数解析失败:${body}'`)
  }
}
