const fs = require('fs')
const path = require('path')
const objectValues = require('object-values')
const requireDir = require('require-dir')
const exists = require('path-exists').sync
const Package = require('nice-package')
var packages = objectValues(requireDir('./packages')).map(pkg => {
  return new Package(pkg)
})

packages.forEach(p => {
  var file = path.join(__dirname, `./downloads/${p.name}.json`)
  if (exists(file)) {
    p.downloadsInLastMonth = Number(fs.readFileSync(file, 'utf8'))
  }
})

module.exports = packages
