import * as log from 'loglevel'
import { createAction } from 'redux-actions'

const start   = createAction('Scoreboard:get:start')
const success = createAction('Scoreboard:get:success')
const failure = createAction('Scoreboard:get:failure')

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

export default (subject) => {
  return async (dispatch, getState) => {
    dispatch(start())

    const state = getState()

    const quizEntry = state.app.quizEntry.asMutable()

    const result = await fetch(`/api/QuizEntries/scoreboard`)

    dispatch(success())
  }
}
