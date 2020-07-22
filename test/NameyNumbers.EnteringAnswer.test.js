import React from 'react'
import { render } from '@testing-library/react'
import ClockyMcFace from '../src/ClockyMcFace'
import {
  toHaveStyle, toHaveAttribute
} from '@testing-library/jest-dom/matchers'
import * as question from '../src/question'
import { fireEvent } from '@testing-library/dom'

import { describe, expect, it } from '@jest/globals'

expect.extend({ toHaveStyle, toHaveAttribute })

const enterCorrectAnswer = container => {
  const correctAnswer = question.read()

  const hours = container.querySelector('#answer-row input#hours')
  const minutes = container.querySelector('#answer-row input#minutes')
  const seconds = container.querySelector('#answer-row input#seconds')

  fireEvent.change(hours, { target: { value: correctAnswer.hours } })
  fireEvent.change(minutes, { target: { value: correctAnswer.minutes } })
  fireEvent.change(seconds, { target: { value: correctAnswer.seconds } })
}

describe('clocky mcface entering answers', function () {
  it('shows cross if incorrect answer entered', function () {
    const { container } = render(<ClockyMcFace />)

    const input = container.querySelector('#answer-row input#hours')
    const incorrectAnswer = question.read().hours + 1

    fireEvent.change(input, { target: { value: incorrectAnswer } })

    const cross = container.querySelector('.cross')

    expect(cross).not.toHaveStyle('display: none')
  })

  it('shows success view on correct answer', function () {
    const { container } = render(<ClockyMcFace />)
    const done = container.querySelector('#done')

    enterCorrectAnswer(container)

    expect(done).not.toHaveStyle('display: none')
  })

  it('hides question and answer views on correct answer', function () {
    const { container } = render(<ClockyMcFace />)
    const questionRow = container.querySelector('#question-row')
    const answerRow = container.querySelector('#answer-row')

    enterCorrectAnswer(container)

    expect(questionRow).toHaveStyle('display: none')
    expect(answerRow).toHaveStyle('display: none')
  })
})
