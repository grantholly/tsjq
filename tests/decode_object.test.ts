import { decode } from "../src/decode";

import { expect, assert } from 'chai';

describe('A decoder...', function () {
    describe('decoding an object...', function () {
        it('parses the empty object', function () {
            const empty: string = '{ }'
            interface Iempty {}
            
            const emptyDecoder: Iempty = decode(empty)

            expect(emptyDecoder).deep.equal({})
        })

        it('parses a flat object of varying types', function () {
            const flat: string = '{ "a": 1, "b": true, "c": false, "d": null, "e": "done" }'
            interface Ifalt {
                a: number
                b: boolean
                c: boolean
                d: null
                e: string
            }

            const flatDecoder: Ifalt = decode(flat)

            expect(flatDecoder).keys(['a', 'b', 'c', 'd', 'e'])
            expect(flatDecoder['a']).equal(1)
            expect(flatDecoder['b']).equal(true)
            expect(flatDecoder['c']).equal(false)
            expect(flatDecoder['d']).equal(null)
            expect(flatDecoder['e']).equal("done")
        })

        it('can parse array values', function () {
            const withArray: string = ' {"a": [1,2]} '
            interface IwithArray {
                a: Array<number>
            }

            const withArrayDecoder: IwithArray = decode(withArray)

            expect(withArrayDecoder['a']).deep.equal([1,2])
        })

        it('can parse object values', function () {
            const nested: string = '{"a" : {"b" : {}}}'
            interface empty {}
            interface Ib {
                b: empty
            }
            interface Ia {
                a: Ib
            }

            const nestedDecoder: Ia = decode(nested)

            expect(nestedDecoder).keys(['a'])
            expect(nestedDecoder['a']).keys(['b'])
            expect(nestedDecoder['a']['b']).deep.equal({})
            expect(nestedDecoder['a']).deep.equal({'b': {}})
            expect(nestedDecoder).deep.equal({'a': {'b': {}}})
        })
    })
})