require('../src/lib')
const { find_test: find } = require('./find_test')
const fs = require('fs').promises
const { readFileSync } = require('fs')

const type = "timeout"
const path = __dirname + `/data/${type}.json`
const test_timeout = 3600000 // WARNING: test might fail because the found value from the test might have variance from execution time. Re-run test or check result for significant variance.
let start
let end


function rejectDelay(reason) {
    return new Promise(function (resolve, reject) {
        setTimeout(reject.bind(null, reason), 1000)
    })
}
function processResult(data) {
    let stored = JSON.parse(data)
    console.log('Found Data', stored)
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
//TODO: use https://github.com/jaredwray/keyv/tree/main/packages/keyv#optionsraw instead of reading file

function testFindTimeOut(timeout=test_timeout) {
    return new Promise(async (resolve, reject) => {
        try {
            // await removeData()
            await find(type, 'clear')
            console.log('deleted Data')
            start = Date.now()
            await find(type, "https://catfact.ninja/fact/", test_date, "expires")
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
