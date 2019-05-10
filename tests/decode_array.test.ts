import { Decoder } from "../src/decoder";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding an empty array...', function () {
        it('decodes an empty array', function () {
            const empty = '[]'
            const d = new Decoder(empty)

            expect(d.jsonData.length).equals(0)
            expect(d.jsonData).instanceOf(Array)

            console.log(d)
        })
    })
    describe('decoding a flat array...', function () {
        it('decodes all the elements', function () {
            const one = '[1]'
            const some = '[1,2,3]'
            const mixed = '[1, true, false, null, "ok"]'
            
            const someDecoder = new Decoder(some)
            const oneDecoder = new Decoder(one)
            const mixedDecoder = new Decoder(mixed)

            console.log(oneDecoder)
            expect(oneDecoder.jsonData.length).equal(1)
            expect(oneDecoder.jsonData[0]).equal(1)
            expect(oneDecoder.jsonData).instanceOf(Array)

            console.log(someDecoder)
            expect(someDecoder.jsonData.length).equal(3)
            expect(someDecoder.jsonData[0]).equal(1)
            expect(someDecoder.jsonData[1]).equal(2)
            expect(someDecoder.jsonData[2]).equal(3)
            expect(someDecoder.jsonData).instanceOf(Array)

            console.log(mixedDecoder)
            expect(mixedDecoder.jsonData.length).equal(5)
            expect(mixedDecoder.jsonData[0]).equal(1)
            expect(mixedDecoder.jsonData[1]).equal(true)
            expect(mixedDecoder.jsonData[2]).equal(false)
            expect(mixedDecoder.jsonData[3]).equal(null)
            expect(mixedDecoder.jsonData[4]).equal('"ok"')
            expect(mixedDecoder.jsonData).instanceOf(Array)
        })
    })
    describe('decoding a multi-dimensional array...', function () {
        it('decodes nested arrays', function () {
            const nested = '[[[1]]]'
            const moreNesting = '[1,[2]]'

            const nestedDecoder = new Decoder(nested)
            const moreNestingDecoder = new Decoder(moreNesting)

            console.log(nestedDecoder)
            console.log(moreNestingDecoder)
        })
    })
})