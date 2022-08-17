const { basicTest } = require("./tests/api_test")
const { clearTest } = require("./tests/clear_test")
const { testFindDateTimeOut } = require("./tests/timeoutdate_test")
const { testFindTimeOut } = require("./tests/timeout_test")


async function run() {
    try {
        basicTest().then(result => {console.log('BasicTest: Passed!')}).catch(err => {console.log('BasicTest: Failed!')})
        // deprecated - run tests/expires_test.js
        // await testFindDateTimeOut()
        // await testFindTimeOut()
        clearTest().then(result => {console.log('ClearTest: Passed!')}).catch(err => {console.log('ClearTest: Failed!')})        
    } catch (error) {
        console.log(error)
    } finally {
        process.exit()
    }
}

run()
