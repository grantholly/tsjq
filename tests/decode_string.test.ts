import { decode } from "../src/decode";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding a string...', function () {
        it('can decode an empty string', function () {
            expect(decode('""')).equal('')
        })

        it('decodes a string', function () {
            const simpleString: string = '"hello world"'

            expect(decode(simpleString)).equal('hello world')
        })

        it('decodes escape characters', function () {
            const escapedQuotes: string = '"\\"let them eat cake\\" she said"'
            const backspace: string = '"hi \bthere"'
            const tabbed: string = '"\ttab"'
            const doubleEscape: string = '"\escaped"'

            expect(decode(escapedQuotes)).equal('""let them eat cake"" she said')
            expect(decode(backspace)).equal('hi \bthere')
            expect(decode(tabbed)).equal('\ttab')
            expect(decode(doubleEscape)).equal('\escaped')
        })

        it('decodes unicode code points', function () {
            expect(decode('"\u1234"')).equal('\u1234')
        })
    })
})
