import { decode } from "../src/decode";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding an empty array...', function () {
        it('returns empty array', function () {
            const empty: string = '[]'
            const emptyJsVal: Array<any> = decode(empty)
            
            expect(emptyJsVal.length).equal(0)
        })
    })
    describe('decoding a flat array...', function () {
        it('decodes all the elements of mixed types', function () {
            const one: string = '[1]'
            const someValues: string = ' [ -0.2, "a ball", true, false, null ] '

            const oneDecoder: Array<number> = decode(one)
            const someValuesDecoder: Array<any> = decode(someValues)

            expect(oneDecoder.length).equal(1)
            expect(oneDecoder[0]).equal(1)

            expect(someValuesDecoder.length).equal(5)
            expect(someValuesDecoder[0]).equal(-0.2)
            expect(someValuesDecoder[1]).equal('a ball')
            expect(someValuesDecoder[2]).equal(true)
            expect(someValuesDecoder[3]).equal(false)
            expect(someValuesDecoder[4]).equal(null)
        })
    })
    describe('decoding a multi-dimensional array...', function () {
        it('decodes nested arrays', function () {
            const nestedArray = '[1, [ 2 ], [[]]]'

            const nestedArrayDecoder = decode(nestedArray)

            expect(nestedArrayDecoder.length).equal(3)
            expect(nestedArrayDecoder[1]).instanceOf(Array)
            expect(nestedArrayDecoder[1][0]).equal(2)
            expect(nestedArrayDecoder[2]).instanceOf(Array)
            expect(nestedArrayDecoder[2][0]).instanceOf(Array)
            expect(nestedArrayDecoder[2][0]).deep.equal([])
        })

        it('handles arrays with anonymous object elements', function () {
            it('decodes object elements', function () {
                const anonymousObjects = '[{"a": 1}, {"a": 2}]'

                const anonymousObjectsDecoder = decode(anonymousObjects)
                const first = anonymousObjectsDecoder[0]
                const second = anonymousObjectsDecoder[1]

                expect(anonymousObjectsDecoder.length).equal(2)
                expect(first).instanceOf(Object)
                expect(first).keys(['a'])
                expect(first['a']).equal(1)

                expect(second).instanceOf(Object)
                expect(first).keys(['a'])
                expect(first['a']).equal(2)
            })
        })
    })
})