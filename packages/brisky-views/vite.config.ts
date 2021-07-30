import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import analyzer from 'rollup-plugin-analyzer'
import vitePluginBrisky from './vite-plugin-brisky'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  // root: resolve(__dirname,'pages'),
  // base: '/pages/',
  server: {
    open: '/pages/index.html'
  },
  build: {
    assetsDir: '__assets__',
    outDir: 'dist',//public
    emptyOutDir: false,
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      external: [
        // 'lodash',
        // 'requirejs',
        'vue',
        // 'vuex',
        // 'vue-router',
        // '@brisky/eventbus',
        // '@brisky/util',
        // '@brisky/api',
        // 'js-cookie'
      ],
      // 出口文件格式
      output: {
        // format: 'umd',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '__assets__/[name]',
        manualChunks: {}, // 取消chunk文件
        globals: {
          // '@brisky/util': 'BriskyUtil',
          // '@brisky/eventbus': 'BriskyEventBus',
          // '@brisky/api': 'BriskyApi',
          // 'vuex': 'Vuex',
          'vue': 'Vue',
          // 'vue-router': 'VueRouter',
          // 'crypto': 'crypto',
          // 'js-cookie': 'Cookies',
          // 'lodash': '_'
        }
      }
      // 要删除chrunt 
      // 删除hash值
    }
  },
  plugins: [analyzer(), resolve(), commonjs(), vue(), vueJsx(), vitePluginBrisky()]
})
