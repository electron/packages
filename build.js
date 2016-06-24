const ChangesStream = require('changes-stream')
const fs = require('fs')
const path = require('path')
const got = require('got')
// const db = 'https://replicate.npmjs.com'
const db = 'https://skimdb.npmjs.com/registry'
const get = require('lodash.get')
const normalize = require('normalize-registry-metadata')

var changes = new ChangesStream({
  db: db,
  include_docs: true
})

class Package {
  constructor(doc) {
    var pkg = normalize(doc)
    var latest = get(pkg, 'dist-tags.latest')
    if (!latest) return this
    pkg = pkg.versions[latest]
    Object.keys(pkg).forEach(prop => {
      this[prop] = pkg[prop]
    })
    return this
  }

  devDependsOn(dep) {
    return this.devDeps.indexOf(dep) > -1
  }

  mentions(string) {
    return !!JSON.stringify(this).toLowerCase().includes(string.toLowerCase())
  }

  save() {
    fs.writeFileSync(
      path.join(__dirname, 'packages', `${this.name}.json`),
      JSON.stringify(this, null, 2)
    )
  }

  get devDeps() {
    return this.devDependencies ? Object.keys(this.devDependencies) : []
  }
}

got(db).then(response => {
  changes.on('data', function (change) {
    // stop after we've parsed all the things
    if (change.seq >= response.body.update_seq) {
      console.log('done')
      process.exit(0)
    }
    process.stdout.write('.')
    var pkg = new Package(change.doc)

    if (pkg.mentions('electron') && !pkg.mentions('electronic')) {
      console.log(pkg.name)
      pkg.save()
    }
  })
})
