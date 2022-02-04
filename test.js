const https = require('https')
const url = require('url')
const fs = require('fs')
const express = require('express')
const { find } = require('.')
const certificate = fs.readFileSync('localhost.pem')
const key = fs.readFileSync('localhost-key.pem')
// guide to setup local testing
// https://simplyenable.notion.site/How-to-use-HTTPS-for-local-development-e1e9f9d683d04d49b32bbb24d5e39f78

const app = express()
const port = 3333

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

app.get('/', (req, res) => {
    res.send({ hello: 'World!' })
})

https.createServer({
    key: key,
    cert: certificate
}, app).listen(port, () => {
    console.log(`App listening at ${port}`)
})

function basicTest() {
    return new Promise((resolve, reject) => {
        find("test_type", "https://localhost:3333/").then(found => {
            if (found && found.hello === 'World!') resolve(true)
            else reject(false)
        }).catch(err => reject(false))
    })
}

basicTest().then(result => {console.log('Passed!'); process.exit()}).catch(err => {console.log('Failed!'); process.exit()})
module.exports = { basicTest }

