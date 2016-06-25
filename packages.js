const packages = require('.')

Object.keys(packages).forEach(name => {
  var pkg = packages[name]
  var description = pkg.description || ''
  var keywords = ''
  if (pkg.keywords) {
    keywords = pkg.keywords.map(k => `_${k}_`).join(', ')
    keywords = ` (${keywords})`
  }
  console.log(
    `- [${name}](http://npm.im/${name}) - ${description}${keywords} ([repo](http://ghub.io/${name}))`
  )
})
