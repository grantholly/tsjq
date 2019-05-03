import { Scanner } from "../src/scanner";

import { expect, assert } from 'chai';


describe('A scanner...', function() {
    describe('using .scan...', function () {
        it('scans a single char', function() {
            const s = new Scanner('abc')
            expect(s.current).equal('a')
            expect(s.scanned).equal(0)
            expect(s.end).equal(3)

            const first = s.scan()
            expect(first).equal('a')
            expect(s.scanned).equal(1)
            expect(s.current).equal('a')
            expect(s.done()).equal(false)

            const second = s.scan()
            expect(second).equal('b')
            expect(s.scanned).equal(2)
            expect(s.current).equal('b')
            expect(s.done()).equal(false)

            const third = s.scan()
            expect(third).equal('c')
            expect(s.scanned).equal(3)
            expect(s.current).equal('c')
            expect(s.done()).equal(true)
        })
        it('returns EOF when scanning beyond the length of the input data', function() {
            const s = new Scanner('ok')
            const tooFar = s.end + 1
            for (let i = 0; i < tooFar; i++) {
                s.scan()
            }

            expect(s.scanned).equal(2)
            expect(s.done()).equal(true)
            expect(s.current).equal('EOF')
        })
    })

    describe('using .scanTo...' , function() {
        it('scans to the end of a string', function() {
            const s = new Scanner('"grant rulez"')
            // scan first quote
            s.scan()
            const stringVal = s.scanTo(['"'])

            expect(stringVal).equal('grant rulez')
        })

        it('scans to a stop character', function() {
            const s = new Scanner('up to here! no further')
            const upToHere = s.scanTo(['!'])

            expect(upToHere).equal('up to here')
        })

        it('scans to the first of multiple stop characters', function() {
            const s = new Scanner('start&stop ! extra')
            const start = s.scanTo(['&', '!'])

            expect(start).equal('start')
        })

        it('scans unquoted values', () => {
            const unquotes = ['true', 'false', 'null']
            for (let i = 0; i < unquotes.length; i++) {
                const q = unquotes[i]
                let s = new Scanner(q)
                let v = s.scanToEnd()
                let hasQuotes = v.indexOf('"') >= 0 ? true : false
                expect(hasQuotes).equal(false)
            }
        })

        it('scans an object key', () => {
            const o = '{"a":   1}'
            const s = new Scanner(o)
            // capture opening {
            s.scan()
            const k = s.scanTo([':'])
            expect(k).equal('"a"')
        })

        it('scans a value for a given key in an object', () => {
            console.log('STUB')
        })

        it('scans an element in an array', () => {
            console.log('STUB')
        })

        it('scans a given number of chars', () => {
            console.log('STUB')
        })

        it('scans skipping spaces', () => {
            const spaces = [' ', '\t', '\r', '\n']
            const prefixSpaces = spaces.map((s) => {
                return s.concat('ok')
            })
            const suffixSpaces = spaces.map((s) => {
                return 'ok'.concat(s)
            })
            const middleSpaces = spaces.map((s) => {
                return 'o'.concat(s).concat('k')
            })
            const tests = [...prefixSpaces, 
                ...suffixSpaces, ...middleSpaces]

            for (let i = 0; i < tests.length; i++) {
                const test = tests[i]
                let s = new Scanner(test)
                let v = s.scanToEnd(true)
                expect(v).equal('ok')
            }

        })
    })
})