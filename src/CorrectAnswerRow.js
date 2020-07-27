import { RandomCatGif } from './RandomCatGif'
import React from 'react'

export const CorrectAnswer = ({ question, shouldDisplay, resetPage }) => {
  return (
    <div id='done' className='row' style={{ display: shouldDisplay }}>
      <div className='result done-row'>
        Yes! The time was {question.hours.toString().padStart(2, '0')}:{question.minutes.toString().padStart(2, '0')}:{question.seconds.toString().padStart(2, '0')}
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
