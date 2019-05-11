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

    scanValue(skipSpaces: boolean = false) {
        return this.scanTo([':', ',', ']', '}'], skipSpaces)
    }
}