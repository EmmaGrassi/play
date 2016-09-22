import * as log from 'loglevel'
import React from 'react'
//import { AppContainer } from 'react-hot-loader'
import { Router as ReactRouter, Route, hashHistory } from 'react-router'

import App from './components/App'

export default function applicationRouter({ store, history }) {
  log.debug('applicationRouter', store, history)

  return (
    <ReactRouter history={hashHistory}>
      <Route path="/" component={App}/>
    </ReactRouter>
  )
}
