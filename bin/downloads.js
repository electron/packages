const got = require('got')
const fs = require('fs')
const path = require('path')
// const pathExists = require('path-exists').sync
const packageNames = require('..').map(p => p.name)
const RateLimiter = require('limiter').RateLimiter
const limiter = new RateLimiter(1, 'second')

function getDownloadCount (pkg, callback) {
  const url = `https://api.npmjs.org/downloads/point/last-month/${pkg}`
  got(url)
    .then(result => { callback(null, JSON.parse(result.body).downloads) })
    .catch(error => { callback(error) })
}

packageNames
  // .filter(name => !pathExists(path.join(__dirname, `../downloads/${name}.json`)))
  .forEach(name => {
    limiter.removeTokens(1, function () {
      getDownloadCount(name, function (err, count) {
        if (err) return console.error(err)
        console.log(`${name}: ${count}`)
        fs.writeFileSync(path.join(__dirname, `../downloads/${name}.json`), String(count))
      })
    })
  })
