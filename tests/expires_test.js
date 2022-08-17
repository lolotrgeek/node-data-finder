const { find_test } = require("./find_test")

let timeout = 1000

find_test('raw', 'clear').then(cleared => {
    let start = Date.now()
    find_test("raw", "https://url", timeout, 'expires').then(result => {
        let end = Date.now()
        let runtime = end - start
        let expected = (start + timeout)
        let actual_is_expected = result.expires - expected - runtime
        console.log(actual_is_expected === 0)
    })
})