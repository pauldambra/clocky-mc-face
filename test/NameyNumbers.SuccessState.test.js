import React from 'react'
import { act, render } from '@testing-library/react'
import NameyNumbers from '../src/NameyNumbers'
import * as question from '../src/question'
import { fireEvent } from '@testing-library/dom'
import { describe, expect, it, jest, beforeAll, beforeEach } from '@jest/globals'

import {
  toHaveStyle, toHaveAttribute
} from '@testing-library/jest-dom/matchers'

import * as catGifs from '../src/cat-gifs'

expect.extend({ toHaveStyle, toHaveAttribute })

describe('namey numbers success state', function () {
  let addCatImageSpy
  let expectedQuestion
  let container

  beforeAll(() => {
    addCatImageSpy = jest.spyOn(catGifs, 'addCatImage')
      .mockImplementation((element) => {
        const img = document.createElement('img')
        img.src = 'my test url'
        element.appendChild(img)
      })

  })

  beforeEach(() => {
    act(() => {
      ({ container } = render(<NameyNumbers />))

      const input = container.querySelector('#answer-row input')
      expectedQuestion = question.read()
      const correctAnswer = expectedQuestion.numerals
      fireEvent.change(input, { target: { value: correctAnswer } })
      fireEvent.click(container.querySelector('#done button'))

      expectedQuestion = question.read() // get newly updated question
    })
  })

  it('calls for a cat image twice once on render and once after correct answer', function () {
    expect(addCatImageSpy).toHaveBeenCalledTimes(2)
  })

  it('shows the success message when the answer is correct', function () {
    const doneRow = container.querySelector('#done')
    const message = container.querySelector('#done .result')
    const catGif = container.querySelector('#cat-gif img')

    expect(doneRow).not.toHaveAttribute('display', 'none')
    expect(message.textContent)
      .toEqual(`Yes! ${expectedQuestion.words} says ${expectedQuestion.numerals}`)
    expect(catGif).not.toBeNull()
    expect(catGif).not.toHaveAttribute('src', '')
  })

  it('changes the cat gif when answer is correct', function () {
    const catGif = container.querySelector('#cat-gif img')

    expect(catGif).not.toBeNull()
    expect(catGif).toHaveAttribute('src', 'my test url')
  })

  it("the 'awesome, again' button resets the page", function () {
    const questionRow = container.querySelector('#question-row')
    const answerRow = container.querySelector('#answer-row')
    const done = container.querySelector('#done')
    const cross = container.querySelector('.cross')
    const catGif = container.querySelector('#cat-gif')
    const catGifImg = catGif.querySelector('img')

    expect(questionRow).not.toHaveStyle('display: none')
    expect(answerRow).not.toHaveStyle('display: none')
    expect(done).toHaveStyle('display: none')
    expect(cross).toHaveStyle('display: none')
    expect(catGifImg).not.toBeNull()
    expect(catGifImg).toHaveAttribute('src', 'my test url')
  })
})
