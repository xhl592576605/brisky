module.exports = {
  // 页面入口，不能删除
  pageEntry: {
    '$pages/js/index.js': './src/main.ts',
  },
  layout: {
    'views/layout-spa/index.js': './src/components/layout-spa/index.tsx',
  },
  vessel: {
    'views/vessel-blank/index.js': './src/components/vessel-blank/index.tsx',
  },
  exception: {
    'views/exception-501/index.js': './src/components/exception-501/index.tsx',
    'views/exception-404/index.js': './src/components/exception-404/index.tsx'
  },
  login: {
    'views/login/index.js': './src/components/login/index.tsx',

  }
}