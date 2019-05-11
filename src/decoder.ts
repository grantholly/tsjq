import { Scanner } from './scanner'
import { ScanStates } from './sure'
import { StateStack } from './state_stack'
import * as Types from './jsonvalues'

export class Decoder {
    data: string
    scanner: Scanner
    state: StateStack
    error: null | Error
    jsData: any

    constructor(data: string) {
        this.data = data
        this.scanner = new Scanner(data)
        this.state = new StateStack()
        this.error = null
        this.decode()
    }

    decode() {
        this.jsData = this.decodeValue(this.data)
        console.log(this)
    }

    decodeValue(val: string) {
        if ( ! (this.state.scanningArray()
            || this.state.scanningObject())) {
            val = this.scanner.scan()
        }
        switch(val) {
            case '{':
                return this.decodeObject(val)
            case '[':
                return this.decodeArray(val)
            default:
                return this.decodeLiteral(val)
        }
    }

    decodeObject(obj: string | Object = {}) {
        this.state.pushState(ScanStates.beginObject)
    }

    decodeArray(arr: string | Array<any> = []) {
        this.state.pushState(ScanStates.beginArray)
        const beginOrEnd: string = this.scanner.scanTo(
            ['[', '{', ']']
        )
        switch(this.scanner.current) {
            case '{':
                // decode an object
            case '[':
                // time to recurse
            case ']':
                // flat array
                // check for empty
                if (beginOrEnd.length === 0) {
                    this.state.pushState(ScanStates.endArray)
                    return []
                } else {
                    const vals: Array<string> = beginOrEnd.split(',')
                    let arr: Array<any> = []
                    for (let i = 0; i < vals.length; i++) {
                        let e: any = this.decodeValue(vals[i])
                        arr.push(e)
                    }
                    this.state.pushState(ScanStates.endArray)
                    return arr
                }
            default:
                this.error = new Error('cannot decode array')
        }
    }

    decodeLiteral(val: string) {
        // check if we are in a composite type
        if ( ! (this.state.scanningArray()
            || this.state.scanningObject())) {
            val = this.scanner.current.concat(
                this.scanner.scanValue()
            )
        }
        switch(val[0]) {
            case '"':
                this.state.pushState(ScanStates.scanString)
                return new Types.JsonString(val).extract()
            case 't':
            case 'f':
                this.state.pushState(ScanStates.scanBoolean)
                return new Types.JsonBoolean(val).extract()
            case 'n':
                this.state.pushState(ScanStates.scanNull)
                return new Types.JsonNull(val).extract()
            default:
                this.state.pushState(ScanStates.scanNumber)
                return new Types.JsonNumber(val).extract()
        }
    }
}