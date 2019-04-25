class JValue {
    data: string
    end: number
    json_data: any

    constructor(s: string) {
        this.data = s
        this.end = s.length
    }
}

class JArray extends JValue {

    constructor(s: string) {
        console.log('JArray')
        super(s)
        this.json_data = []
    }
}

class JObject extends JValue {
    
    constructor(s: string) {
        console.log('JObject')
        super(s)
        this.json_data = {}
    }

    parse() {
        for (let i = 0; i < this.end; i++) {
            const char = this.data[i]
        }
    }
}

class JScalar extends JValue {
    
    constructor(s: string) {
        //console.log('JScalar')
        super(s)
        this.parse()
    }

    parse() {
        switch(this.data[0]) {
            case 't':
                if (this.data.slice(0, 4) === 'true') {
                    this.json_data = new JBool(this.data.slice(0,4))
                }
                break
            case 'f':
                if (this.data.slice(0, 5) === 'false') {
                    this.json_data = new JBool(this.data.slice(0,5))
                }
                break
            case 'n':
                if (this.data.slice(0, 4) === 'null') {
                    this.json_data = new JNull(this.data.slice(0,4))
                }
                break
            case '"':
                this.json_data = new JString(this.data.slice(1, ))
                break            
        }
        return this.json_data
    }
}

class JString extends JScalar {
    constructor(s: string) {
        console.log('JString')
        super(s)
        this.json_data = ''
        this.parse()
    }

    parse() {
        for (let i = 0; i < this.end; i++) {
            const char = this.data[i]
            if (char !== '"') {
                this.json_data = this.json_data.concat(char)
            }
        }
        return this.json_data
    }
}

class JNumber extends JScalar {
    constructor(s: string) {
        console.log('JNumber')
        super(s)
        this.json_data = 0
        this.parse()
    }

    parse() {

    }
}

class JNull extends JScalar {
    constructor(s: string) {
        console.log('JNull')
        super(s)
        this.parse()
    }

    parse() {
        if (this.data === 'null') {
            return null
        } else {
            throw new Error('cannot create JNull for value')
            console.error(this.data)
        }
    }
}

class JBool extends JScalar {
    constructor(s: string) {
        console.log('JBool')
        super(s)
        this.parse()
    }

    parse() {
        if (this.data === 'true') {
            this.json_data = true
        } else if (this.data === 'false') {
            this.json_data = false
        } else {
            throw new Error('cannot create JBool for value')
            console.error(this.data)
        }
    }
}

// --- parsing

class StringParser {
    data: string
    end: number
    json_data: any

    constructor(input: string) {
        this.data = input
        this.end = input.length
    }

    parse() {
        switch(this.data[0]) {
            case '{':
                //console.log('object')
                this.json_data = new JObject(this.data)
                break
            case '[':
                //console.log('array')
                this.json_data = new JArray(this.data)
                break
            default:
                //console.log(char)
                this.json_data = new JScalar(this.data)
        }
        return this.json_data
    }
}

let whoa = '{"a": null, "b": [1,2,3], "c": true, "d": {"e": false, "f": 10, "g": [-1, 0.06e-10, 6.03E23, {"h": "hello"}]}}'
let modest = '{"a": 1, "b": [2, ["ok"], false], "c": null, "d": true}'

const s = new StringParser('{"a": 1}')
console.log(s.parse())