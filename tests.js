const { basicTest } = require("./tests/api_test")
const { clearTest } = require("./tests/clear_test")
const { testFindDateTimeOut } = require("./tests/timeoutdate_test")
const { testFindTimeOut } = require("./tests/timeout_test")


async function run() {
    try {
        await basicTest().then(result => {console.log('BasicTest: Passed!')}).catch(err => {console.log('BasicTest: Failed!')})
        await testFindDateTimeOut()
        await testFindTimeOut()
        await clearTest()        
    } catch (error) {
        console.log(error)
    } finally {
        process.exit()
    }
}

run()
