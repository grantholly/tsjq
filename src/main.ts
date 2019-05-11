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

// number tests
const oneHundred = 100
const tenAndSome = 10.3
const half = 0.5
const sciHundred = 10e2
const sciHundredE = 10E2
const sciThousand = 10e+3
const sciThousandE = 10E+3
const sciSmallHundred = 10e-2
const sciSmallHundredE = 10E-2
const positiveNumbers = [
    oneHundred, tenAndSome, half,
    sciHundred, sciHundredE, sciThousand,
    sciThousandE, sciSmallHundred, sciSmallHundredE
]
const negativeNumbers = positiveNumbers.map(n => n * -1)

let validNumbers = [
    ...positiveNumbers, ...negativeNumbers
].map(n => n.toString())

const badNumbers = [
    '', '-', 'ten', '1.0e', '1.0E', '0.3.2', '6e+10e'
]

const arrayTests = [
    '[]', '[1]', '[1,2]', '["all about it", true, false, .5, null]',
    '[ "ok",      "sure about that?" ]', '         [11]',
    '[[1]]', '[ 1, [2, "two"], [], ["three", "four"] ]',
    `[
        1,
        false,
        [
            2,
            true
        ]
    ]`
]

const tests = [arrayTests[4]]

//console.log(tests)

tests.forEach(t => {
    console.log('**********', t)
    let d = new Decoder(t)
    console.log(d)
});