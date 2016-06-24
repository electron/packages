const packages = require('.')

Object.keys(packages).forEach(name => {
  console.log(
    `- [${name}](http://npm.im/${name}) - ${packages[name].description} ([repo](http://ghub.io/${name}))`
  )
})
