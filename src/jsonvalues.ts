import { Decoder } from "./decoder";

abstract class JsonValue {
    data: string
    len: number
    error: null | Error
    jsData: any

    constructor(s: string) {
        this.data = s
        this.len = s.length
        this.error = null
        this.validate()
    }

    abstract validate(): any | null

    extract(): any | Error {
        return this.error === null ? this.jsData : this.error
    }

    errorState(): null | Error {
        return this.error
    }
}

class JsonArray extends JsonValue {
    validate() {}
}

class JsonNull extends JsonValue {
   validate() {
       if (this.len !== 4) {
           this.error = new Error('cannot create null value.  Value too long ' + this.data)
           return this.error
       }
       if ((this.data[0] === 'n')
            && (this.data[1] === 'u')
            && (this.data[2] === 'l')
            && (this.data[3] === 'l')) {
                this.jsData = null
                return null
        } else {
            this.error = new Error('cannot create null from ' + this.data)
            return this.error
        }
   }
}

class JsonBoolean extends JsonValue {
    validate() {
        switch(this.data[0]) {
            case 't':
                if (this.len !== 4) {
                    this.error = new Error('cannot create true value.  Value too long ' + this.data)
                }
                if ((this.data[0] === 't')
                    && (this.data[1] === 'r')
                    && (this.data[2] === 'u')
                    && (this.data[3] === 'e')) {
                        this.jsData = true
                } else {
                    this.error = new Error('cannot create true value from ' + this.data)
                }
                break
            case 'f':
                if (this.len !== 5) {
                    this.error = new Error('cannot create false value.  Value too long ' + this.data)
                }
                if ((this.data[0] === 'f')
                    && (this.data[1] === 'a')
                    && (this.data[2] === 'l')
                    && (this.data[3] === 's')
                    && (this.data[4] === 'e')) {
                        this.jsData = false
                } else {
                    this.error = new Error('cannot create false value from ' + this.data)
                }
                break
            default:
                this.error = new Error('cannot create boolean value from ' + this.data)
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
                this.jsData = this.data
            } else {
                this.error = new Error('cannot create string value with unbalanced quotes from ' + this.data)
            }
    }
}

class JsonNumber extends JsonValue {
    validate() {
       if (this.data === 'EOF') {
           this.error = new Error('cannot create numeric value from nothing')
       }
       let num = +this.data
       if (isNaN(num)) {
           this.error = new Error('cannot create numeric value for ' + this.data)
       } else {
           this.jsData = num
       }
    }
}

export {JsonBoolean, JsonNull, JsonNumber, JsonString, JsonArray, JsonValue}