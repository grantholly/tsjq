import { Decoder } from "../src/decoder";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding a single number...', function () {
        it('will decode positive and negative integers', function () {
            const intDecoder = new Decoder('101')
            const negativeDecoder = new Decoder('-101')

            expect(intDecoder.jsonData).equal(101)
            expect(negativeDecoder.jsonData).equal(-101)
        })

        it('will decode fractions', function () {
            const pointFiveDecoder = new Decoder('.5')
            const zeroPointFiveDecoder = new Decoder('0.5')
            
            expect(pointFiveDecoder.jsonData).equal(0.5)
            expect(zeroPointFiveDecoder.jsonData).equal(0.5)
        })

        it('will decode numbers in scientific notation', function () {
            const avagodrosNumberDecoder = new Decoder('6.02E-23')
            const massOfTheSunDecoder = new Decoder('1.989e+30')

            expect(avagodrosNumberDecoder.jsonData).equal(6.02E-23)
            expect(massOfTheSunDecoder.jsonData).equal(1.989e30)
        })
    })
})