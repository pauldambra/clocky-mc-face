import React from 'react'

export const AnswerInput = ({ answer, answerIsCorrect, handleChange, showRow }) => {
  const showWhenWrong = () =>
    answerIsCorrect == null || answerIsCorrect ? 'none' : ''

  React.useLayoutEffect(() => {
    document.querySelector('#answer-row input').focus()
  })

  return (
    <div
      id='answer-row' className='row'
      style={{ display: showRow }}
    >
      In numerals this says:
      <input
        type='number' max='9999' min='0' step='1'
        value={answer} onChange={handleChange}
      />
      <div className='mark-holder'>
        <span className='cross' style={{ display: showWhenWrong() }}>✘</span>
      </div>
    </div>
  )
}
