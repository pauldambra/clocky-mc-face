import { RandomCatGif } from './RandomCatGif'
import React from 'react'

export const CorrectAnswer = ({ question, shouldDisplay, resetPage }) => {
  return (
    <div id='done' className='row' style={{ display: shouldDisplay }}>
      <div className='result done-row'>
        Yes! The time was {question.hours}:{question.minutes}:{question.seconds}
      </div>
      <div className='done-row'>
        <button onClick={resetPage}>
          Awesome, Again?
        </button>
      </div>
      <RandomCatGif question={question} />
    </div>
  )
}
