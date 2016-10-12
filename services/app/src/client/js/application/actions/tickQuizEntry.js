import { createAction } from 'redux-actions'

export default createAction('QuizEntry:tick', (amount = 1000) => {
  return {
    reductionAmount: amount
  }
})
