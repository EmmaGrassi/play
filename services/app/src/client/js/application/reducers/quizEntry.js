import I from 'seamless-immutable'
import * as log from 'loglevel'

// This reducer keeps application initialization state.
const initialState = I({
  contact: null,
  email: null,
  firstName: null,
  github: null,
  id: null,
  into: {
    clojure: null,
    java: null,
    node: null,
    python: null,
    ruby: null,
    scala: null,
  },
  lastName: null,
  startTime: null,
  subject: null,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'QuizEntry:set':
      return state.merge(action.payload)

    default:
      return state
  }
}
