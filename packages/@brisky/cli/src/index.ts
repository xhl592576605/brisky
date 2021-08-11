import { CAC } from 'cac'
const path = require('path')
const fs = require('fs-extra')

const root = process.env.WORKSPACE || (process.env.INIT_CWD || process.env.PWD || '')
const pkg = require(path.resolve(root, './package.json'))
const briskySystem = pkg.briskySystem
const cli = new CAC('brisky') as CAC

cli.version(pkg.vesion)

cli.command('copy', 'copy dist to resouce')
  .option('--from <from>', 'from dist')
  .option('--to <to>', 'to resouce')
  .action(_options => {
    if (briskySystem) {
      const from = _options.from ? path.resolve(process.cwd(), _options.from) : path.resolve(process.cwd(), './dist')
      const to = path.resolve(root, _options.to)
      fs.ensureDir(from).then(() => {
        fs.copySync(from, to, {
          filter: function (src: string) {
            return !src.includes('.d.ts') && !src.includes('.js.map') && !src.includes('src') && !src.includes('@brisky')
          }
        })
        fs.removeSync(path.resolve(to, 'src'))
      })
    } else {
      console.warn('If you are using the brisky framework, please package.json The file configuration briskySystem is true')
    }
  })

cli.help()
cli.parse()