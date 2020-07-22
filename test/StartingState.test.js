import React from 'react'
import { render } from '@testing-library/react'
import ClockyMcFace from '../src/ClockyMcFace'
import {
  toHaveStyle, toHaveAttribute, toHaveTextContent
} from '@testing-library/jest-dom/matchers'
import * as question from '../src/question.js'

import { describe, expect, it, jest } from '@jest/globals'
expect.extend({ toHaveStyle, toHaveAttribute, toHaveTextContent })

jest.mock('../src/question')

describe('starting state', function () {
  it('starts with a clock visible', function () {
    question.read.mockImplementation(() => ({ hours: 3, minutes: 6, seconds: 9 }))

    const { container } = render(<ClockyMcFace />)

    const questionRow = container.querySelector('#question-row')
    const hours = container.querySelector('#question-row #hours')
    const minutes = container.querySelector('#question-row #minutes')
    const seconds = container.querySelector('#question-row #seconds')

    expect(questionRow).not.toHaveStyle('display: none')
    expect(hours).toHaveStyle('transform: rotateZ(93deg)')
    expect(minutes).toHaveStyle('transform: rotateZ(36deg)')
    expect(seconds).toHaveStyle('transform: rotateZ(64deg)')
  })

  it('starts with answer input visible', function () {
    const { container } = render(<ClockyMcFace />)

    const answerRow = container.querySelector('#answer-row')

    expect(answerRow).not.toHaveStyle('display: none')
  })

  it('starts with cross hidden', function () {
    const { container } = render(<ClockyMcFace />)

    const cross = container.querySelector('.cross')

    expect(cross).toHaveStyle('display: none')
  })

  it('success view starts off hidden', function () {
    const { container } = render(<ClockyMcFace />)
    const done = container.querySelector('#done')
    expect(done).toHaveStyle('display: none')
  })
})
