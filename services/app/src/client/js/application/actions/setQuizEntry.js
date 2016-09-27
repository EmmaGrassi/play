import { createAction } from 'redux-actions'

const setQuizEntry = createAction('QuizEntry:set')

export default createAction('QuizEntry:set', (data) => {
  return data
})
