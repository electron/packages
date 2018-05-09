const objectValues = require('object-values')
const requireDir = require('require-dir')
const sourceranks = require('sourceranks')
const Package = require('nice-package')
const cleanDeep = require('clean-deep')

const packages = objectValues(requireDir('../packages'))
  .map(data => {
    var pkg = new Package(data)
    pkg.sourcerank = sourceranks[pkg.name]
    return pkg
  })
  .filter(pkg => pkg.mentions('electron'))
  .sort((a, b) => (b.sourcerank || 0) - (a.sourcerank || 0))

process.stdout.write(JSON.stringify(cleanDeep(packages), null, 2))
