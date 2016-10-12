import * as log from 'loglevel'
import { createAction } from 'redux-actions'

const start   = createAction('Quiz:get:start')
const success = createAction('Quiz:get:success')
const failure = createAction('Quiz:get:failure')

export default (subject) => {
  return async (dispatch, ...args) => {
    dispatch(start())

    const quizResponse = await fetch(`/api/Quizzes?filter[where][subject]=${subject}`)
    const [ quiz ] = await quizResponse.json()
    const quizQuestionsResponse = await fetch(`/api/Questions?filter[where][quizId]=${quiz.id}&filter[include][options]`)

    quiz.questions = await quizQuestionsResponse.json()

    dispatch(success(quiz))
  }
}
