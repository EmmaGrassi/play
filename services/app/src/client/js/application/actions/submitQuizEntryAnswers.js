import { createAction } from 'redux-actions'

const start   = createAction('QuizEntry:answers:save:start')
const success = createAction('QuizEntry:answers:save:success')
const failure = createAction('QuizEntry:answers:save:failure')

function headers(options) {
  return Object.assign({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }, options)
}

async function postRequest(url, body) {
  return await fetch(url, {
    method: 'post',
    headers: headers(),
    body: JSON.stringify(body)
  })
}

async function postAnswers(id, answers) {
  return await postRequest(`/api/QuizEntries/answers`, {
    id,
    answers
  })
}

export default () => {
  return async (dispatch, getState) => {
    dispatch(start())

    const state = getState()
    const quizEntry = state.app.quizEntry.asMutable()

    delete quizEntry.currentQuestion
    delete quizEntry.unansweredQuestions

    await postAnswers(quizEntry.id, quizEntry.answers)

    dispatch(success())
  }
}
