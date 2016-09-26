import React from 'react'
import * as log from 'loglevel'

import Header from '../Header'
import PersonForm from '../PersonForm'

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header/>
        <PersonForm/>
      </div>
    )
  }
}
