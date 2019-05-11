import { Decoder } from '../src/decoder'
import { ScanStates } from '../src/sure';

import { expect, assert } from 'chai';

describe('A ScannerState...', function () {
    it('tracks state while decoding booleans', function () {
        const validCases = [
            'true', 'false'
        ]

        for (let i = 0; i < validCases.length; i++) {
            let d = new Decoder(validCases[i])

            expect(d.state.state.length).equal(1)
            expect(d.state.peek()).equal(ScanStates.scanBoolean)
        }
    })

    it('tracks state while decoding null', function () {
        const d = new Decoder('null')

        expect(d.state.state.length).equal(1)
        expect(d.state.peek()).equal(ScanStates.scanNull)
    })

    it('tracks state while decoding numbers', function () {
        const nums = [
            '101', '.6', '3.14', '6.02E+23', '-7.5e-16'
        ]

        for (let i = 0; i < nums.length; i++) {
            let d = new Decoder(nums[i])
            
            expect(d.state.state.length).equal(1)
            expect(d.state.peek()).equal(ScanStates.scanNumber)
        }
    })

    it('tracks state while decoding strings', function () {
        const strings = [
            '"ok"', '"\u1234"',  '"\"quoted\" value"'
        ]

        for (let i = 0; i < strings.length; i++) {
            let d = new Decoder(strings[i])

            expect(d.state.state.length).equal(1)
            expect(d.state.peek()).equal(ScanStates.scanString)
        }
    })

    it('tracks state while decoding flat arrays', function () {
        const flat = '[1, "2", false, null]'
        const d = new Decoder(flat)

        expect(d.state.state.length).equal(6)
        expect(d.state.state[0]).equal(ScanStates.beginArray)
        expect(d.state.state[1]).equal(ScanStates.scanNumber)
        expect(d.state.state[2]).equal(ScanStates.scanString)
        expect(d.state.state[3]).equal(ScanStates.scanBoolean)
        expect(d.state.state[4]).equal(ScanStates.scanNull)
        expect(d.state.state[5]).equal(ScanStates.endArray)
    })
})