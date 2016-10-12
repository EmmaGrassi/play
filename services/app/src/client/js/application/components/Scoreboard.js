import React from 'react'
import { connect } from 'react-redux'

import Spinner from 'halogen/PulseLoader'

import submitQuizEntryAnswers from '../actions/submitQuizEntryAnswers'
import getScoreboardScores from '../actions/getScoreboardScores'

@connect(
  (state) => {
    return {}
  },
  (dispatch, props) => {
    return {
      getScores: () => {
        dispatch(submitQuizEntryAnswers())
        dispatch(getScoreboardScores())
      },
    }
  }
)
export default class Scoreboard extends React.Component {
  componentWillMount() {
    this.props.getScores()
  }

  renderMessage() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>Score</strong>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                Thank you for playing the quiz.
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderScore() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>Score</strong>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <Spinner color="#FF6600" />
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
        {this.renderScore()}
      </div>
    )
  }
}
