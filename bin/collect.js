const fs = require('fs')
const path = require('path')
const registry = require('package-stream')()

registry
  .on('package', function (pkg) {
    process.stdout.write('.')

    // Ignore mentions of Electron in READMEs
    delete pkg.readme

    if (pkg.valid && pkg.mentions('electron') && !pkg.mentions('electronic')) {
      console.log(pkg.name)
      fs.writeFileSync(
        path.join(__dirname, '../packages', `${pkg.name}.json`),
        JSON.stringify(pkg, null, 2)
      )
    }
  })
  .on('up-to-date', function () {
    console.log('done')
    process.exit()
  })
