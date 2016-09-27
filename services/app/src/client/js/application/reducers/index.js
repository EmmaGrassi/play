import { routerReducer } from 'react-router-redux'
import * as log from 'loglevel'

import initialize from './initialize'
import quiz from './quiz'
import quizEntry from './quizEntry'

export default {
  initialize,
  quiz: quiz,
  quizEntry: quizEntry,
  routing: routerReducer,
}
