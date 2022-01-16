require('./lib')
const { findCachedOrRequest } = require("./src/finder")

/**
 * Looks for cached data based on type, otherwise executes a request query
 * @param {string} query
 * @param {string} type 
 * @param {Date} timeout (optional) how long to cache data, defaults to 1 hour
 *  
 */
function find(type, query, timeout) {
    if (!timeout) timeout = new Date().addHours(1)
    return findCachedOrRequest(query, type, timeout)
}

module.exports = { find }