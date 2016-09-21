import React from 'react'
import * as log from 'loglevel'

export default class App extends React.Component {
  constructor(options) {
    log.debug('App#constructor', options)

    super(options);
  }

  render() {
    log.debug('App#render')

    return (
      <h1>WHAT JA MAN12345</h1>
    )
  }
}
