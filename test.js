const packages = require('.')
const isNumber = require('is-number')

test('is an array', () => {
  expect(Array.isArray(packages)).toBe(true)
})

test('has lots of packages', () => {
  expect(packages.length).toBeGreaterThan(3400)
})

test('has a high percentage of packages with sourceranks', () => {
  const ranked = packages.filter(p => isNumber(p.sourcerank))
  const percentage = ranked.length / packages.length * 100
  expect(percentage).toBeGreaterThan(85)
})

test('sorts results by sourcerank', () => {
  const sourceranks = packages.map(p => p.sourcerank)
  expect(sourceranks).toEqual(sourceranks.sort())
})
