module.exports = {
  lang: 'zh-CN',
  title: 'Brisky',
  description: '致力于整合前端固有的功能点，达到即开即用的前端框架 ',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    // ['link', { rel: 'manifest', href: '/images/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/logo.png' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate' }],
    ['meta', { 'http-quiv': 'expires', cotent: '0' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }]
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/brisky-docs/', // 部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    navbar: [ // 导航栏配置   
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/xhl592576605/brisky' }
    ],
    sidebar: require("./sidebar"),
    displayAllHeaders: true,
    //sidebarDepth: 2
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        skipWaiting: true,
      },
    ],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      }
    ]
  ]
};