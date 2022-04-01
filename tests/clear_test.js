const { find_test: find } = require('./find_test')
const { readFileSync } = require('fs')

const type = "clear"
const path = __dirname + `/data/${type}.json`


function findData() {
    let data = readFileSync(path)
    if (data) return Promise.resolve(data)
    else throw data
}

function clearTest() {
    return new Promise(async (resolve, reject) => {
        try {
            // await find(type, "https://catfact.ninja/fact")
            await find(type, 'clear')
            // await findData()
            console.log("Clear Test: Passed.")
            resolve(true)
        } catch (error) {
            reject(error)
        }
        
    })
}


module.exports = {clearTest}