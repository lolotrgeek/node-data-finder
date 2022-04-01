require('../src/lib')
const { find_test: find } = require('./find_test')
const fs = require('fs').promises
const { readFileSync } = require('fs')

const type = "timeoutdate"
const path = __dirname + `/data/${type}.json`
let test_date
let valid_timeout = 7200000 // WARNING: test might fail because the found value from the test might have variance from execution time. Re-run test or check result for significant variance.
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
    console.log("Date Timeout Test Passed? ", found_timeout === valid_timeout)
}

function errorHandler(err) {
    console.error(err)
}

function testFindDateTimeOut() {
    return new Promise(async (resolve, reject) => {
        try {
            // await removeData()
            await find(type, 'clear')
            console.log('deleted Data')
            test_date = new Date().addHours(2)
            start = Date.now()
            await find(type, "https://url", test_date)
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

module.exports = { testFindDateTimeOut }
