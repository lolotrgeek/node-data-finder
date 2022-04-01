const { find_test: find } = require('./find_test')
const { access } = require('fs').promises

const type = "clear"
const path = __dirname + `/data/${type}.json`

async function findData() {
    try {
        await fs.access(path)
        return Promise.resolve(true)
    } catch (error) {
        return Promise.resolve(false)
    }
}

async function clearTest() {
    try {
        await find(type, "https://catfact.ninja/fact")
        let cleared = await find(type, 'clear')
        if(cleared) {
            let found = await findData()
            return Promise.resolve(found)
        }
    } catch (error) {
        return Promise.reject(false)
    }

}

clearTest()
module.exports = { clearTest }