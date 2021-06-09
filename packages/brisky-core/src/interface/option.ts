import core from "../core"
import { RouterOptions } from "vue-router"
import { StoreOptions } from "vuex"


export interface CoreOption {
  store: StoreOptions<Object>,
  router: RouterOptions,
  plugins?: Array<any>
  hooks?: EventObject,
  briskyPlugins?: Array<BriskyPlugin>,
  alias?: Object
}

export interface EventObject {
  [key: string]: Function | Array<Function> | string
}

export interface BriskyPlugin {
  name: String,
  apply: ($core: core) => void
}