
const loadModule = (key: string | Function) => {
  return new Promise<any>(function (resolve, reject) {
    if (typeof key === 'string') {
      (window.require as any)(
        [key],
        (module: any) => {
          resolve(module.__esModule === true ? module.default : module)
        },
        (error: any) => {
          reject(error)
        }
      )
    } else {
      resolve(typeof key === 'function' ? key() : key)
    }
  })
}
export default loadModule
