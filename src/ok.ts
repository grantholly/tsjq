import { Scanner } from "./scanner";
import { JsonValue } from "./sure";
import  *  as Types from "./jsonvalues";

class Pair {
    key: string
    value: any

    constructor(k: string, v: any) {
        this.key = k
        this.value = v
    }
}

export class Decoder {
    scanner: Scanner

    constructor(s: string) {
        this.scanner = new Scanner(s)
        this.decode()
    }

    decodeScalar() {
        // pattern match value and dispatch to type

        // need to rewind as we have already scanned the first
        // value in decode() (maybe?)  we could also do something
        // like this.scanner.data[0] if we want to make data public
        // or provide some kind of getter
        // pretty sure that I don't want 'rewind' behaviour
        // because I don't want to make the scanner complicated
        this.scanner.reset()
        let jsonData: JsonValue

        switch(this.scanner.current) {
            case '"':
            // string
                // this is currently not matching string that start
                // with escape characters
                const maybeString = this.scanner.scanString()
                const stringValue = new Types.JsonString(maybeString)
                jsonData = stringValue
                break
            case 'n':
            // null
                // scans to end of data
                const maybeNull = this.scanner.scanTo([])
                const nullValue = new Types.JsonNull(maybeNull)
                jsonData = nullValue
                break
            case 't':
            // true
                const maybeTrue = this.scanner.scanTo([])
                const trueValue = new Types.JsonBoolean(maybeTrue)
                jsonData = trueValue
                break
            case 'f':
            // false
                const maybeFalse = this.scanner.scanTo([])
                const falseValue = new Types.JsonBoolean(maybeFalse)
                jsonData = falseValue
                break
            default:
            // number
                jsonData = "stub"
        }
        console.log(jsonData)
    }

    decodeArrayElement(elements: Array<any> = []): Array<any> {
        // recursive
        console.log('scanning array element')
        let element = this.scanner.scanTo([',', ']'])
        if (this.scanner.current === ']') {
            elements.push(element)
            return elements
        } else {
            elements.push(element)
            return this.decodeArrayElement(elements)
        }
    }

    decodeArray() {
        //already scanned '['
        console.log('scanning array')
        let jsonData = []
        let elements = this.decodeArrayElement()
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i]
            jsonData.push(element)
        }
        console.log(jsonData)
        return jsonData
    }

    decodeObjectKey(): string | undefined {
        console.log('scanning object key')
        let key = this.scanner.scanTo([':'])
        if (key === '}') {
            //reached end of object with no keys
            return undefined
        }
        return key
    }

    decodeObjectElement(elements: Array<Pair> = []): Array<Pair> {
        // recursive
        console.log('scanning object element')
        let key = this.decodeObjectKey()
        if (key !== undefined) {
            // need to pattern match on value so that 
            // I don't have all string values then dispatch
            // that value to the right JsonValue class
            let value = this.scanner.scanTo([',', '}'])
            if (this.scanner.current !== '}') {
                elements.push(new Pair(key, value))
                return this.decodeObjectElement(elements)
            } else {
                elements.push(new Pair(key, value))
                return elements
            }
        } else {
            return []
        }
    }

    decodeObject() {
        //already scanned '{'
        console.log('scanning object')
        let jsonData: {
            [key: string]: JsonValue
        } = {}
        let elements = this.decodeObjectElement()
        for (let i = 0; i  < elements.length; i++) {
            const element = elements[i]

            jsonData[element.key] = element.value
        }
        console.log(jsonData)
        return jsonData
    }

    decode() {
        let begin = this.scanner.scan()
        switch(begin) {
            case '{':
                this.decodeObject()
                break
            case '[':
                this.decodeArray()
                break
            default:
                this.decodeScalar()
        }
    }
}

const objects = '{"a": {"b":   {"cee":"yo"}}}'
const arrays = '{"a":[1, [2, [3]]],"bee": []}'
const stuff = '{b":null,  "c": true,"d":false}'
const numbersAndStrings = '{"first": 1, "second":  "second"}'
// note: I can recursively overflow the stack with a
// trailing space like '{} '
const emptyObject = '{     }'
const arrayExample = '[1,2,3, 4]'
const totallyNull = 'null'
const totallyTrue = 'true'
const totallyFalse = 'false'
// broken
const aString = '"\r\t\nlet\'s try this \nout\r"'
const addSomeEscapes = '"he said \"no\""'
const emoticon = "\u1234"
const emptyString = ''
const tests = [
    objects, arrays, stuff, numbersAndStrings, 
    emptyObject, arrayExample, totallyNull, totallyFalse, 
    totallyTrue, aString,
    aString, addSomeEscapes, emoticon, emptyString]
tests.forEach((test) => {let vs = new Decoder(test)})