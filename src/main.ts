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

// null tests
const realNull = 'null'
const notNull = 'nuLL'
const nully = 'nully'
const notQuiteNull = 'nul'
const nullWithSpaces = 'null\n'
const nullTests = [
    realNull, notNull, nully, notQuiteNull, nullWithSpaces
]

// boolean tests
const realTrue = 'true'
const notTrue = 'tRUE'
const trueWithSpaces = 'true\t'
const notQuiteTrue = 'tr'
const trueTests = [
    realTrue, notTrue, trueWithSpaces, notQuiteTrue
]

const realFalse = 'false'
const notFalse = 'False'
const falseWithSpaces = 'false    '
const notQuiteFalse = 'fals'
const falseTests = [
    realFalse, notFalse, falseWithSpaces, notQuiteFalse
]

const booleanTests = [...trueTests, ...falseTests]

const tests = [
    ...booleanTests, ...nullTests
]

tests.forEach(t => {
    console.log('**********', t)
    let d = new Decoder(t)
    console.log(d)
});