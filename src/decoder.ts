import { Scanner } from './scanner'
import { ScanStates } from './sure'
import * as Types from './jsonvalues'

export class Decoder {
    data: string
    scanner: Scanner
    state: Array<ScanStates>
    error: null | Error
    jsData: any

    constructor(data: string) {
        this.data = data
        this.scanner = new Scanner(data)
        this.state = []
        this.error = null
        this.decode()
    }

    pushState(s: ScanStates): void {
        this.state.push(s)
    }

    popState(): ScanStates | undefined {
        return this.state.pop()
    }

    peekState(): ScanStates {
        return this.state[this.state.length]
    }

    decode() {
        this.jsData = this.decodeValue(this.data)
    }

    decodeValue(val: string = '') {
        const begin = this.scanner.scan()
        switch(begin) {
            case '{':
                return this.decodeObject(begin)
            case '[':
                return this.decodeArray(begin)
            default:
                return this.decodeScalar(begin)
        }
    }

    decodeObject(obj: string | Object = {}) {}

    decodeArray(arr: string | Array<any> = []) {}

    decodeScalar(val: string) {
        const raw: string = this.scanner.current.concat(
            this.scanner.scanValue()
        )
        switch(val[0]) {
            case '"':
                return new Types.JsonString(raw).extract()
            case 't':
            case 'f':
                return new Types.JsonBoolean(raw).extract()
            case 'n':
                return new Types.JsonNull(raw).extract()
            default:
                return new Types.JsonNumber(raw).extract()
        }
    }

    decodeNull(): null | Error {
        const raw: string = this.scanner.current.concat(
            this.scanner.scanValue()
        )
        const maybeNull: null | Error = new Types.JsonNull(raw).extract()
        return maybeNull
    }
}