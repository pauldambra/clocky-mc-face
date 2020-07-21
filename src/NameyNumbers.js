import React from 'react'
import * as question from './question'
import { QuestionRow } from './QuestionRow'
import { AnswerInput } from './EnterAnswerRow'
import { CorrectAnswer } from './CorrectAnswerRow'

const NameyNumbers = () => {
  const [answer, setAnswer] = React.useState('')
  const [answerIsCorrect, setAnswerIsCorrect] = React.useState(null)
  const [q, setQuestion] = React.useState(question.read())

  const handleChange = event => {
    const inputValue = event.target.value
    setAnswer(inputValue)
    const providedAnswer = parseInt(inputValue, 10)
    setAnswerIsCorrect(question.checkAnswer(providedAnswer))
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
        words={q.words}
        showRow={hideWhenCorrect()}
      />
      <AnswerInput
        answer={answer}
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

export default NameyNumbers
