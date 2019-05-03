import { Decoder } from "./decoder";

// string tests
const emptyString = '""'
const aString = '"ok"'
const stringWithSpaces = '"once upon a time"'
const escapedString = '"\\"let them eat cake\\" she said"'
const escapeCodes = '"\thorizontal tab  \bbackspace\fformfeed\nnewline\rcarriage return\\reverse solidus"'
const unicodeCodePoint = '"\u1234"'
const stringTests = [
    emptyString, aString, stringWithSpaces,
    escapedString, escapeCodes, unicodeCodePoint
]

const tests = [
    ...stringTests
]

tests.forEach(t => {
    console.log('**********', t)
    let d = new Decoder(t)
    console.log(d)
});