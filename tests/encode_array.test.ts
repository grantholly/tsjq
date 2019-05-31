import { encode } from "../src/encode";

import { expect, assert } from 'chai';

describe('an encoder...', function() {
    describe('encoding a flat array', function () {
        it('handles the empty array', function () {
            const empty: string = encode([])

            expect(empty).equal('[]')
        })
        it('handles multiple values of varying types', function () {
            const varying: Array<any> = [
                1, -10.1, .75, 3.3E33, 5.5e-55, true, false, null
            ]

            const varyingeEncoder: string = encode(varying)

            expect(varyingeEncoder).equal(
                '[1,-10.1,0.75,3.3e+33,5.5e-55,true,false,null]'
            )
        })
    })
    describe('encoding a multi-dimensional array', function () {
        it('handles nested arrays of varying types', function() {
            const arr: Array<any> = [
                1, true, [], [false, null, [-2, []]]
            ]

            const arrEncoder: string = encode(arr)

            expect(arrEncoder).equal(
                '[1,true,[],[false,null,[-2,[]]]]'
            )
        })
    })
    describe('encoding an array with anonymous object elements', function () {
        
    })
})