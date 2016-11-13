var packages = require('..')

console.log(`# ${packages.length} Packages`)
console.log('\n\nAll of these mention `electron` somewhere in their package.json\n\n')

packages.forEach(p => {
  var description = p.description || ''
  var keywords = ''
  if (p.keywords) {
    keywords = p.keywords.map(k => `_${k}_`).join(', ')
    keywords = ` (${keywords})`
  }
  var depCount = p.dependents.length + p.devDependents.length
  console.log(
    `- [${p.name}](http://npm.im/${p.name}) - ${description} (${depCount} dependents)${keywords} ([repo](http://ghub.io/${p.name}))`
  )
})
