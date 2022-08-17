const { find } = require('../index')
const { KeyvFile } = require('keyv-file')
const { join } = require('path')

/**
 * Wrap the Find function in order to run tests and store data locally
 * @param {*} type 
 * @param {*} query 
 * @param {*} timeout 
 * @param {string} debug 
 */
function find_test(type, query, timeout, debug = true) {
    const store = new KeyvFile({ filename: join(__dirname, `/data/${type}.json`) })
    return find(type, query, timeout, store, debug)
}
module.exports = { find_test }