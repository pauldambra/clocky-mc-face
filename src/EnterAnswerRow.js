import React from 'react'

const numberFromInput = selector =>
  parseInt(document.querySelector(selector).value, 10)

export const AnswerInput = ({ answer, answerIsCorrect, includeSeconds, handleChange, showRow }) => {
  const showWhenWrong = () =>
    answerIsCorrect == null || answerIsCorrect ? 'none' : ''

  React.useLayoutEffect(() => {
    document.querySelector('#answer-row input#hours').focus()
  }, [])

  const onChange = (e) => {
    handleChange({
      hours: numberFromInput('#hours'),
      minutes: numberFromInput('#minutes'),
      seconds: includeSeconds && numberFromInput('#seconds')
    })
  }

  return (
    <div
      id='answer-row' className='row'
      style={{ display: showRow }}
    >
      The time is: <br />
      <input
        type='number' max='12' min='0' step='1'
        id='hours'
        value={answer.hours} onChange={onChange}
      />&nbsp;:&nbsp;
      <input
        type='number' max='59' min='0' step='1'
        id='minutes'
        value={answer.minutes} onChange={onChange}
      />
      {includeSeconds && <span>&nbsp;:&nbsp;</span>}
      {
        includeSeconds &&
          <input
            type='number' max='59' min='0' step='1'
            id='seconds'
            value={answer.seconds} onChange={onChange}
          />
      }
      <div className='mark-holder'>
        <span className='cross' style={{ display: showWhenWrong() }}>✘</span>
      </div>
    </div>
  )
}
