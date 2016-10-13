import { createAction } from 'redux-actions'

const endQuizEntry = createAction('QuizEntry:end')

export default () => {
  return async (dispatch, getState) => {
    dispatch(endQuizEntry())

    //dispatch(submitQuizEntryAnswers())
    //dispatch(hashHistory.push('/scoreboard'))
  }
}

