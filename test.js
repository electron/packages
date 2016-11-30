const test = require('tape')
const packages = require('.')

test('packages', function (t) {
  t.ok(Array.isArray(packages), 'is an array')
  t.ok(packages.length >= 1500, 'has lots of packages')

  const electronIsDev = packages.find(p => p.name === 'electron-is-dev')
  t.ok(electronIsDev.dependents.length > 3, 'packages have arrays of dependents')

  const devtron = packages.find(p => p.name === 'devtron')
  t.ok(devtron.devDependents.length > 10, 'packages have arrays of devDependents')

  t.end()
})
