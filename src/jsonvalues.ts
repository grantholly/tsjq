abstract class JsonValue {
    data: string
    len: number
    error: null | Error
    jsonData: any

    constructor(s: string) {
        this.data = s
        this.len = s.length
        this.error = null
        this.validate()
    }

    abstract validate(): void

    extract(): any {
        return this.error === null ? this.jsonData : this.error
    }

    errorState(): null | Error {
        return this.error
    }
}

class JsonNull extends JsonValue {
   validate() {
       if (this.len !== 4) {
           this.error = new Error('cannot create null value.  Value too long ' + this.data)
       }
       if ((this.data[0] === 'n')
            && (this.data[1] === 'u')
            && (this.data[2] === 'l')
            && (this.data[3] === 'l')) {
                this.jsonData = null
        } else {
            this.error = new Error('cannot create null from ' + this.data)
        }
   }
}

abstract class JsonBoolean extends JsonValue {}

class JsonTrue extends JsonBoolean {
    validate() {
        if (this.len !== 4) {
            this.error = new Error('cannot create true value.  Value too long ' + this.data)
        }
        if ((this.data[0] === 't')
            && (this.data[1] === 'r')
            && (this.data[2] === 'u')
            && (this.data[3] === 'e')) {
                this.jsonData = true
        } else {
            this.error = new Error('cannot create true value from ' + this.data)
        }
    }
}

class JsonFalse extends JsonBoolean {
    validate() {
        if (this.len !== 5) {
            this.error = new Error('cannot create false value.  Value too long ' + this.data)
        }
        if ((this.data[0] === 'f')
            && (this.data[1] === 'a')
            && (this.data[2] === 'l')
            && (this.data[3] === 's')
            && (this.data[4] === 'e')) {
                this.jsonData = false
        } else {
            this.error = new Error('cannot create true value from ' + this.data)
        }
    }
}

class JsonString extends JsonValue {
    validate() {
       if (this.len <= 1) {
           this.error = new Error('cannot create string value with length <= 1 from ' + this.data)
       }
       if (this.data[0] === '"'
            && this.data[this.len - 1] === '"') {
                this.jsonData = this.data
            } else {
                this.error = new Error('cannot create string value with unbalanced quotes from ' + this.data)
            }
    }
}

class JsonNumber extends JsonValue {
    validate() {}
}

export {JsonTrue, JsonFalse, JsonNull, JsonNumber, JsonString}