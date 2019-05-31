import { encode } from "../src/encode";

import { expect, assert } from 'chai';

describe('an encoder...', function () {
    describe('encoding a number...', function () {
        it('encodes positive and negative whole numbers', function () {
            const tenEncoder: string = encode(10)
            const negativeElevenEncoder: string = encode(-11)

            expect(tenEncoder).equal('10')
            expect(negativeElevenEncoder).equal('-11')
        })
        it('encodes fractions', function () {
            const halfEncoder: string = encode(0.5)
            const negativeEncoder: string = encode(-.75)

            expect(halfEncoder).equal('0.5')
            expect(negativeEncoder).equal('-0.75')
        })
        it('encodes numbers in scientific notation', function () {
            const avagodrosNumberEncoder: string = encode(6.02E23)
            const massOfElectronEncoder: string = encode(9.11E-34)
            const massOfTheSunEncoder: string = encode(1.989e+30)
            const negativeBigGEncoder: string = encode(-6.647e-11)

            expect(avagodrosNumberEncoder).equal('6.02e+23')
            expect(massOfElectronEncoder).equal('9.11e-34')
            expect(massOfTheSunEncoder).equal('1.989e+30')
            expect(negativeBigGEncoder).equal('-6.647e-11')
        })
    })
})