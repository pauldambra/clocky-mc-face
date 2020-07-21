import React from 'react'
import { render } from '@testing-library/react'
import NameyNumbers from '../src/NameyNumbers'
import {
  toHaveStyle, toHaveAttribute, toHaveTextContent
} from '@testing-library/jest-dom/matchers'
import * as question from '../src/question'

import { describe, expect, it } from '@jest/globals'
expect.extend({ toHaveStyle, toHaveAttribute, toHaveTextContent })

describe('namey numbers starting state', function () {
  it('starts with a question visible', function () {
    const expectedQuestion = question.read()

    const { container } = render(<NameyNumbers />)

    const questionRow = container.querySelector('#question-row')

    expect(questionRow).not.toHaveStyle('display: none')
    expect(questionRow)
      .toHaveTextContent(`Your number is ${expectedQuestion.words}`)
  })

  it('starts with answer input visible', function () {
    const { container } = render(<NameyNumbers />)

    const answerRow = container.querySelector('#answer-row')

    expect(answerRow).not.toHaveStyle('display: none')
  })

  it('starts with cross hidden', function () {
    const { container } = render(<NameyNumbers />)

    const cross = container.querySelector('.cross')

    expect(cross).toHaveStyle('display: none')
  })

  it('success view starts off hidden', function () {
    const { container } = render(<NameyNumbers />)
    const done = container.querySelector('#done')
    expect(done).toHaveStyle('display: none')
  })
})
