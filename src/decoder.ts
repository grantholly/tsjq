import { Scanner } from './scanner'
import { ScanStates } from './sure'
import { ScannerState } from './scanner_state'
import * as Types from './jsonvalues'

export class Decoder {
    data: string
    scanner: Scanner
    state: ScannerState
    error: null | Error
    jsData: any

    constructor(data: string) {
        this.data = data
        this.scanner = new Scanner(data)
        this.state = new ScannerState()
        this.error = null
        this.decode()
    }

    decode() {
        this.jsData = this.decodeValue(this.data)
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
                        let element: string = vals[i].replace(/\s/gi, '')
                        let decodedElement: any = this.decodeValue(element)
                        arr.push(decodedElement)
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