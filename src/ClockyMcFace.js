import React from 'react'
import * as question from './question'
import { QuestionRow } from './QuestionRow'
import { AnswerInput } from './EnterAnswerRow'
import { CorrectAnswer } from './CorrectAnswerRow'

const ClockyMcFace = () => {
  const [answer, setAnswer] = React.useState({ hours: '', minutes: '', seconds: '' })
  const [answerIsCorrect, setAnswerIsCorrect] = React.useState(null)
  const [q, setQuestion] = React.useState(question.read())

  const handleChange = (answer) => {
    setAnswer(answer)
    setAnswerIsCorrect(question.checkAnswer(answer))
  }

  const showWhenCorrect = () =>
    answerIsCorrect == null || !answerIsCorrect ? 'none' : ''

  const hideWhenCorrect = () =>
    answerIsCorrect == null || !answerIsCorrect ? '' : 'none'

  const resetPage = () => {
    const newQuestion = question.triggerNext()
    setQuestion(newQuestion)
    setAnswer('')
    setAnswerIsCorrect(null)
  }

  return (
    <div>
      <QuestionRow
        hours={q.hours}
        minutes={q.minutes}
        seconds={q.seconds}
        showRow={hideWhenCorrect()}
      />
      <AnswerInput
        hours={answer.hours}
        minutes={answer.minutes}
        seconds={answer.seconds}
        answerIsCorrect={answerIsCorrect}
        showRow={hideWhenCorrect()}
        handleChange={handleChange}
      />
      <CorrectAnswer
        question={q}
        shouldDisplay={showWhenCorrect()}
        resetPage={resetPage}
      />
    </div>)
}

export default ClockyMcFace
