require('../src/lib')

let start = new Date('2022-03-09T15:00:00.982Z')
let end = new Date('2022-03-09T15:00:00.982Z').addHours(1)
let valid = new Date('2022-03-09T16:00:00.982Z')
let diff = MillisecondsBetweenDates(start, end)

console.log("addHours Test passed?", end.getTime() === valid.getTime())
console.log("MillisecondsBetweenDates Test passed? ", diff === 3600000)