import * as log from 'loglevel'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Router as ReactRouter, Route, hashHistory } from 'react-router'

import App from './components/App'

class Root extends React.Component {
  constructor(options) {
    log.debug('Root#constructor')

    super(options)
  }

  render() {
    log.debug('Root#render')

    return (
      <ReactRouter history={this.props.history}>
        <Route path="/" component={App}/>
      </ReactRouter>
    )
  }
}

export default function applicationRouter({ store, history }) {
  return (
    <AppContainer>
      <Root store={store} history={history}/>
    </AppContainer>
  )
}
