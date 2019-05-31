import { encode } from "../src/encode";

import { expect, assert } from 'chai';

describe('an encoder...', function () {
    describe('encoding a boolean...', function () {
        it('encodes true into a string', function () {
             const actualTrue: boolean = true
            const encodedTrue: string = encode(actualTrue)

            expect(encodedTrue).equal('true')
        })
        it('encodes false into a string', function () {
            const actualFalse: boolean = false
            const encodedFalse: string = encode(actualFalse)

            expect(encodedFalse).equal('false')
        })
    })
})