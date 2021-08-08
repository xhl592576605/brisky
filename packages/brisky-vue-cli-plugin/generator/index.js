const { done, log, warn, info, error } = require("@vue/cli-shared-utils")
module.exports = (api, options = {}, rootOptions = {}) => {
  const { vueVersion } = rootOptions
  if (vueVersion === '3') {
    info = ('正在进行vue3的vogter框架初始化....')
    let _extendPackage = {
      "scripts": {
        "serve": "vue-cli-service serve -v ./views.conf.ts -d",
        "build": "vue-cli-service build --no-clean -v ./views.conf.ts ",
        "lint": "vue-cli-service lint"
      }
      // "vuePlugins": {
      //   "service": [
      //     "node_modules/@brisky/vue-cli-plugin-pack/index.js"
      //   ]
      // }
    }
    let fileKeys = ['public/favicon.ico', 'public/index.html', 'src/App.vue', 'src/main.ts', 'src/components/HelloWorld.vue']
    let fileTemplate = options.isBrisky ? './template-brisky' : './template'
    if (fileTemplate) {
      api.extendPackage(_extendPackage)
      api.render((files, render) => {
        fileKeys.forEach(key => {
          delete files[key]
        })
      })
      api.render(fileTemplate)
    }
    api.exitLog('初始化完成', 'info')
    api.exitLog('"npm run serve" 运行项目', 'info')
  }
}