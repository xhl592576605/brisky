import $core, { core, CoreOption } from '@brisky/core'
import render from './render';
import routers from './router'
import store from './store'
const coreOption: CoreOption = {
  routers,
  store,
  render,
  apiServiceOpt: {
    debug: true,
    api: '/config/api.json'
  }
};
($core as core).init(coreOption)