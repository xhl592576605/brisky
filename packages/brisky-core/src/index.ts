import core from './core'
import appComp from './component/app'
import lifeOpt from './life-cycle/cycle-opt'
export default new core(appComp)
export {
  core,
  lifeOpt
}