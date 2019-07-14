class Decoder {
    idx: number
    json: string
    current: string

    constructor(json: string) {
        this.idx = 0
        this.json = json
        this.current = ' '
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
        this.current = this.json.charAt(this.idx)
        this.idx ++
        return this.current
    }

    scanChar(char: string): string {
        if ((char) 
            && (char !== this.current)) {
                this.err('Scanning Error', 'expected: <' + char +'> but found <' + this.current + '>')
        }
        return this.scan()
    }

    skip(): void {
        while ((this.current)
            && (this.current <= ' ')) {
                this.scan()
            }
    }

    decode(): any {
        let done: any = this.decodeValue()
        this.skip()
        if (this.current) {
            this.err('Decoding Error', 'Bad JSON')
        }
        return done
    }

    decodeValue(): any {
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

    decodeObject(): {[key: string]: any} {
        let maybeObject = {}
        this.scanChar('{')
        this.skip()
        // check for empty object
        if (this.current === '}') {
            this.scanChar('}')
            return maybeObject
        }
        while (this.current) {
            let maybeKey: string = this.decodeString()
            this.skip()
            this.scanChar(':')
            maybeObject[maybeKey] = this.decodeValue()
            this.skip()
            // end of object?
            if (this.current === '}') {
                this.scanChar('}')
                return maybeObject
            }
            this.scanChar(',')
            this.skip()
        }
        this.err('Object Decoding Error', 'no opening "{" found')
    }

    decodeArray(): Array<any> {
        let maybeArray: Array<any> = []
        let start: string = this.scanChar('[')
        this.skip()
        // check for empty array
        if (this.current === ']') {
            this.scanChar(']')
            return maybeArray
        }
        while (this.current) {
            maybeArray.push(this.decodeValue())
            this.skip()
            // end of array?
            if (this.current === ']') {
                this.scanChar(']')
                return maybeArray
            }
            this.scanChar(',')
            this.skip()
        }
        this.err('Array Decoding Error', 'no opening "[" found')
    }

    decodeString(): string {
        const checkUnicode = ():string => {
            let runes: number = 0
            for (let i = 0; i < 4; i++) {
                // grab the base 16 number for the character
                let char:number = parseInt(this.scan(), 16)
                // check if we are NaN
                if (! (isNaN(char))
                    // check if we are finite
                    || (isFinite(char))) {
                        runes += char
                    } else {
                        this.err('Unicode Decoding Error', 'cannot decode unicode value')
                    }
            }
            // decode the numeric values
            return String.fromCharCode(runes)
        }
        const escapes: {
            [key: string]: string
        } = {
            '\"': '\"',
            '\\': '\\',
            '/': '/',
            'b': '\b',
            'f': '\f',
            'n': '\n',
            'r': '\r',
            't': '\t',
        }
        let maybeString: string = ''
        if (this.current === '\"') {
            while (this.scan()) {
                if (this.current === '\"') {
                    this.scan()
                    // empty string
                    return maybeString
                }
                // watch out for escape characters
                if (this.current === '\\') {
                    this.scan()
                    if (this.current === 'u') {
                        // check for valid unicode
                        maybeString += checkUnicode()
                    }
                    maybeString += escapes[this.current]
                }
                maybeString += this.current
            }
        }
        return maybeString
    }

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
        // get exponent digits
        getDigits()
        // test for valid number
        num = +maybeNum
        if ((isNaN(num))
            || (! isFinite(num))) {
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

export function decode(json: string) {
    const d = new Decoder(json)
    return d.decode()
}