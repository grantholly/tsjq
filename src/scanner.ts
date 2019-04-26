export class Scanner {
    data: string
    scanned: number
    skipped: number
    end: number
    current: string

    constructor(s: string) {
        this.data = s
        this.scanned = 0
        this.skipped = 0
        this.end = s.length
        this.current = s[0]
    }

    done(): boolean {
        if (this.scanned === this.end) {
            return true
        }
        return false
    }

    reset(): void {
        this.scanned = 0
        this.skipped = 0
        this.current = this.data[this.scanned]
    }

    scan(): string {
        if (this.done()) {
            this.current = 'EOF'
            return 'EOF'
        }
        if (this.isSpace(this.data[this.scanned])) {
            this.scanned++
            this.skipped++
            return this.scan()
        }
        this.scanned ++
        this.current = this.data[this.scanned - 1]
        return this.data[this.scanned - 1]
    }

    scanTo(chars: Array<string>): string {
        let val = ''
        let scanning = true
        while (scanning) {
            if (! this.done()) {
                let char = this.scan()
                // hit a stop char
                if (chars.indexOf(char) >= 0) {
                    scanning = false
                } else {
                    val = val.concat(char)
                }
            } else {
                scanning = false
            }
        }
        return val
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