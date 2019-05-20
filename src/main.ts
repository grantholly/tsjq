import { decode } from './decode'

// boolean tests
const actualTrue = 'true'
const whiteSpaceTrue = 'tr ue'
const mixedCaseTrue = 'TruE'
const notTrue = 'true!'

const actualFalse = 'false'
const whiteSpaceFalse = 'false '
const mixedCaseFalse = 'FALse'
const notFalse = 'false2'
const boolTests = [
    actualTrue, whiteSpaceTrue, mixedCaseTrue,
    actualFalse, whiteSpaceFalse, mixedCaseFalse,
    notFalse, notTrue
]

// null tests
const actualNull = 'null'
const whiteSpaceNull = ' null '
const mixedCaseNull = 'Null'
const notNull = 'null]'
const nullTests = [
    actualNull, whiteSpaceNull, mixedCaseNull, notNull
]

// string tests
const emptyString = '""'
const aString = '"ok"'
const stringWithSpaces = '"once upon a time"'
const escapedString = '"\\"let them eat cake\\" she said"'
const escapeCodes = '"\\thorizontal tab  \\bbackspace\\fformfeed\\nnewline\\rcarriage return\\\reverse solidus"'
const unicodeCodePoint = '"\\u1234"'
const anotherUnicodePoint = '"happy \\ua1F3"'
const stringTests = [
    escapedString, escapeCodes,
    unicodeCodePoint, anotherUnicodePoint,
    emptyString, aString, stringWithSpaces
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

// array tests
const emptyArray = '[]'
const singleVal = ' [  1]'
const twoVals = '["yeah", true]'
const threeVals = '[null,false,[] ]'
const fourVals = '[[1,2], {"ok": true}, null]'
const deeplyNestedArray = '[[[1]], 2]'
const arrayTests = [
    deeplyNestedArray,
    emptyArray, singleVal, twoVals, 
    threeVals, fourVals
]

// object tests
const emptyObject = '{}'
const oneElement = '{"a":1}'
const twoElements = '{"a": 1, "b": 2}'
const withArray = '{"a": [true, false]}'
const withObjects = '{"a": {"b": true}, "c": null}'
const objectTests = [
    emptyObject, oneElement, twoElements,
    withArray, withObjects
]

const allTests = [
    ...boolTests, ...nullTests, ...stringTests,
    ...validNumbers, ...arrayTests, ...objectTests
]

const tests = [
    ...allTests
]

tests.forEach(t => {
    console.log('*** ', t, ' ***')
    try {
        console.log(decode(t))
    } catch (e) {
        console.log(e)
    }
})