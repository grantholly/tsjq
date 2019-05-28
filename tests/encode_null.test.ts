import { encode } from "../src/encode";

import { expect, assert } from 'chai';

describe('an encoder...', function () {
    describe('encoding a null...', function () {
        it('encodes null into a string', function () {
            const actualNull: null = null
            const encodedNull: string = encode(actualNull)

            expect(encodedNull).equal('null')
        })
    })
})