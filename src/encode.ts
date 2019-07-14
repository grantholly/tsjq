class Encoder {
    js: any

    constructor(js: any) {
        this.js = js
    }

    encode(): string {
        return this.encodeValue(this.js)
    }

    encodeValue(v: any): string {
        switch(typeof v) {
           // primitives
            case 'string':
                return this.encodeString(v)
            case 'number':
                return this.encodeNumber(v)
            case 'boolean':
                return v.toString()
            // object wrapped types
            case 'object':
                if (v === null) {
                    return 'null'
                }
                if (v instanceof String) {
                    return this.encodeString(v as string)
                }
                if (v instanceof Number) {
                    return this.encodeNumber(v as number)
                }
                if (v instanceof Boolean) {
                    return (v as boolean).toString()
                }
                if (Array.isArray(v)) {
                    return this.encodeArray(v)
                } else {
                    return this.encodeObject(v)
                }
            case undefined:
        }
    }

    encodeObject(o: object): string {
        // I have to screen for function members of o object
        // and the a Array in this.encodeArray
        // I could loop through props checking that 
        // typeof o[prop] is not a function
        const props: Array<string> = Object.getOwnPropertyNames(o)
        const len: number = Object.getOwnPropertyNames(o).length
        let objectString: string = ''
        if (len === 0) {
            return '{}'
        }
        objectString += '{'
        for (let prop in o) {
            let key: string = this.encodeString(prop)
            if (key) {
                objectString += key + ':'
                if (props.indexOf(prop) === len - 1) {
                    objectString += this.encodeValue(o[prop]) + '}'
                } else {
                    objectString += this.encodeValue(o[prop]) + ','
                }
            }
        }
        return objectString
    }

    encodeArray(a: Array<any>): string {
        const len: number = a.length
        let arrayString: string = ''
        if (len === 0) {
            return '[]'
        }
        arrayString += '['
        for (let i = 0; i < len; i++) {
            if (i === len - 1) {
                arrayString += this.encodeValue(a[i]) + ']'
            } else {
                arrayString += this.encodeValue(a[i]) + ','
            }
        }
        return arrayString
    }

    encodeString(s: string): string {
        const needsEscaping: RegExp = /[\u007f-\uffff]/g
        let jsonString: string = '"'
        if (needsEscaping.test(s)) {
            return '"' +
                s.replace(needsEscaping, function (c) {
                    return '\\u' + (c.charCodeAt(0).toString(16).slice(-4))
                }) + '"'
        } else {
            for (let i = 0; i < s.length; i++) {
                let char: string = s[i]
                switch(char) {
                    case '\\':
                    case '"':
                        jsonString += '\\' + char
                        break
                    case '/':
                        jsonString += '\\' + char
                        break
                    case '\b':
                        jsonString += '\\b'
                        break
                    case '\t':
                        jsonString += '\\t'
                        break
                    case '\n':
                        jsonString += '\\n'
                        break
                    case '\f':
                        jsonString += '\\f'
                        break
                    case '\r':
                        jsonString += '\\r'
                        break
                    default:
                        jsonString += char 
                }
            }
            return jsonString + '"'
        }
    }

    encodeNumber(n: number): string {
        if (isFinite(n)) {
            return n.toString()
        } else {
            return 'null'
        }
    }
}

export function encode(js: any): string {
    const e = new Encoder(js)
    return e.encode()
}