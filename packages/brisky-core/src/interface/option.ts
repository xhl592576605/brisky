import core from "../core"
import { RouterOptions } from "vue-router"
import { StoreOptions } from "vuex"
import { ApiServiceOpt } from "@brisky/api"


export interface CoreOption {
  store?: StoreOptions<any>,
  routers?: RouterOptions,
  plugins?: Array<any>
  hooks?: EventObject,
  briskyPlugins?: Array<BriskyPlugin>,
  alias?: Object
  apiServiceOpt?: ApiServiceOpt
}

export interface EventObject {
  [key: string]: Function | Array<Function> | string
}

export interface BriskyPlugin {
  name: String,
  apply: ($core: core) => void
}