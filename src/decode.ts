type JsValue = null | number | string | boolean | JsObject | JsArray

interface JsObject {
    [key: string]: JsValue
}

interface JsArray extends Array<JsValue> {}


export class Decoder {
    idx: number
    end: number
    error: Error
    json: string
    current: string

    constructor(json: string) {
        this.idx = 0
        this.end = json.length
        this.json = json
        this.current = json.charAt(this.idx)
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
            this.error = new Error('expected: ' + char + ' but found ' + this.current)
        }
    }

    skip(): void {
        while((this.current)
            && this.current <= ' ') {
                this.scan()
            }
    }

    decodeValue() {
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
                    this.error = new Error('bad JSON')
                }
        }
        console.log(this)
    }

    decodeObject() {}
    decodeArray() {}
    decodeString() {}
    decodeNumber() {}

    decodeBoolean(): boolean {
        switch(this.current) {
            case 't':
                this.scanChar('t')
                this.scanChar('r')
                this.scanChar('u')
                this.scanChar('e')
                return true
            case 'f':
                this.scanChar('f')
                this.scanChar('a')
                this.scanChar('l')
                this.scanChar('s')
                this.scanChar('e')
                return false
            default:
                this.error = new Error('bad bool')
        }
    }

    decodeNull(): null {
        switch(this.current) {
            case 'n':
                this.scanChar('n')
                this.scanChar('u')
                this.scanChar('l')
                this.scanChar('l')
                return null
            default:
                this.error = new Error('bad null')
        }
    }
}