import { Scanner } from "./scanner";

class ValueScanner {
    scanner: Scanner

    constructor(s: string) {
        this.scanner = new Scanner(s)
    }

    scanScalar() {}

    scanArray() {}

    scanObject() {}

    decode() {
        while(! this.scanner.done()) {
            let begin = this.scanner.scan()
            if (begin !== undefined) {
                switch(begin) {
                    case '{':
                        this.scanObject()
                    case '[':
                        this.scanArray()
                    default:
                        this.scanScalar()
                }
            }
        }
    }
}