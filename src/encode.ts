class Encoder {
    js: any
    current: any

    constructor(js: any) {
        this.js = js
    }

    encode(): string {
        // build up this string with concat
        let json: string = ''

        // traverse through this.js dispatching
        // each value for type detection
        // json += this.detectType()
        return json
    }

    detectType(v: any): string {
        switch (typeof v) {
            // primitives
            case 'string':
                return v
            case 'number':
            case 'boolean':
            case 'symbol':
                return v.toString()
            // object wrapped types
            case 'object':
                return this.unwrapObjectType()
            case undefined:
        }
    }

    unwrapObjectType(): string {
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

    // these will have to recursively descend their
    // member values
    encodeObject() {}
    encodeArray() {}

    // these also might no be necessary if I do type
    // detection (inference? deduction?) elsewhere
    // in some other method.  Most of this just wraps
    // .toString() anyway
    encodeString(s: any): string {
        if (typeof s === 'string') {
            return s
        } else if (s.constructor.name === 'String') {
            return s.toString()
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