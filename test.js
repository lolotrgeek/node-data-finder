const { basicTest } = require("./tests/api_test")
const { clearTest } = require("./tests/clear_test")
const { expires_test } = require("./tests/expires_test")


async function run() {
    try {
        return Promise.allSettled([
            console.log('Basic Test - Pass?', await basicTest()),
            console.log("Expires Test: Pass?", await expires_test()),
            console.log('Clear Test: Pass?', await clearTest())  ,
        ])

    } catch (error) {
        console.log(error)
    } finally {

    }
}

run().then(process.exit)
