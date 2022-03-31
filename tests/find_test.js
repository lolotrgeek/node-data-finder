const { find } = require('../index')
const { KeyvFile } = require('keyv-file')
const store = new KeyvFile({ filename: __dirname + '/data/test.json' })


/**
 * Wrap the Find function in order to run tests and store data locally
 * @param {*} type 
 * @param {*} query 
 * @param {*} timeout 
 */
function find_test(type, query, timeout) {
    find(type, query, timeout, store)
}
module.exports = {find_test}