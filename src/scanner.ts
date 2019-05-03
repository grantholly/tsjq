export class Scanner {
    data: string
    scanned: number
    end: number
    current: string
    
    constructor(s: string) {
        this.data = s
        this.scanned = 0
        this.end = s.length
        this.current = this.data[0]
    }

    done(): boolean {
       return this.scanned === this.end ? true : false
    }

    reset(): void {
        this.scanned = 0
    }

    scan(): string {
        if (! this.done()) {
            this.scanned ++
            this.current = this.data[this.scanned - 1]
            return this.data[this.scanned - 1]
        } else {
            this.current = 'EOF'
            return 'EOF'
        }
    }

    scanNum(howMany: number): string {
        let val = ''
        while (howMany > 0) {
            if (! this.done()) {
                howMany --
                let char = this.scan()
                val = val.concat(char)
            }
        }
        return val
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