const packages = require('.')
const isNumber = require('is-number')

test('is an array', () => {
  expect(Array.isArray(packages)).toBe(true)
})

test('has lots of packages', () => {
  expect(packages.length).toBeGreaterThan(3300)
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

test('excludes packages like `electron` and `electron-prebuilt`', () => {
  const names = packages.map(p => p.name)
  expect(names.includes('electron-storage')).toBe(true)
  expect(names.includes('electron')).toBe(false)
  expect(names.includes('electron-prebuilt')).toBe(false)
  expect(names.includes('matcha')).toBe(false)
})
