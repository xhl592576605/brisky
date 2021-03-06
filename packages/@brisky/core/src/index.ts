import core from './core'
import appComp from './component/app'
import lifeOpt from './life-cycle/life-opt'
import loadModule from './util/load-module'
import loadComponent from './util/load-component'
import routeWrap from './util/route-wrap'
import { CoreOption, BriskyPlugin } from './interface/option'
export default new core(appComp)
export {
  core,
  lifeOpt,
  loadModule,
  loadComponent,
  routeWrap,
  CoreOption,
  BriskyPlugin
}