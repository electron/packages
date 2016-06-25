var packages = require('.')

packages = Object.keys(packages)
  .map(name => packages[name])

console.log(`${packages.length} Packages`)
console.log('\n\nAll of these mention `electron` somewhere in their package.json\n\n')

packages.forEach(p => {
  var description = p.description || ''
  var keywords = ''
  if (p.keywords) {
    keywords = p.keywords.map(k => `_${k}_`).join(', ')
    keywords = ` (${keywords})`
  }
  console.log(
    `- [${p.name}](http://npm.im/${p.name}) - ${description}${keywords} ([repo](http://ghub.io/${p.name}))`
  )
})
