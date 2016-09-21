import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as log from 'loglevel'

import app from './app'

export default {
  app,
  routing: routerReducer,
}
