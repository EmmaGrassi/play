import * as log from 'loglevel'
import React from 'react'
import { connect } from 'react-redux'

import getQuiz from '../actions/getQuiz'

@connect(
  (state) => {
    return {
      quizEntry: state.app.quizEntry,
    }
  },

  (dispatch, props, x, y) => {
    return {
      getQuiz: (subject) => {
        dispatch(getQuiz(subject))
      }
    }
  },
)
export default class Quiz extends React.Component {
  componentWillMount() {
    if (!this.props.quizEntry.id) {
      this.props.history.replace('/')
      return
    }

    this.props.getQuiz(this.props.quizEntry.subject)
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          QUIZ
        </div>
      </div>
    )
  }
}
