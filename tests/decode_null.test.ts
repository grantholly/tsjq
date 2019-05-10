import { Decoder } from "../src/decoder";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding a single null...', function () {
        it('will decode a null only from an unquoted value', function () {
            const nullDecoder = new Decoder('null')

            expect(nullDecoder.jsData).equal(null)
        })

        it('will error on any value except exactly "null"', function () {
            const nullDecoder = new Decoder('null!')

            expect(nullDecoder.jsData).instanceOf(Error)
        })

        it('will error with any extra spaces or characters', function () {
            // I wonder if I can borrow this from scanner.test
            const spaces = [' ', '\t', '\r', '\n', '\f']
            for (let i = 0; i < spaces.length; i++) {
                let notNull = 'null'.concat(spaces[i])
                let nullDecoder = new Decoder(notNull)

                expect(nullDecoder.jsData).instanceOf(Error)
            }
        })
    })
})