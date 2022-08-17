const Keyv = require('keyv')
const { KeyvFile } = require('keyv-file')

const store = new KeyvFile({ filename: `/data/raw_test.json` })
const keyv = new Keyv({ store })

keyv.set('raw', {test: 'raw_test!'}, 1000).then(done => {
    keyv.get('raw', {raw: true}).then(console.log)
})