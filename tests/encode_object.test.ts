import { encode } from "../src/encode";

import { expect, assert } from 'chai';

describe('an encoder...', function () {
    describe('encoding a flat object...', function () {
        it('encodes the empty object', function () {
            const empty: string = encode({})

            expect(empty).equal('{}')
        })
        it('encodes an object with elements of varying types', function () {
            const varying: object = {
                'a': 1, 'b': true, 'c': false,
                'd': null, 'e': [1,true, false, null, []],
                'f': {'a': 10, 'b': true, 'c': false, 'd': null, 'e': [], 'f': {}}
            }

            const varyingEncoder: string = encode(varying)
            expect(varyingEncoder).equal(
                '{"a":1,"b":true,"c":false,"d":null,' +
                '"e":[1,true,false,null,[]],' +
                '"f":{"a":10,"b":true,"c":false,"d":null,"e":[],"f":{}}}'
            )
        })
    })
    describe('encoding a nested object...', function () {
        it('encodes elements that are objects', function () {
            const nested: string = encode(
                {a: {b: {c: {d: {}}}}}
            )

            expect(nested).equal(
                '{"a":{"b":{"c":{"d":{}}}}}'
            )
        })
    })
})