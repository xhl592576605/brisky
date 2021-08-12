import $core, { core, CoreOption } from '@brisky/core'
import routers from './router'
import store from './store'
const coreOption: CoreOption = {
  routers,
  store
};
($core as core).init(coreOption)