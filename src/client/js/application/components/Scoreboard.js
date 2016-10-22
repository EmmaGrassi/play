import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import getScoreboardScores from '../actions/getScoreboard'

import Spinner from './Spinner'

@connect(
  (state) => {
    return {
      quizEntry: state.app.quizEntry,
      scoreBoard: state.app.scoreBoard,
    }
  },
  (dispatch, props) => {
    return {
      getScoreboardScores: () => {
        dispatch(getScoreboardScores())
      },

      redirectToIndex: () => {
        hashHistory.push(`/`)
      },
    }
  }
)
export default class Scoreboard extends React.Component {
  componentWillMount() {
    this.props.getScoreboardScores()
  }

  componentDidMount() {
    // If there was a quiz entry
    if (this.props.quizEntry.completed) {
      setTimeout(() => {
        const [ rowElement ] = document.getElementsByClassName(this.props.quizEntry.id)

        if (rowElement) {
          rowElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 10)

      // After 20 seconds, redirect to the index route.
      // TODO: Provided a button instead.
      //setTimeout(this.props.redirectToIndex, 1000 * 20)
    } else {
      // Every 5 seconds, update the scores.
      setInterval(this.props.getScoreboardScores, 1000 * 5)
    }
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
                <p>
                  Thank you for playing the quiz. You can find your score below or you can <a href="#/">try again</a>.
                </p>
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
        let rowClass = `${person.id}`

        if (person.email === this.props.quizEntry.email) {
          rowClass = `${rowClass} table-info`
        }

        const number = j + 1

        return (
          <tr className={rowClass}>
            <td>{number}</td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.subject}</td>
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
                <table className="table">
                  <thead className="thead-default">
                    <tr>
                      <th>Place</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Subject</th>
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

  render() {
    const { scores } = this.props.scoreBoard

    let message

    if (this.props.quizEntry.completed) {
      message = this.renderMessage()
    }

    return (
      <div style={{ paddingTop: '30px' }}>
        {message}
        {this.renderScores(scores)}
      </div>
    )
  }
}
