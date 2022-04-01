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
            if (Validate(query, type) === false) reject("Invalid")

            if (!store) store = new KeyvFile({ filename: join(__dirname, '../../../', `/data/${type}.json`) })
            const keyv = new Keyv({ store })

            if (query === 'clear') {
                await Clear(store)
                resolve("cleared")
            }
            else {
                let data = await keyv.get(`${type}`)
                if (data) {
                    console.log(`Found cached data for ${type}`, data)
                    resolve(data)
                }
                else {
                    Requester(query, async data => {
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
            }
        } catch (error) { reject(error) }
    })
}


function Validate(query, type) {
    if (typeof query !== 'string' || query === 'true') return false
    if (typeof type !== 'string') return false
    return true
}

async function Clear(store) {
    try {
        console.log('removing ', store._opts.filename)
        await unlink(store._opts.filename)
        return Promise.resolve(true)
    } catch (error) {
        return Promise.resolve(true)
    }
}

module.exports = { findCachedOrRequest }