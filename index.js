require('./src/lib')
const { findCachedOrRequest } = require("./src/finder")

/**
 * Looks for cached data based on type, otherwise executes a request query
 * @param {string} query
 * @param {string} type 
 * @param {Date | number} timeout (optional) how long to cache data, defaults to 1 hour
 *  
 */
function find(type, query, timeout) {
    let now = new Date()
    if (!timeout) timeout = MillisecondsBetweenDates(now, now.addHours(1))
    if(isDate(timeout)) timeout = MillisecondsBetweenDates(now, timeout)
    return findCachedOrRequest(query, type, timeout)
}

module.exports = { find }