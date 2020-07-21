import React from 'react'

export const QuestionRow = ({ words, showRow }) => {
  return (
    <div
      id='question-row' className='row'
      style={{ display: showRow }}
    >
      Your number is {words}
    </div>
  )
}
