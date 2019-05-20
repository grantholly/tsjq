import { decode } from "../src/decode";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding a single boolean...', function () {
        it('will decode a boolean only from an unquoted value', function () {
            const trueDecoder: boolean = decode('true')
            const falseDecoder: boolean = decode('false')

            expect(trueDecoder).equal(true)
            expect(falseDecoder).equal(false)
        })

        it('will error on any value except exactly "true" or "false"', function () {
            const notFalse: Array<string> = ['fals', 'false!', 'fa lse']
            const notTrue: Array<string> = ['tRUE', 'true &', 'tru e']

            const testCases = [...notFalse, ...notTrue].map(t => {
                expect(function () {
                    decode(t)
                }).to.throw()
            })
        })
    })
})