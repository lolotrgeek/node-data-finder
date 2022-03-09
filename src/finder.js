const Keyv = require('keyv')
const { KeyvFile } = require('keyv-file')
const { Requester } = require('./requester')

/**
 * Looks for cached data based on type, otherwise executes a request query
 * @param {string} query
 * @param {string} type 
 * @param {number} timeout - milliseconds
 * @returns 
 */
function findCachedOrRequest(query, type, timeout) {
    if (typeof query !== 'string' || query === 'true' ) {
        return null
    }
    if (typeof type !== 'string') {
        return null
    }
    const keyv = new Keyv({ store: new KeyvFile({ filename: `./data/${type}.json` }) })
    return new Promise(async resolve => {
        try {
            let data = await keyv.get(`${type}`)
            if(!data) throw "no data"
            console.log(`Found cached data for ${type}`, data)
            resolve(data)
        } catch (error) {
            Requester(query, async data => {
                console.log(`Requesting data for ${type}`)
                await keyv.set(`${type}`, data, timeout)
                resolve(data)
            })
        }
    })
}

module.exports = { findCachedOrRequest }