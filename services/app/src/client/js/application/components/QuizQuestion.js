import React from 'react'
import * as log from 'loglevel'
import { connect } from 'react-redux'

@connect(
  () => { return {} },
  () => { return {} },
)
export default class QuizQuestion extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          QUIZQUESTION
        </div>
      </div>
    )
  }
}
