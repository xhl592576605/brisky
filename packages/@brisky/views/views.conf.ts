module.exports = {
  // 页面入口，不能删除
  pageEntry: {
    '$pages/js/index.js': './src/main.ts',
  },
  layout: {
    'resource/libs/@brisky/views/layout-spa/index.js': './src/components/layout-spa',
  },
  vessel: {
    'resource/libs/@brisky/views/vessel-blank/index.js': './src/components/vessel-blank',
  },
  exception: {
    'resource/libs/@brisky/views/exception-501/index.js': './src/components/exception-501',
    'resource/libs/@brisky/views/exception-404/index.js': './src/components/exception-404'
  },
  login: {
    'resource/libs/@brisky/views/login/index.js': './src/components/login',

  }
}