/*
type JsValue = null | number | string | boolean | JsObject | JsArray

interface JsObject {
    [key: string]: JsValue
}

interface JsArray extends Array<JsValue> {}
*/

type JSValue = { kind: 'JSNull' }
             | { kind: 'JSBool',     value: boolean }
             | { kind: 'JSString',   value: string  }
             | { kind: 'JSRational', asFloat: boolean, value: number }
             | { kind: 'JSArray',    value: JSValue[] }
             | { kind: 'JSObject',   value: { [key: string]: JSValue } }

export class Decoder {
    idx: number
    end: number
    json: string
    current: string

    constructor(json: string) {
        this.idx = 0
        this.end = json.length
        this.json = json
        this.current = json.charAt(this.idx)
    }

    err(kind: string, message: string): Error {
        let e: Object = {
            type: kind,
            message: message,
            value: this.json,
            location: this.idx,
            character: this.current
        }
        console.error('ERROR: ', message, e)
        throw e
    }

    scan(): string {
        this.idx ++
        this.current = this.json.charAt(this.idx)
        return this.current
    }

    scanChar(char: string): string {
        if ((char) 
            && (char === this.current)) {
                this.idx ++
                this.current = this.json.charAt(this.idx)
                return this.current
        } else {
            this.err('Scanning Error', 'expected: <' + char +'> but found <' + this.current + '>')
        }
    }

    skip(): void {
        while ((this.current)
            && (this.current <= ' ')) {
                this.scan()
            }
    }

    decodeValue() {
        this.skip()
        switch(this.current) {
            case '{':
                return this.decodeObject()
            case '[':
                return this.decodeArray()
            case '\"':
                return this.decodeString()
            case '-':
                return this.decodeNumber()
            case 't':
            case 'f':
                return this.decodeBoolean()
            case 'n':
                return this.decodeNull()
            default:
                if ((this.current >= '0') 
                    && (this.current <= '9')) {
                    return this.decodeNumber()
                } else {
                    this.err('Decoding Error', 'cannot decode json value')
                }
        }
    }

    decodeObject() {}
    decodeArray() {}
    decodeString() {}
    decodeNumber(): number {
        let maybeNum: string = ''
        let num: number
        const getDigits = () => {
            while ((this.current >= '0')
                && this.current <= '9') {
                    maybeNum += this.current
                    this.scan()
                }
        }
        // handle negatives
        if (this.current === '-') {
            maybeNum = '-'
            this.scanChar('-')
        }
        getDigits()
        // check for decimal point
        if (this.current === '.') {
            maybeNum += '.'
            // get digits after decimal
            while ((this.scan())
                && (this.current >= '0')
                && (this.current <= '9')) {
                    maybeNum += this.current
                    this.scan()
                }
        }
        // scientific notation
        if ((this.current === 'e')
            || this.current === 'E') {
                maybeNum += this.current
                let sign: string = this.scan()
                // check sign of exponent
                if ((sign === '-')
                    || sign === '+') {
                        maybeNum += this.current
                        this.scan()
                    }
            }
        // get exponent
        getDigits()
        // test for valid number
        num = +maybeNum
        if (isNaN(num)) {
            this.err('Number Decoding Error', 'cannot decode number')
        } else {
            return num
        }
    }

    decodeBoolean(): boolean {
        switch(this.current) {
            case 't':
                ['t','r','u','e'].map(c => {
                    return this.scanChar(c)
                })
                return true
            case 'f':
                ['f','a','l','s','e'].map(c => {
                    return this.scanChar(c)
                })
                return false
            default:
                this.err('Boolean Decoding Error', 'cannot decode boolean value')
        }
    }

    decodeNull(): null {
        switch(this.current) {
            case 'n':
                ['n','u','l','l'].map(c => {
                    this.scanChar(c)
                })
                return null
            default:
                this.err('Null Decoding Error', 'cannot decode null value')
        }
    }
}