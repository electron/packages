const fs = require('fs')
const path = require('path')

const exists = require('path-exists').sync
var packages = require('object-values')(require('require-dir')('./packages'))


packages.forEach(p => {
  var file = path.join(__dirname, `./downloads/${p.name}.json`)
  if (exists(file)) {
    p.downloadsInLastMonth = Number(fs.readFileSync(file, 'utf8'))
  }
})


module.exports = packages
