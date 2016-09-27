import { createAction } from 'redux-actions'

const initializeStart = createAction('PersonForm:submit:start')
const initializeSuccess = createAction('PersonForm:submit:success')
const initializeSuccess = createAction('PersonForm:submit:error')

export default () => {
  return (dispatch) => {
    dispatch(initializeStart())

    // TODO: Initializy things.

    dispatch(initializeSuccess())
  }
}
