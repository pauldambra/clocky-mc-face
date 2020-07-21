import { numeralsToWords } from './convert'

const nextRandom = () => Math.floor(Math.random() * 999) + 1

let numerals = nextRandom()
let words = numeralsToWords(numerals)

export const triggerNext = () => {
  numerals = nextRandom()
  words = numeralsToWords(numerals)
  return read()
}

export const checkAnswer = (a) => a === numerals
export const read = () => ({ words, numerals })
