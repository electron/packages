const ChangesStream = require('changes-stream')

var changes = new ChangesStream({
  db: 'https://skimdb.npmjs.com/registry',
  include_docs: true
})

changes.on('readable', function () {
  var change = changes.read()
  console.log('\n\n\n')
  console.dir(change)
})
