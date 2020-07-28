import React from 'react'
import * as question from './question'
import { QuestionRow } from './QuestionRow'
import { AnswerInput } from './EnterAnswerRow'
import { CorrectAnswer } from './CorrectAnswerRow'

const ClockyMcFace = () => {
  const [answer, setAnswer] = React.useState({
    hours: '',
    minutes: '',
    seconds: ''
  })
  const [answerIsCorrect, setAnswerIsCorrect] = React.useState(null)
  const [q, setQuestion] = React.useState(question.read())
  const [includeSeconds, setIncludeQuestions] = React.useState(true)

  const handleAnswerChange = (answer) => {
    setAnswer(answer)
    setAnswerIsCorrect(question.checkAnswer(answer, includeSeconds))
  }

  const showWhenCorrect = () =>
    answerIsCorrect == null || !answerIsCorrect ? 'none' : ''

  const hideWhenCorrect = () =>
    answerIsCorrect == null || !answerIsCorrect ? '' : 'none'

  const resetPage = () => {
    const newQuestion = question.triggerNext()
    setQuestion(newQuestion)
    setAnswer({ hours: '', minutes: '', seconds: '' })
    setAnswerIsCorrect(null)
  }

  const includeSecondsChanged = (e) => {
    setIncludeQuestions(e.target.checked)
  }

  return (
    <div>
      <QuestionRow
        hours={q.hours}
        minutes={q.minutes}
        seconds={q.seconds}
        includeSeconds={includeSeconds}
        showRow={hideWhenCorrect()}
      />
      <AnswerInput
        answer={answer}
        answerIsCorrect={answerIsCorrect}
        includeSeconds={includeSeconds}
        showRow={hideWhenCorrect()}
        handleChange={handleAnswerChange}
      />
      <CorrectAnswer
        question={q}
        includeSeconds={includeSeconds}
        shouldDisplay={showWhenCorrect()}
        resetPage={resetPage}
      />
      <div id='difficulty' className='row'>
        <label htmlFor='include-seconds'>
          Include seconds in the question?
          <input type='checkbox' name='include-seconds' checked={includeSeconds} onChange={includeSecondsChanged} />
        </label>
      </div>
    </div>
  )
}

export default ClockyMcFace
