import * as log from 'loglevel'
import React from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import PersonForm from './PersonForm'

@connect(
  () => { return {} },
  () => { return {} },
)
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
