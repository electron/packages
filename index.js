const fs = require('fs')
const path = require('path')
const objectValues = require('object-values')
const requireDir = require('require-dir')
const exists = require('path-exists').sync
const dependents = require('dependent-packages')
const Package = require('nice-package')
const cleanDeep = require('clean-deep')
var packages = objectValues(requireDir('./packages')).map(pkgData => {
  var pkg = new Package(pkgData)

  var file = path.join(__dirname, `downloads/${pkg.name}.json`)
  if (exists(file)) pkg.downloadsInLastMonth = Number(fs.readFileSync(file, 'utf8'))

  pkg.dependents = dependents.dependentsOf(pkg.name) || []
  pkg.devDependents = dependents.devDependentsOf(pkg.name) || []

  return pkg
})
.filter(pkg => pkg.mentions('electron'))
.sort((a, b) => b.dependents.length - a.dependents.length)

module.exports = cleanDeep(packages)
