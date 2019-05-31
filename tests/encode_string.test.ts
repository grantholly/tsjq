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
            const escapedQuotesEncoder: string = encode('\"let them eat cake\" she said')
            const backspaceEncoder: string = encode('hi \bthere')
            const tabbedEncoder: string = encode('\ttab')
            const formFeedEncoder: string = encode('form\f')
            const newlineEncoder: string = encode('\nnewline\n')
            const carriageReturnEncoder: string = encode('return\r')
            const doubleEscapeEncoder: string = encode('\\escaped')

            expect(escapedQuotesEncoder).equal('"\\"let them eat cake\\" she said"')
            expect(backspaceEncoder).equal('"hi \\bthere"')
            expect(tabbedEncoder).equal('"\\ttab"')
            expect(formFeedEncoder).equal('"form\\f"')
            expect(newlineEncoder).equal('"\\nnewline\\n"')
            expect(carriageReturnEncoder).equal('"return\\r"')
            expect(doubleEscapeEncoder).equal('"\\\\escaped"')
        
        })
    })
})