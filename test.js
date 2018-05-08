const test = require('tape')
const packages = require('.')

test('packages', function (t) {
  t.ok(Array.isArray(packages), 'is an array')
  t.ok(packages.length >= 1500, 'has lots of packages')
  const electronStore = packages.find(p => p.name === 'electron-store')
  t.ok(electronStore.sourcerank >= 10, 'has sourceranks')
  t.end()
})
