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

    unwrapObjectType(v: any): string {
        /* maybe iterate through an Array of constructors
            for object wrapped types?
            [Array, Object, Number, String, Boolean...]
            for (let i = 0; i < constructors.length; i++) {
                if (t instanceof constructors[i]) {
                    (t): string => {
                        stuff happens here?
                    }
                }
        }
            I just don't want to end up providing toString()
            implementations for each possible type for JSON
            because I am lazy and I don't know if that is
            the right thing to to
        */
        return 'sure'
    }

    encodeValue(v: any): string {
        switch(typeof v) {
           // primitives
            case 'string':
                return v
            case 'number':
            case 'boolean':
            case 'symbol':
                return v.toString()
            // object wrapped types
            case 'object':
                if (v === null) {
                    return 'null'
                }
                return this.encodeValue(
                    this.unwrapObjectType(v)
                )
            case undefined:
        }
    }

    // these will have to recursively descend their
    // member values
    //
    // interface MapLike<T> {
    //     [key: string]: T 
    // }
    // encodeMapLike(m: MapLike): string {}
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

    // interface ArrayLike<T> extends Array<T> {
    //      
    // }
    // encodeArrayLike(a: ArrayLike): string {}
    encodeArray(a: any) {
        const element = (e: any):string => {
            // encode e
            return this.encode(e) + ','
        }
        let arrayString = '['
        for (let i = 0; i < a.length; i++) {
            arrayString += element(a[i])
        }
    }

    // these also might no be necessary if I do type
    // detection (inference? deduction?) elsewhere
    // in some other method.  Most of this just wraps
    // .toString() anyway
    encodeString(s: any): string {
        if (typeof s === 'string') {
            return '"' + s + '"'
        } else if (s.constructor.name === 'String') {
            return '"' + s.toString() + '"'
        }
    }
    encodeNumber(n: any): string {
        if ((typeof n === 'number')
            || n.constructor.name === 'Number') {
                return n.toString()
            }
    }
    encodeBoolean(b: any): string {
        if (typeof b === 'boolean') {
            return b.toString()
        }
    }
    encodeNull(n: any): string {
        if (n === null) {
            return 'null'
        }
    }
}

export function encode(js: any): string {
    const e = new Encoder(js)
    return e.encode()
}