import { Decoder } from './decode'
type JsonValue = null | number | string | boolean | Array<any> | Object

// boolean tests
const actualTrue = 'true'
const whiteSpaceTrue = 'tr ue'
const mixedCaseTrue = 'TruE'

const actualFalse = 'false'
const whiteSpaceFalse = 'false '
const mixedCaseFalse = 'FALse'
const boolTests = [
    actualTrue, whiteSpaceTrue, mixedCaseTrue,
    actualFalse, whiteSpaceFalse, mixedCaseFalse
]

// null tests
const actualNull = 'null'
const whiteSpaceNull = ' null '
const mixedCaseNull = 'Null'
const nullTests = [
    actualNull, whiteSpaceNull, mixedCaseNull
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

const badNumbers = [
    '', '-', 'ten', '1.0e', '1.0E', '0.3.2', '6e+10e'
]

// array tests
const emptyArray = ' [  ] '
const singleVal = ' [  1]'
const twoVals = '["yeah", true]'
const threeVals = '[null,false,[] ]'
const fourVals = '[[1,2], {"ok": true}, null]'
const arrayTests = [
    emptyArray, singleVal, twoVals, 
    threeVals, fourVals
]

const tests = [
    ...arrayTests
]

export const decode = function(json: string): any {
    const d = new Decoder(json)
    return d.decodeValue()
}

export const encode = function(jsData: any): string {
    return ''
}

tests.forEach(t => {
    console.log(decode(t))
})

//decode('{"a": 1, "b": null, "c": ["first value"]}')