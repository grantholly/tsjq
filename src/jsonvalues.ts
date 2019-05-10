import { Decoder } from "./decoder";

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

class JsonArray extends JsonValue {
    jsonData: Array<any>

    validate() {
        // empty array?
        if (this.len === 1 && this.data[this.len - 1] === ']') {
            console.log('RUNNING ON EMPTY')
            this.jsonData = []
        }
        else if (this.data[this.len - 1] === '[') {
            // hit a nested array
            console.log('RUNNING HIGH')
        } else {
            console.log('RUNNING LOW')
            // need to trim ']' char first
            this.data = this.data.slice(0, this.len - 1)
            // we reached the end of a flat array
            this.jsonData = this.data.split(',')
            for (let i = 0; i < this.jsonData.length; i++) {
                // remove any spaces
                let e: string = this.jsonData[i]
                e = e.replace(/\s/gi, '')
                console.log(e)
                // this creates a circular dependency with this
                // module and the Decoder module
                // further more, this decoder's state stack is lost
                // and should be merged into the caller's state stack
                let val = new Decoder(e)
                this.jsonData[i] = val.jsonData
            }
        }
        console.log(this)
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

abstract class JsonBoolean extends JsonValue {
    jsonData: boolean
}

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
    jsonData: string

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
    jsonData: number

    validate() {
        /*
        laborous implementation inspired by golang

        let isNumGreaterThanZero = new RegExp(/[1-9]/)
        let isNum = new RegExp(/[0-9]/)
        let nums = this.data

        if (this.len === 0) {
            //error
            this.error = new Error('cannot create numeric value from empty string ' + this.data)
        }
        if (this.data[0] === '-') {
            //negative numbers
            nums = this.data.slice(1,)

            if (nums === '') {
                this.error = new Error('cannot create numeric value with dangling negative ' + this.data)
            }
        }
        //fractions
        if (this.data[0] === '0') {
            nums = this.data.slice(1,)
        }
        if ((this.len >= 2) 
            && (nums[0] === '.')
            && (isNum.test(nums[1]))) {
                nums = nums.slice(2,)
                for (let i = 1; i < nums.length; i++) {
                    if (isNum.test(nums[i])) {
                        nums = nums.slice(1,)
                    }
                }
            }
        //integers
        if (isNumGreaterThanZero.test(this.data[0])) {
            nums = nums.slice(1,)
            for (let i = 0; i < nums.length; i++) {
                if (isNum.test(nums[i])) {
                    nums = nums.slice(1,)
                }
            }
        }
        //scientific notation exponents
        if ((this.len >= 2)
            && ((nums[0] === 'e')
                || nums[0] === 'E')) {
                    nums = nums.slice(1,)
                }
                if ((nums[0] === '+')
                    || nums[0] === '-') {
                        nums = nums.slice(1,)
                    }
                    if (nums === '') {
                        this.error = new Error('cannot create numeric value for ' + this.data)
                    }
                for (let i = 0; i < nums.length; i++) {
                    if (isNum.test(nums[i])) {
                        nums = nums.slice(1,)
                    }
                }
        if (nums.length === 0) {
            return this.data
        } else {
            this.error = new Error('cannot create numeric value for ' + this.data)
        }
        */

       //cheater implementation here

       if (this.data === 'EOF') {
           this.error = new Error('cannot create numeric value from nothing')
       }
       let num = +this.data
       if (isNaN(num)) {
           this.error = new Error('cannot create numeric value for ' + this.data)
       } else {
           this.jsonData = num
       }
    }
}

export {JsonTrue, JsonFalse, JsonNull, JsonNumber, JsonString, JsonArray}