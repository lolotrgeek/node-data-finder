require('../src/lib')
const { find_test: find } = require('./find_test')
const fs = require('fs').promises
const { readFileSync } = require('fs')

const path = __dirname + '/data/test.json'
const test_timeout = 3600000 // WARNING: test might fail because the found value from the test might have variance from execution time. Re-run test or check result for significant variance.
let start
let end

async function removeData() {
    try {
        await fs.unlink(path)
        return Promise.resolve(true)
    } catch (error) {
        return Promise.resolve(true)
    }
}

function findData() {
    let data = readFileSync(path)
    if (data) return Promise.resolve(data)
    else throw data
}
function rejectDelay(reason) {
    return new Promise(function (resolve, reject) {
        setTimeout(reject.bind(null, reason), 1000)
    })
}
function processResult(data) {
    console.log('Found Data')
    let stored = JSON.parse(data)
    let expiration = stored.cache[0][1].expire
    let execution_time = end - start
    let found_timeout = (expiration - start) - execution_time
    console.log("execution time: ", execution_time)
    console.log("Timeout Result", found_timeout)
    console.log("Timeout Test Passed? ", found_timeout === test_timeout)
}

function errorHandler(err) {
    console.error(err)
}

function testFindTimeOut(timeout=test_timeout) {
    return new Promise(async (resolve, reject) => {
        try {
            await removeData()
            console.log('deleted Data')
            start = Date.now()
            await find("test", "https://url", timeout)
            end = Date.now()
            let max = 10
            let p = Promise.reject()
            for (var i = 0; i < max; i++) {
                p = p.catch(findData).catch(rejectDelay)
            }
            p = p.then(processResult).catch(errorHandler).finally(resolve(p))
        } catch (error) {
            if (error) console.error(error)
            reject(error)
        }
    })
}
module.exports = { testFindTimeOut }
