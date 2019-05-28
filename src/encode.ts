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

    encodeObject(o: object) {
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
        let escapes: {
            [key: string]: string
        } = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '\"': '\\\"',
            '\\': '\\\\'
        }
        return '"' + s + '"'
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