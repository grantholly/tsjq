abstract class JsonValue {
    data: string
    len: number
    error: null | Error

    constructor(s: string) {
        this.data = s
        this.len = s.length
        this.error = null
        this.validate()
    }

    abstract validate(): void
}

class JsonNull extends JsonValue {
    validate() {
        // check for unquoted 'null'
        // check length
        if (this.len === 4) {
            if (this.data[0] === 'n'
                && this.data[1] === 'u'
                && this.data[2] === 'l'
                && this.data[3] === 'l') {
                    return null
                }
        }
        this.error = new Error('cannot create null value')
    }
}

class JsonBoolean extends JsonValue {
    validate() {
        // check for true
        if (this.len === 4) {
            if (this.data[0] === 't'
                && this.data[1] === 'r'
                && this.data[2] === 'u'
                && this.data[3] === 'e') {
                    return true
                }
        } else if (this.len === 5) {
            if (this.data[0] === 'f'
                && this.data[1] === 'a'
                && this.data[2] === 'l'
                && this.data[3] === 's'
                && this.data[4] === 'e') {
                    return false
                }
        }
        this.error = new Error('cannot create boolean value')
    }
}

class JsonString extends JsonValue {
    validate() {
       if (this.len <= 1) {
           this.error = new Error('cannot create string value with length <= 1')
       }
       if (this.data[0] === '"'
            && this.data[this.len - 1] === '"') {
                return this.data
            } else {
                this.error = new Error('cannot create string value with unbalanced quotes')
            }
    }
}

class JsonNumber extends JsonValue {
    validate() {}
}

export {JsonBoolean, JsonNull, JsonNumber, JsonString}