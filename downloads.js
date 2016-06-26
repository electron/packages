const got = require('got')

function getDownloadCount(pkg, callback) {
  const url = `https://api.npmjs.org/downloads/point/last-month/${pkg}`
  got(url)
    .then(result => { callback(null, JSON.parse(result.body).downloads) })
    .catch(error => { callback(error) })
}

getDownloadCount('express', function(err, count) {
  console.log(count)
})
