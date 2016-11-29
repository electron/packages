const test = require('tape')
const packages = require('.')

test('packages', function (t) {
  t.ok(Array.isArray(packages), 'is an array')
  t.ok(packages.length > 1600, 'has lots of packages')

  const electronIsDev = packages.find(p => p.name === 'electron-is-dev')
  t.ok(electronIsDev.dependents.length > 3, 'packages have arrays of dependents')

  const electronPackager = packages.find(p => p.name === 'electron-packager')
  t.ok(electronPackager.devDependents.length > 100, 'packages have arrays of devDependents')
  t.end()
})
