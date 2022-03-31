const Keyv = require('keyv')
const { KeyvFile } = require('keyv-file')
const { Requester } = require('./requester')
const { unlink } = require('fs').promises
const { join } = require('path')
const { rejects } = require('assert')

/**
 * Looks for cached data based on type, otherwise executes a request query
 * @param {string} query
 * @param {string} type 
 * @param {number} timeout - milliseconds
 * @param {object} store - Storage adapter, defaults to KeyvFile
 * @returns 
 */
function findCachedOrRequest(query, type, timeout, store = new KeyvFile({ filename: join(__dirname, '../../../', `/data/${type}.json`) })) {
    if (typeof query !== 'string' || query === 'true') return null
    if (typeof type !== 'string') return null

    const keyv = new Keyv({ store })
    return new Promise(async (resolve, reject) => {
        try {
            if (query === 'clear') unlink(join(__dirname, '../../../', `/data/${type}.json`)).then(resolve).catch(reject)
            let data = await keyv.get(`${type}`)
            if (!data) throw "no data"
            console.log(`Found cached data for ${type}`, data)
            resolve(data)
        } catch (error) {
            Requester(query, async data => {
                try {
                    console.log(`Requesting data for ${type}`)
                    if (!timeout) await keyv.set(`${type}`, data)
                    else await keyv.set(`${type}`, data, timeout)
                    resolve(data)
                } catch (error) {
                    reject(error)
                }

            })
        }
    })
}

module.exports = { findCachedOrRequest }