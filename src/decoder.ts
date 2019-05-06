import { Scanner } from "./scanner";
import { ScanStates } from "./sure";
import  * as Types from "./jsonvalues";

export class Decoder {
    data: string
    scanner: Scanner
    index: number
    state: Array<ScanStates>
    error: null | Error
    jsonData: any

    constructor(data: string) {
        this.data = data
        this.scanner = new Scanner(data)
        this.index = this.scanner.scanned
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
        this.scanner.scan()
        switch (this.scanner.current) {
            case '{':
                this.decodeObject()
                break
            case '[':
                this.decodeArray()
                break
            default:
                this.decodeLiteral()
        }
    }

    decodeObject() {
        let jsonData = {}
        //scan value from scanner
    }
    decodeArray() {
        let jsonData = []
        //scan value from scanner
    }
    decodeLiteral() {
        switch(this.scanner.current) {
            case '"':
                this.decodeString()
                break
            case 't':
            case 'f':
                this.decodeBoolean()
                break
            case 'n':
                this.decodeNull()
                break
            default:
                this.decodeNumber()
        }
    }
    decodeString() {
        let jsonData: string
        this.pushState(ScanStates.beginString)
        const maybeString = this.scanner.current.concat(
            this.scanner.scanToEnd()
        )
        const stringValue = new Types.JsonString(maybeString)
        this.error = stringValue.errorState()
        if (this.error === null) {
            this.pushState(ScanStates.endString)
        }
        this.jsonData = stringValue
    }
    decodeNumber() {
        let jsonData: number
        this.pushState(ScanStates.beginNumber)
        const maybeNumber = this.scanner.current.concat(
            this.scanner.scanToEnd()
        )
        const numberValue = new Types.JsonNumber(maybeNumber)
        this.error = numberValue.errorState()
        if (this.error === null) {
            this.pushState(ScanStates.endNumber)
        }
        this.jsonData = numberValue.extract()
    }
    decodeBoolean() {
        let jsonData: boolean
        this.pushState(ScanStates.beginBoolean)
        switch(this.scanner.current) {
            case 't':
            /* 
            refactor this into a single method like
            tryType[T](type: T, data: string): JsonValue {
                const maybeJson = this.scanner.current.concat(
                    this.scanner.scanToEnd()
                )
                const jsonVal = new type(maybeJson)
                if (jsonVal.error === null) {
                    this.pushState(ScanState['end' + type.asString()])
                }
            }
            */
                const maybeTrue = this.scanner.current.concat(
                    this.scanner.scanToEnd()
                )
                const trueValue = new Types.JsonTrue(maybeTrue)
                this.error = trueValue.errorState()
                if (this.error === null) {
                    this.pushState(ScanStates.endBoolean)
                }
                this.jsonData = trueValue.extract()
                break
            case 'f':
                const maybeFalse = this.scanner.current.concat(
                    this.scanner.scanToEnd()
                )
                const falseValue = new Types.JsonFalse(maybeFalse)
                this.error = falseValue.errorState()
                if (this.error === null) {
                    this.pushState(ScanStates.endBoolean)
                }
                this.jsonData = falseValue.extract()
                break
            default:
                console.error('cannot decode value for ' + this.data)
        }
    }
    decodeNull() {
        let jsonData: null
        // 'n' has been scanned
        this.pushState(ScanStates.beginNull)
        // scan to the end of the value looking for
        // 'ull' and concat with the current
        const maybeNull = this.scanner.current.concat(
            this.scanner.scanToEnd()
        )
        const nullValue = new Types.JsonNull(maybeNull)
        this.error = nullValue.errorState()
        if (this.error === null) {
            this.pushState(ScanStates.endNull)
        }
        this.jsonData = nullValue.extract()
    }
}