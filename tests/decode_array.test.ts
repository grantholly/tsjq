import { Decoder } from "../src/decoder";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding an empty array...', function () {
        it('decodes an empty array', function () {
            const empty = '[]'
            const d = new Decoder(empty)

            expect(d.jsData.length).equals(0)
            expect(d.jsData).instanceOf(Array)
        })
    })
    describe('decoding a flat array...', function () {
        it('decodes all the elements', function () {
            const one = '[1]'
            const some = '[1,2,3]'
            const mixed = '[1, true, false, null, "ok"]'
            
            const oneDecoder = new Decoder(one)
            const someDecoder = new Decoder(some)
            const mixedDecoder = new Decoder(mixed)

            expect(oneDecoder.jsData.length).equal(1)
            expect(oneDecoder.jsData[0]).equal(1)
            expect(oneDecoder.jsData).instanceOf(Array)

            expect(someDecoder.jsData.length).equal(3)
            expect(someDecoder.jsData[0]).equal(1)
            expect(someDecoder.jsData[1]).equal(2)
            expect(someDecoder.jsData[2]).equal(3)
            expect(someDecoder.jsData).instanceOf(Array)

            expect(mixedDecoder.jsData.length).equal(5)
            expect(mixedDecoder.jsData[0]).equal(1)
            expect(mixedDecoder.jsData[1]).equal(true)
            expect(mixedDecoder.jsData[2]).equal(false)
            expect(mixedDecoder.jsData[3]).equal(null)
            expect(mixedDecoder.jsData[4]).equal('"ok"')
            expect(mixedDecoder.jsData).instanceOf(Array)
        })
    })
    describe('decoding a multi-dimensional array...', function () {
        it('decodes nested arrays', function () {
            const nested = '[[[1]]]'
            const moreNesting = '[1,[2]]'

            //const nestedDecoder = new Decoder(nested)
            //const moreNestingDecoder = new Decoder(moreNesting)
        })
    })
})