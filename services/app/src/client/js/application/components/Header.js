import * as log from 'loglevel'
import React from 'react'
import { connect } from 'react-redux'

@connect(
  () => { return {} },
  () => { return {} },
)
export default class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          Dev Quiz
        </div>
      </div>
    )
  }
}
