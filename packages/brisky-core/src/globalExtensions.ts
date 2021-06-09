import core from "./core"
declare module '@vue/runtime-core' {
  export interface ComponentCustomOptions {
  }
  export interface ComponentCustomProperties {
    $core: core
  }
}

declare global {
  interface Window {
    $core?: core,
    $frame?: any
  }
}