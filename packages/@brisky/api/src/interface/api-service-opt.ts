export default interface ApiServiceOpt {
  debug: boolean
  // api 可以是路径 函数，或者对象
  api: string | Object
  tokenKey: string | null
  getToken: () => string | null
  axiosOpt: Object | null,
  beforeSetRequestHeaders: (config: any) => void | null
  afterSetRequestHeaders: (config: any) => void | null

}