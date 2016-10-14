import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import getScoreboardScores from '../actions/getScoreboard'

@connect(
  (state) => {
    return {
      scoreBoard: state.app.scoreBoard
    }
  },
  (dispatch, props) => {
    return {
      getScores: () => {
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
              <strong>Quiz Ended!</strong>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                Thank you for playing the quiz. You can find your score below.
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderScores(scores) {
    const keys = _.keys(scores).sort().reverse()

    const rows = _.map(keys, (i, j) => {
      const v = scores[i]

      return _.map(v, (person, n) => {
        let number = ''

        if (n === 0) {
          number = j + 1
        }

        return (
          <tr>
            <td>{number}</td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.score}</td>
          </tr>
        )
      })
    })

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>Scoreboard</strong>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFetchedState() {
    const { scores } = this.props.scoreBoard

    return (
      <div style={{ paddingTop: '30px' }}>
        {this.renderMessage()}
        {this.renderScores(scores)}
      </div>
    )
  }

  renderLoadingState() {
    return null
  }

  render() {
    const {
      fetching,
      fetched,
    } = this.props.scoreBoard

    if (fetched) {
      return this.renderFetchedState()
    }

    if (fetching) {
      return this.renderLoadingState()
    }

    return this.renderLoadingState()
  }
}
