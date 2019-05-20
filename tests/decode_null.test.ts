import { decode } from "../src/decode";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding a single null...', function () {
        it('will decode a null only from an unquoted value', function () {
            const nullDecoder: null = decode('null')

            expect(nullDecoder).equal(null)
        })

        it('will error on any value except exactly "null"', function () {
            const notNull = ['null!', ' nulL', 'NU LL']

            notNull.forEach(t => {
                expect(function () {
                    decode(t)
                }).to.throw()
            })
        })
    })
})