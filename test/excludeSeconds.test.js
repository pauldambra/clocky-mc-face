
import React from 'react'
import { act, render } from '@testing-library/react'
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

  console.log({entering: correctAnswer})

  act(() => {
    fireEvent.change(hours, { target: { value: correctAnswer.hours } })
    fireEvent.change(minutes, { target: { value: correctAnswer.minutes } })
  })
}

describe('can choose not to include seconds', function () {
  it('there is a checkbox which starts off not ticked', function () {
    const { container } = render(<ClockyMcFace />)

    const input = container.querySelector('#difficulty input')

    expect(input.checked).toEqual(false)
  })

  it("when the checkbox is unchecked the seconds hand is not visible", () => {
    const { container } = render(<ClockyMcFace />)

    const secondsHand = container.querySelector(".seconds-container")
    expect(secondsHand).toBeNull();
  })

  it("when the checkbox is unchecked the seconds answer input is not visible", () => {

    const { container } = render(<ClockyMcFace />)

    const secondsAnswerInput = container.querySelector("#answer-row #seconds")
    expect(secondsAnswerInput).toBeNull();
  })

  it("when the checkbox is unchecked the question can still be answered", () => {
    const { container } = render(<ClockyMcFace />)
    const doneRow = container.querySelector('#done')

    expect(doneRow).toHaveStyle('display: none')

    act(() => {
      enterCorrectAnswer(container)
    })

    expect(doneRow).not.toHaveStyle('display: none')
  })

  it("when excluding seconds the success message doesn't report seconds", () => {
    const { container } = render(<ClockyMcFace />)
    const expectedQuestion = question.read()

    act(() => {
      enterCorrectAnswer(container)
    })

    const message = container.querySelector('#done .result')
    expect(message.textContent)
      .toEqual(`Yes! The time was ${expectedQuestion.hours.toString().padStart(2, '0')}:${expectedQuestion.minutes.toString().padStart(2, '0')}`)
  })


})
