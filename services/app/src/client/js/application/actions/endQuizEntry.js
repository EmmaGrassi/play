import { createAction } from 'redux-actions'
import { hashHistory } from 'react-router'

import submitQuizEntryAnswers from './submitQuizEntryAnswers'

export default () => {
  return async (dispatch, getState) => {
    submitQuizEntryAnswers()

    //dispatch(hashHistory.push('/scoreboard'))

    debugger
  }
}

