import { encode } from "../src/encode";

import { expect, assert } from 'chai';

describe('an encoder...', function () {
    describe('encoding a string...', function () {
        it('handles the empty string', function () {
            const emptyEncoder: string = encode('')
            
            expect(emptyEncoder).equal('""')
        })
        it('encodes unescaped strings', function () {
            const simpleEncoder: string = encode('this is a test')

            expect(simpleEncoder).equal('"this is a test"')
        })
        it('handles escaped strings', function () {
            const escapedQuotes: string = '\"let them eat cake\" she said'
            const backspace: string = 'hi \bthere'
            const tabbed: string = '\ttab'
            const doubleEscape: string = '\escaped'

            const escapedQuotesEncoder: string = encode(escapedQuotes)
            const backspaceEncoder: string = encode(backspace)
            const tabbedEncoder: string = encode(tabbed)
            const doubleEscapeEncoder: string = encode(doubleEscape)

            console.log(escapedQuotesEncoder)
            console.log(backspaceEncoder)
            console.log(tabbedEncoder)
            console.log(doubleEscapeEncoder)
        })
    })
})