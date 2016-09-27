import { routerReducer } from 'react-router-redux'
import * as log from 'loglevel'

import initialize from './initialize'

export default {
  initialize,
  routing: routerReducer,
}
