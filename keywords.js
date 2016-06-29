var packages = require('.')
const find = require('lodash.find')
const sortby = require('lodash.sortby')
var counts = []

packages.forEach(p => {
  if (!p.keywords) return

  p.keywords.forEach(keyword => {
    var count = find(counts, {keyword: keyword})
    if (count) {
      count.count += 1
    } else {
      counts.push({keyword: keyword, count:1})
    }
  })
})

counts = sortby(counts, 'count').reverse()

counts.forEach(count => {
  var keyword = count.keyword
  var count = count.count
  if (keyword.toLowerCase() === 'electron') return

  console.log(`\n\n### ${keyword} (${count})\n\n`)

  packages
    .filter(p => {
      return p.keywords && p.keywords.indexOf(keyword) > -1
    })
    .forEach(p => {
      console.log(`- [${p.name}](http://npm.im/${p.name}) - ${p.description}`)
    })

})
