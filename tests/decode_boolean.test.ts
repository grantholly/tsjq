import { Decoder } from "../src/decoder";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding a single boolean...', function () {
        it('will decode a boolean only from an unquoted value', function () {
            const trueDecoder = new Decoder('true')
            const falseDecoder = new Decoder('false')

            expect(falseDecoder.jsonData).equal(false)
            expect(trueDecoder.jsonData).equal(true)
        })

        it('will error on any value except exactly "true" or "false"', function () {
            const falseDecoder = new Decoder('falsezzz')
            const trueDecoder = new Decoder('tRUE')

            expect(falseDecoder.jsonData).instanceOf(Error)
            expect(trueDecoder.jsonData).instanceOf(Error)
        })

        it('will error with any extra spaces or characters', function () {
            // I wonder if I can borrow this from scanner.test
            const spaces = [' ', '\t', '\r', '\n', '\f']
            for (let i = 0; i < spaces.length; i++) {
                let notTrue = 'true'.concat(spaces[i])
                let notFalse = 'false'.concat(spaces[i])
                let falseDecoder = new Decoder(notFalse)
                let trueDecoder = new Decoder(notTrue)

                expect(falseDecoder.jsonData).instanceOf(Error)
                expect(trueDecoder.jsonData).instanceOf(Error)
            }
        })
    })
})