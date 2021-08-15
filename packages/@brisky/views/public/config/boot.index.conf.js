window.$frame = {
  debug: true,
  isLayout: true,
  alias: {
    'layout-spa': '/views/layout-spa/index.js',
    'vessel-blank': '/views/vessel-blank/index.js',
    'exception-501': '/views/exception-501/index.js',
    'exception-404': '/views/exception-404/index.js',
    'module-login': '/views/login/index.js'
  },
  login: {
    path: '/login',
    component: 'module-login'
  },
  routes: [{
    path: '/',
    component: 'exception-501',
    authorized: true
  }]
}