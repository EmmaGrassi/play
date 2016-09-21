import * as log from 'loglevel'

const initialState = {
  foo: 'bar'
}

export default (state = initialState, action) => {
  log.debug('reducers/app', action, state)

  return state
}
