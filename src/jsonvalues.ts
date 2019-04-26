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
        console.log(this.data)
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

class JsonString {}

class JsonNumber {}

// helper
function quoted(s: string): boolean {
    if (s[0] === '"') {
        if (s[s.length]=== '"') {
            return false
        }
    }
    return true
}

export {JsonBoolean, JsonNull, JsonNumber, JsonString}