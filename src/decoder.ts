import { Scanner } from "./scanner";
import { ScanStates } from "./sure";


export class Decoder {
    data: string
    scanner: Scanner
    current: string
    index: number
    state: Array<ScanStates>
    jsonData: any

    constructor(data: string) {
        this.data = data
        this.scanner = new Scanner(data)
        this.current = data[0]
        this.index = this.scanner.scanned
        this.state = []
    }

    pushState(): void {}

    popState(): string { return 'ok' }

    decode() {
        switch (this.data[0]) {
            case '{':
                this.decodeObject(this.data)
                break
            case '[':
                this.decodeArray(this.data)
                break
            default:
                this.decodeLiteral(this.data)
        }
    }

    decodeObject(s: string) {
        this.jsonData = {}
        //scan value from scanner
    }
    decodeArray(s: string) {
        this.jsonData = []
        //scan value from scanner
    }
    decodeLiteral(s: string) {
        switch(s[0]) {
            case '"':
                this.decodeString(this.data)
                break
            case 't':
            case 'f':
                this.decodeBoolean(this.data)
                break
            case 'n':
                this.decodeNull(this.data)
                break
            default:
                this.decodeNumber(this.data)
        }
    }
    decodeString(s: string) {
        this.jsonData = ''
        //scan value from scanner
    }
    decodeNumber(s: string) {
        this.jsonData = 0
        //scan value from scanner
    }
    decodeBoolean(s: string) {
        this.jsonData = true
        //scan value from scanner
    }
    decodeNull(s: string) {
        this.jsonData = null
        //scan value from scanner
    }
}