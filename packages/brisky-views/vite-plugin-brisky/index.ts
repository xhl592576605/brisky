export default function briskyPlugin() {
  return {
    name: 'vite-plugin-brisky',
    config: (conf: any, { mode, command }: any) => {
      debugger
    },
    buildstart: (conf: any,) => {
      debugger
    },
    transform: (code: string, id: string) => {
      return code
    },
    transformIndexHtml: (html: string) => {
      //定义html标签，解析html
      const parseCode = (path: string) => {
        return require('fs').readFileSync(require('path').resolve(path.trim()), 'utf8')
      }
      const reg = /<brisky-async>(.*)<\/brisky-async>/g
      const codeMatchs = html.match(reg) || []
      codeMatchs.forEach(cm => {
        const newCode = parseCode(cm.replace('<brisky-async>', '').replace('</brisky-async>', ''))
        html = html.replace(cm, newCode)
      })

      return html
    }
  }
}