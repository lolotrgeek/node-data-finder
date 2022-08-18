const https = require('https')

/**
 * Sends an https request
 * @param {*} url 
 * @param {*} callback handle response
 */
function Requester(url, callback) {
    const req = https.request(url, res => {
        let raw = []
        res.on('data', stream => {
            raw.push(stream)
        })
        res.on('close', () => {
            let data = JSON.parse(raw.map(element => element.toString('utf8')).join(''))
            callback(data, res.statusCode)
        })
    })
    req.on('error', error => callback(error))
    req.end()
}

module.exports = { Requester }