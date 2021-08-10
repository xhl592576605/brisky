const pkg = require('package.json')
import { CAC } from 'cac'
const cli = new CAC('brisky') as CAC
cli.version(pkg.vesion)
cli.help()
cli.option('-- copy', 'copy dist to resouce')

cli.parse()