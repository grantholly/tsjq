import { Decoder } from "../src/decoder";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding a single number...', function () {
        it('will decode positive and negative integers', function () {
            const intDecoder = new Decoder('101')
            const negativeDecoder = new Decoder('-101')

            expect(intDecoder.jsData).equal(101)
            expect(negativeDecoder.jsData).equal(-101)
        })

        it('will decode fractions', function () {
            const pointFiveDecoder = new Decoder('.5')
            const zeroPointFiveDecoder = new Decoder('0.5')
            
            expect(pointFiveDecoder.jsData).equal(0.5)
            expect(zeroPointFiveDecoder.jsData).equal(0.5)
        })

        it('will decode numbers in scientific notation', function () {
            const avagodrosNumberDecoder = new Decoder('6.02E-23')
            const massOfTheSunDecoder = new Decoder('1.989e+30')

            expect(avagodrosNumberDecoder.jsData).equal(6.02E-23)
            expect(massOfTheSunDecoder.jsData).equal(1.989e30)
        })
    })
})