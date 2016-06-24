const packages = require('.')

Object.keys(packages).forEach(name => {
  var pkg = packages[name]
  var keywords
  if (pkg.keywords) {
    keywords = pkg.keywords.map(k => `_${k}_`).join(', ')
    keywords = ` (${keywords})`
  }
  console.log(
    `- [${name}](http://npm.im/${name}) - ${pkg.description}${keywords} ([repo](http://ghub.io/${name}))`
  )
})
