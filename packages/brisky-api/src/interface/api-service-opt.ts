export default interface ApiServiceOpt {
  debug: boolean
  // api 可以是路径 函数，或者对象
  api: string | Object
  tokenKey: string | null
  getToken: () => string
  axiosOpt: Object
}