import * as log from 'loglevel'
import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import getQuiz from '../actions/getQuiz'
import startQuizEntry from '../actions/startQuizEntry'
import endQuizEntry from '../actions/endQuizEntry'
import tickQuizEntry from '../actions/tickQuizEntry'
import answerQuizEntryQuestion from '../actions/answerQuizEntryQuestion'
import setNewQuizEntryQuestion from '../actions/setNewQuizEntryQuestion'
import submitQuizEntryAnswers from '../actions/submitQuizEntryAnswers'

import QuizTop from './QuizTop'
import QuizQuestion from './QuizQuestion'

@connect(
  (state) => {
    return {
      quiz: state.app.quiz,
      quizEntry: state.app.quizEntry,
    }
  },

  (dispatch, props) => {
    return {
      startQuizEntry: () => {
        dispatch(startQuizEntry())
      },

      endQuizEntry: () => {
        dispatch(endQuizEntry())
        dispatch(submitQuizEntryAnswers())
        dispatch(hashHistory.push('/scoreboard'))
      },

      answerQuizEntryQuestion: (index) => {
        dispatch(answerQuizEntryQuestion(index))
        dispatch(setNewQuizEntryQuestion())
      },

      setNewQuizEntryQuestion: () => {
        dispatch(setNewQuizEntryQuestion())
      },

      getQuiz: (subject) => {
        dispatch(getQuiz(subject))
      }
    }
  },
)
export default class Quiz extends React.Component {
  constructor(options) {
    super(options)

    // Not sure whether I should put these in this.state. Guess not.
    this.tickInterval = null
    this.tickIntervalTime = 10

    // TODO: Move to redux
    this.totalTime = 15 * 1000

    this.state = {
      timeLeft: this.totalTime,
    }
  }

  componentWillMount() {
    if (!this.props.quizEntry.id) {
      this.props.history.replace('/')
      return
    }

    this.props.getQuiz(this.props.quizEntry.subject)
  }

  componentWillReceiveProps(props) {
    // When the last question has been entered or the time runs out, end the test.
    if (props.quizEntry.ended) {
      this.end()
      return
    }
  }

  componentWillUnmount() {
    this.clearTickInterval()
  }

  setTickInterval() {
    this.tickInterval = setInterval(this.tick.bind(this), this.tickIntervalTime)
  }

  clearTickInterval() {
    clearInterval(this.tickInterval)
  }

  start() {
    this.props.startQuizEntry()
    this.props.setNewQuizEntryQuestion()
    this.setTickInterval()
  }

  end() {
    this.clearTickInterval()
    this.props.endQuizEntry()
  }

  tick() {
    const { timeLeft } = this.state

    if (timeLeft > 0) {
      this.setState({
        timeLeft: timeLeft - this.tickIntervalTime
      })
    } else {
      this.setState({
        timeLeft: 0
      })

      this.end()
    }
  }

  renderLoadingState() {
    return null
  }

  renderInitialState() {
    const {
      quiz,
      quizEntry
    } = this.props

    return (
      <div style={{ paddingTop: '30px' }}>
        <QuizTop
          quiz={quiz}
          quizEntry={quizEntry}
          start={this.start.bind(this)}
          timeLeft={this.state.timeLeft}
          totalTime={this.totalTime}
        />
      </div>
    )
  }

  renderStartedState() {
    const {
      quiz,
      quizEntry
    } = this.props

    return (
      <div style={{ paddingTop: '30px' }}>
        <QuizTop
          quiz={quiz}
          quizEntry={quizEntry}
          start={this.start.bind(this)}
          timeLeft={this.state.timeLeft}
          totalTime={this.totalTime}
        />
        <QuizQuestion
          quiz={quiz}
          quizEntry={quizEntry}
          answerQuizEntryQuestion={this.props.answerQuizEntryQuestion}
        />
      </div>
    )
  }

  render() {
    const { quizEntry } = this.props

    // TODO: This ever happens?
    //if (!quiz.id) {
    //  return this.renderLoadingState()
    //}

    if (quizEntry.started) {
      return this.renderStartedState()
    }

    return this.renderInitialState()
  }
}
