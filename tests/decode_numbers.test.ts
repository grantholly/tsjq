import { decode } from "../src/decode";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding a single number...', function () {
        it('will decode positive and negative integers', function () {
            const intDecoder: number = decode('101')
            const negativeDecoder: number = decode('-101')

            expect(intDecoder).equal(101)
            expect(negativeDecoder).equal(-101)
        })

        it('will decode fractions', function () {
            const zeroPointFiveDecoder: number = decode('0.5')
            const negativeHalfDecoder: number = decode('-0.5')
            
            expect(zeroPointFiveDecoder).equal(0.5)
            expect(negativeHalfDecoder).equal(-0.5)
        })

        it('will error on fractions that do not start with a 0', function () {
            expect(function () {
                decode('.5')
            }).to.throw()
        })

        it('will decode numbers in scientific notation', function () {
            const avagodrosNumberDecoder: number = decode('6.02E23')
            const massOfElectron: number = decode('9.11E-34')
            const massOfTheSunDecoder: number = decode('1.989e+30')
            const negativeBigGDecoder: number = decode('-6.647e-11')

            expect(avagodrosNumberDecoder).equal(6.02E23)
            expect(massOfElectron).equal(9.11E-34)
            expect(massOfTheSunDecoder).equal(1.989e30)
            expect(negativeBigGDecoder).equal(-6.647e-11)
        })
    })
})