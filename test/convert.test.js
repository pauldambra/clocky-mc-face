import { describe, expect, it } from '@jest/globals'
import { numeralsToWords } from '../src/convert'

describe('converting from numerals to words', () => {
  [
    { numerals: 1, words: 'one' },
    { numerals: 6, words: 'six' },
    { numerals: 16, words: 'sixteen' },
    { numerals: 627, words: 'six hundred twenty-seven' },
    { numerals: 4036, words: 'four thousand thirty-six' },
    { numerals: 92342, words: 'ninety-two thousand three hundred forty-two' }
  ].forEach(x => {
    it(`converts ${x.numerals} to ${x.words}`, () => {
      expect(numeralsToWords(x.numerals)).toEqual(x.words)
    })
  })
})
