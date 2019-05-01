import { Scanner } from "./scanner";
import { ScanStates } from "./sure";
import  * as Types from "./jsonvalues";

export class Decoder {
    data: string
    scanner: Scanner
    index: number
    state: Array<ScanStates>
    jsonData: any

    constructor(data: string) {
        this.data = data
        this.scanner = new Scanner(data)
        this.index = this.scanner.scanned
        this.state = []
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
        if (stringValue.error === null) {
            this.pushState(ScanStates.endString)
        }
    }
    decodeNumber() {
        let jsonData: number
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
                if (trueValue.error === null) {
                    this.pushState(ScanStates.endBoolean)
                }
                console.log(trueValue)
                break
            case 'f':
                const maybeFalse = this.scanner.current.concat(
                    this.scanner.scanToEnd()
                )
                const falseValue = new Types.JsonFalse(maybeFalse)
                if (falseValue.error === null) {
                    this.pushState(ScanStates.endBoolean)
                }
                console.log(falseValue)
                break
            default:
                console.error('cannot decode value for ' + this.data)                
        }
    }
    decodeNull() {
        // 'n' has been scanned
        let jsonData = null
        this.pushState(ScanStates.beginNull)
        // scan to the end of the value looking for
        // 'ull' and concat with the current
        const maybeNull = this.scanner.current.concat(
            this.scanner.scanToEnd()
        )
        const nullValue = new Types.JsonNull(maybeNull)
        if (nullValue.error === null) {
            this.pushState(ScanStates.endNull)
        }
        console.log(nullValue)
    }
}