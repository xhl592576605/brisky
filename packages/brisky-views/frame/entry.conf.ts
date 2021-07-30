import _ from 'lodash'
import { defineConfig } from 'vite'
import ViteConfig from '../vite.config'
const { resolve } = require('path')

// 入口
const entry = {
   'pages/js/index': resolve(__dirname, '../pages/index.html'),
   //'pages/js/index': resolve(__dirname, '../frame/web/main.index.ts'),
  //'views/hello-word/index':resolve(__dirname, '../src/components/hello-word/index.tsx'),
}
export default defineConfig(_.merge(ViteConfig, {
  allowUnknownOptions:true,
  build: {
    rollupOptions: {
      input: entry
    }
  }
}))
