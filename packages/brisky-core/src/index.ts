import core from './core'
import appComp from './component/app'
import lifeOpt from './life-cycle/cycle-opt'
import loadModule from './util/load-module'
import loadComponent from './util/load-component'
export default new core(appComp)
export {
  core,
  lifeOpt,
  loadModule,
  loadComponent
}