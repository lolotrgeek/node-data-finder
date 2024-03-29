require('./src/lib')
const { findCachedOrRequest } = require("./src/finder")

/**
 * Looks for cached data based on type, otherwise executes a request query
 * @param {string} query a url to request data from. 
 * @note Passing `"clear"` instead of a url in the `query` will clear this cache
 * @param {string} type tag used to separate data caches
 * @param {Date | number} timeout (optional) how long to cache data, defaults to 1 hour
 * @param {bool} debug (optional) set `true` to see log
 *  
 */
function find(type, query, timeout, store, debug) {
    let now = new Date()
    if (!timeout) timeout = MillisecondsBetweenDates(now, now.addHours(1))
    if(isDate(timeout)) timeout = MillisecondsBetweenDates(now, timeout)
    if(store) return findCachedOrRequest(query, type, timeout, store, debug)
    else return findCachedOrRequest(query, type, timeout, null, debug)
}

module.exports = { find }