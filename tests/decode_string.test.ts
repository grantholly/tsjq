import { Decoder } from '../src/decoder'

import { expect, assert } from 'chai'

describe('A decoder...', function () {
    describe('decoding a string', function () {
        it('decodes quoted strings', function () {
            const ok = '"ok"'
            const someSpaces = '"here we go"'

            const okDecoder = new Decoder(ok)
            const spacesDecoder = new Decoder(someSpaces)

            expect(okDecoder.jsData).equal('"ok"')
            expect(spacesDecoder.jsData).equal('"here we go"')
        })
        it('decodes the empty string', function () {
            const empty = '""'

            const d = new Decoder(empty)

            expect(d.jsData).equal('""')
        })
        it('decodes escape characters', function () {
            const tab = '"\ttab"'
            const carriageReturn = '"carriage return\r"'
            const newLine = '"new\nline"'
            const formFeed = '"\fform\ffeed"'
            const backspace = '"back \bspace"'
            const unicodeChars = '"\u1234"'

            const tabDecoder = new Decoder(tab)
            const carriageReturnDecoder = new Decoder(carriageReturn)
            const newLineDecoder = new Decoder(newLine)
            const formFeedDecoder = new Decoder(formFeed)
            const backspaceDecoder = new Decoder(backspace)
            const unicodeCharsDecoder = new Decoder(unicodeChars)

            expect(tabDecoder.jsData).equal('"\ttab"')
            expect(carriageReturnDecoder.jsData).equal('"carriage return\r"')
            expect(newLineDecoder.jsData).equal('"new\nline"')
            expect(formFeedDecoder.jsData).equal('"\fform\ffeed"')
            expect(backspaceDecoder.jsData).equal('"back \bspace"')
            expect(unicodeCharsDecoder.jsData).equal('"\u1234"')
        })
        it('errors on unbalanced quotes', function () {
            const noClosingQuote = '"no closing quote'
            const noOpeningQuote = 'hello world"'
            const justAQuote = '"'

            const noClosingQuoteDecoder = new Decoder(noClosingQuote)
            const noOpeningQuoteDecoder = new Decoder(noOpeningQuote)
            const justAQuoteDecoder = new Decoder(justAQuote)

            expect(noClosingQuoteDecoder.jsData).instanceOf(Error)
            expect(noOpeningQuoteDecoder.jsData).instanceOf(Error)
            expect(justAQuoteDecoder.jsData).instanceOf(Error)
        })
    })
})