const Keyv = require('keyv')
const { KeyvFile } = require('keyv-file')
const { Requester } = require('./requester')
const { unlink } = require('fs').promises
const { join } = require('path')

/**
 * Looks for cached data based on type, otherwise executes a request query
 * @param {string} query
 * @param {string} type 
 * @param {number} timeout - milliseconds
 * @param {object} store - Storage adapter, defaults to KeyvFile
 * @returns 
 */
function findCachedOrRequest(query, type, timeout, store) {
    return new Promise(async (resolve, reject) => {
        try {
            if(validate(query, type) === false) reject("Invalid")
            if (query === 'clear') {
                await clear(type)
                resolve("cleared")
            }
            const keyv = Store(type, store)
            let data = await keyv.get(`${type}`)
            if(data) {
                console.log(`Found cached data for ${type}`, data)
                resolve(data)
            }
            else {
                data = await Request(type, timeout)
                resolve(data)
            }
        } catch (error) {reject(error)}
    })
}

function Request(type, timeout){
    return Requester(query, async data => {
        try {
            console.log(`Requesting data for ${type}`)
            if (!timeout) await keyv.set(type, data)
            else await keyv.set(type, data, timeout)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })    
}

function Store(type, store) {
    if (!store) store = new KeyvFile({ filename: join(__dirname, '../../../', `/data/${type}.json`) })
    const keyv = new Keyv({ store })
    return keyv
}

function validate(query, type) {
    if (typeof query !== 'string' || query === 'true') return false
    if (typeof type !== 'string') return false
    return true
}

function clear(type) {
    return unlink(join(__dirname, '../../../', `/data/${type}.json`))
}

module.exports = { findCachedOrRequest }