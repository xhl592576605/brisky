window.$frame = {
  debug: true,
  isLayout: true,
  alias: {
    'layout-spa': '/resource/libs/@brisky/views/layout-spa/index.js',
    'vessel-blank': '/resource/libs/@brisky/views/vessel-blank/index.js',
    'exception-501': '/resource/libs/@brisky/views/exception-501/index.js',
    'exception-404': '/resource/libs/@brisky/views/exception-404/index.js',
    'module-login': '/resource/libs/@brisky/views/login/index.js'
  },
  login: {
    path: '/login',
    component: 'module-login'
  },
  routes: [{
    path: '/',
    component: 'vessel-blank',
    authorized: true
  }]
}