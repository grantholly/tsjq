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
        const begin = this.scanner.scan()
        switch (begin) {
            case '{':
                this.decodeObject(begin)
                break
            case '[':
                this.decodeArray(begin)
                break
            default:
                this.decodeLiteral(begin)
        }
    }

    decodeObject(obj: string | Object = {}) {
        //scan value from scanner
    }
    decodeArray(arr: string | Array<any> = []) {
        this.pushState(ScanStates.beginArray)
        const beginOrEnd = this.scanner.scanTo(['[', ']']).concat(
            this.scanner.current
        )
        const scalars = beginOrEnd[beginOrEnd.length - 1]
        if (this.scanner.current === ']') {
            // end of array
            const elements = scalars.split(',')
            for (let i = 0; i < elements.length; i++) {
                let decodedElement = this.decodeLiteral(elements[i])
            }
        }
        if (this.scanner.current === '[') {
            // nested array
            this.pushState(ScanStates.beginArray)
        }
        //this.jsonData = new Types.JsonArray(beginOrEnd).extract()
        this.pushState(ScanStates.endArray)
    }
    decodeLiteral(val: string = '') {
        switch(val) {
            case '"':
                this.decodeString(val)
                break
            case 't':
            case 'f':
                this.decodeBoolean(val)
                break
            case 'n':
                this.decodeNull(val)
                break
            default:
                this.decodeNumber(val)
        }
    }
    decodeString(s: string = '""') {
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
        this.jsonData = stringValue.extract()
    }
    decodeNumber(n: string = '') {
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
    decodeBoolean(b: string = '') {
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
    decodeNull(n: string = '') {
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