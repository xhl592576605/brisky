module.exports = {
  devServer: {
    port: 3000, // * 开发端口
    historyApiFallback: {
      rewrites: [
        {
          from: '.*',
          to: '/pages/index.html'
        }
      ],
      htmlAcceptHeaders: ['text/html']
    },
    open: true,
    overlay: true
  },
  // * 编译成果输出目录
  outputDir: 'public',
  // * 静态资源输出目录
  assetsDir: 'views/__assets__',
  // * 禁用css抽取
  css: { extract: false },
  // * 默认关减少编译时间
  productionSourceMap: true,
  // * babel转译兼容
  transpileDependencies: [],
  // * webpack配置
  configureWebpack: {},
  // @brisky/vue-cli-plugin-pack 无法删除app入口，从这边删除，使用view.conf.ts 作为入口
  chainWebpack (webpackConf) {
    webpackConf.entryPoints.delete('app')
  }
}
