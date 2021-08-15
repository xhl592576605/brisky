import $core, { core, CoreOption } from '@brisky/core'
import render from './render';
import routers from './router'
import store from './store'
const coreOption: CoreOption = {
  routers,
  store,
  render
};
($core as core).init(coreOption)