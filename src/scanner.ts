export class Scanner {
    data: string
    scanned: number
    end: number
    
    constructor(s: string) {
        this.data = s
        this.scanned = 0
        this.end = s.length
    }

    done(): boolean {
       return this.scanned === this.end ? true : false
    }

    reset(): void {
        this.scanned = 0
    }

    scan(): string {
        this.scanned ++
        return this.data[this.scanned - 1]
    }

    scanTo(chars: Array<string>, 
            skipSpaces: boolean = false): string {
        let val = ''
        let scanning = true
        while (scanning) {
            if (! this.done()) {
                let char = this.scan()
                if (chars.indexOf(char) >= 0) {
                    scanning = false
                } else {
                    val = val.concat(char)
                }
            } else {
                scanning = false
            }
        }
        if (skipSpaces) {
            val = val.replace(/\s/gi, '')
        }
        return val     
    }

    scanToEnd(skipSpaces: boolean = false): string {
        return this.scanTo([], skipSpaces)
    }
    
    // maybe I need a method to scan until hitting a
    // non-space char
    scanToNext(): void {
        let scanning = true
        while (scanning) {
            if (! this.done()) {
                let char = this.scan()
                if (this.isSpace(char)) {
                    this.scanned ++
                    continue
                } else {
                    scanning = false
                }
            }
        }
    }

    isSpace(char: string | void): boolean {
        switch(char) {
            case ' ':
            case '\t':
            case '\r':
            case '\n':
                return true
            default:
                return false
        }
    }
}