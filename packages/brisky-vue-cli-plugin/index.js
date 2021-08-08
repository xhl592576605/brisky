const path = require('path')
const fs = require('fs')
const { Command } = require('commander')
const { done, log, warn, info, error } = require("@vue/cli-shared-utils")
const pkg = require(path.resolve(process.env.INIT_CWD, './package.json'))
const program = new Command()
program
  .option('-t --template [template]', 'html页面路径', 'public/pages/index.html')
  .option('-c --config [config]', 'vue-cli-service 配置路径')
  .option('-l --limit [limit]', '静态资源的限制比例(limit*1024)', 4)
  .option('--no-minimize [minimize]', '是否压缩代码')
  .option('-v --views [views]', 'brisky 配置入口')
  .option('-f --force [force]', '强制覆盖没有变化的views')
  .option('--watch', '监听文件变化')
  .option("--report", "生成报告文件")
  .option('--no-clean')
  .option('--mode')
  .option('-d --debug', '显示debug信息')
  .parse(process.argv)
const options = program.opts()

const template = options.template
const config = options.config
const limit = options.limit
const minimize = options.minimize
const debug = options.debug
const force = options.force
const views = (function getViews (views, agrs1) {
  const _views = {}
  Object.entries(views).forEach(([key, value]) => {
    if ("[object Object]" === Object.prototype.toString.call(value)) {
      let __views = getViews(value, agrs1)
      if (Object.keys(__views).length !== 0) {
        _views[key] = __views
      }
    } else {
      agrs1 && agrs1.split(',').forEach(_args => {
        value.includes(_args) && (_views[key] = value)
      })
      !agrs1 && (_views[key] = value)
    }
  })
  return _views
})(options.views ? require(path.resolve(process.env.INIT_CWD, options.views)) : {}, program.args[1])

config && (process.env.VUE_CLI_SERVICE_CONFIG_PATH = path.resolve(process.env.INIT_CWD, config))
program.args[1] & process.argv.pop()

module.exports = (api, vueConf) => {
  debug && (done('views:'), console.log(views))
  api.chainWebpack(webpackConf => {
    const isDevelopment = "development" === process.env.NODE_ENV
    webpackConf.entryPoints.delete('app');
    (function addEntry (views) {
      Object.entries(views).forEach(([key, value]) => {
        '!' !== key[0] && (key = key.replace(/[!$]/, ''))
        if ("[object Object]" === Object.prototype.toString.call(value)) {
          addEntry(value)
        } else {
          webpackConf.entry(key).add(value)
        }
      })
    })(views)
    if (views && webpackConf.entryPoints.length === 0) {
      error(`【${options.views}】中未匹配到任何views`)
    }

    const htmlStr = fs.readFileSync(path.resolve(process.env.INIT_CWD, template), 'utf-8')
    const reg = /(?<=require\.config\()([\s\S]*?)(?=\))/
    const _externalsStr = htmlStr.match(reg) && htmlStr.match(reg)[0] || "{}"
    let _externals = new Function("return " + _externalsStr)().map || {}

    _externals = Object.values(_externals).reduce((total, currentValue) => (Object.entries(currentValue).forEach(([key, value]) => {
      total[key] = {
        commonjs: key,
        commonjs2: key,
        amd: key,
        root: value.split("#")[1] || !/\.js$/.test(value) && value || key
      }
    }), total), {})
    debug && (done('externals:'), console.log(_externals))
    webpackConf.externals(_externals)

    !isDevelopment && (webpackConf.plugin('banner').use(
      require("webpack/lib/BannerPlugin"), [{
        banner: `${pkg.name} v${pkg.version}\n(c) ${new Date().getFullYear()} by @brisky/vue-cli-plugin-pack\n@license MIT`
      }]))

    !isDevelopment && (webpackConf.plugin('copy').tap(e => {
      const defCopy = e[0] || {}
      const { patterns = [] } = defCopy
      const defPatterns = patterns[0] || {}
      const { globOptions = {} } = defPatterns
      const { ignore = [] } = globOptions
      ignore.push('**/.*')
      return e
    }))

    !isDevelopment && !force && (webpackConf.plugin('differ').use(class {
      apply = (_webpackConf) => {
        const fsExtra = require('fs-extra')
        _webpackConf.hooks.emit.tap('differ', conf => {
          log('\n')
          let count = 0
          let assets = Object.entries(conf.assets).filter(([key,]) => {
            if (/(resource|data|config|upload)\/(.*)$/.test(key)) {
              delete conf.assets[key]
              return false
            }
            return true
          })
          assets.forEach(([key, value]) => {
            let code, _old, _new
            try {
              code = fsExtra.readFileSync(path.resolve(process.env.INIT_CWD, vueConf.outputDir, key), 'utf-8')
            } catch (e) {
              code = null
            }
            if (code) {
              if (/\.(js|map|html)$/.test(key)) {
                const reg = /\/\*![\s\S]*?\*\//
                let buffer
                value._value && (buffer = value._value)
                value.children && (buffer = value.children[0])
                value.source && (buffer = value.source().toString())
                _new = buffer.replace(reg, '')
                _old = code.replace(reg, '')
              } else {
                _old = _new = key
              }
            } else {
              _old = _new = NaN
            }
            _old === _new && (count === 0 && warn('以下编译输出未发生任何变化 -> 忽略覆盖'),
              count++,
              info(key),
              delete conf.assets[key])
          })
          count > 0 && (warn('通过命令行参数"-- --force" -> 强制覆盖'))
        })
      }
    }))

    webpackConf.output.library(process.env.npm_package_library)
      .libraryExport(process.env.npm_package_libraryExport)
      .libraryTarget("umd")
      .filename("[name]")
      .chunkFilename("[name]")

    webpackConf.plugins.delete("html")
    webpackConf.plugins.delete("prefetch")
    webpackConf.plugins.delete("preload")


    webpackConf.module.rules.delete("pug")
    webpackConf.module.rules.delete("postcss")
    webpackConf.module.rules.delete("sass")
    webpackConf.module.rules.delete("less")
    webpackConf.module.rules.delete("stylus")
    webpackConf.module.rules.delete("docs")
    webpackConf.module.rule("images").use("url-loader").loader("url-loader").tap(e =>
      Object.assign(e, {
        limit: 1024 * limit,
        name: '[name].[ext]'
      }))
    !isDevelopment && webpackConf.optimization.minimize(minimize)
    !isDevelopment && webpackConf.performance.maxAssetSize(1048576).maxEntrypointSize(1048576)
    webpackConf.optimization.delete("splitChunks")
    webpackConf.optimization.splitChunks({
      minSize: 10485760,
      minChunks: 1024,
      cacheGroups: {
        vendors: false,
        default: false
      }
    })
    webpackConf.cache({
      type: 'filesystem',
      allowCollectingMemory: true,
      buildDependencies: {
        config: [__filename],
      }
    })
    debug && (done('webpackConf:'), console.log(webpackConf.toConfig()))
  })
}
