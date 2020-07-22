import * as question from '../src/question'
import { describe, expect, it } from '@jest/globals'

describe('a question', function () {
  it('has values before explicit initialisation', function () {
    const x = question.read()
    expect(x.hours).toBeDefined()
    expect(x.minutes).toBeDefined()
    expect(x.seconds).toBeDefined()
  })

  it('changes values when next question is triggered', function () {
    const before = question.read()
    question.triggerNext()
    const after = question.read()
    expect(before).not.toEqual(after)
  })

  it('can be checked with the wrong answer', function () {
    question.triggerNext()
    const x = question.read()
    expect(question.checkAnswer(x.seconds, x.seconds, x.seconds)).not.toBeTruthy()
  })

  it('can be checked with the right answer', function () {
    question.triggerNext()
    const x = question.read()
    expect(question.checkAnswer(x.hours, x.minutes, x.seconds)).toBeTruthy()
  })
})
