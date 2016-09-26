import { createAction } from 'redux-actions'

const start = createAction('personForm:submit:start')
const success = createAction('personForm:submit:success')
const failure = createAction('personForm:submit:failure')

export default () => {
  return (dispatch) => {
    dispatch(start())
    debugger
  }
}
