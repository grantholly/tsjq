class Encoder {
    js: any
    current: any

    constructor(js: any) {
        this.js = js
    }

    quote(s: string): string {
        return '"' + s + '"'
    }

    encode(): string {
        // build up this string
        let json: string = ''

        // traverse through this.js dispatching
        // each value for type detection
        // json = this.detectType()
        json = this.encodeValue(this.js)
        return json
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
                if (Array.isArray(v)) {
                    return this.encodeArray(v)
                } else {
                    return this.encodeObject(v)
                }
            case undefined:
        }
    }

    encodeObject(o: any) {
        const kvPair = (k: string, v: string): string => {
            return this.quote(k) + ':' + v.toString() + ','
        }
        let objectString: string = '{'
        for (let key in o) {
            if (o[key] instanceof Array) {
                // call this.encodeArray()
                continue
            }
            if (o[key] instanceof Object) {
                // call this.encodeObject()
            } else {
                objectString += kvPair(key, o[key])
            }
        }
        objectString = objectString.slice(0, -1) + '}'
        return objectString
    }

    encodeArray(a: Array<any>): string {
        const len: number = a.length
        let aa: string = ''
        if (len === 0) {
            return '[]'
        }
        aa += '['
        for (let i = 0; i < len; i++) {
            if (i === len - 1) {
                aa += this.encodeValue(a[i]) + ']'
            } else {
                aa += this.encodeValue(a[i]) + ','
            }
        }
        return aa
    }

    encodeString(s: string): string {
        return 'encodeString stub'
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