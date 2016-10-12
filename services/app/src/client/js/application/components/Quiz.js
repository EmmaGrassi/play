import * as log from 'loglevel'
import React from 'react'
import { connect } from 'react-redux'

import getQuiz from '../actions/getQuiz'
import startQuizEntry from '../actions/startQuizEntry'
import endQuizEntry from '../actions/endQuizEntry'
import tickQuizEntry from '../actions/tickQuizEntry'
import answerQuizEntryQuestion from '../actions/answerQuizEntryQuestion'
import setNewQuizEntryQuestion from '../actions/setNewQuizEntryQuestion'

import QuizTop from './QuizTop'
import QuizQuestion from './QuizQuestion'
import Scoreboard from './Scoreboard'

import Spinner from './Spinner'

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

  setTickInterval() {
    this.tickInterval = setInterval(this.tick.bind(this), this.tickIntervalTime)
  }

  clearTickInterval() {
    clearInterval(this.tickInterval)
  }

  componentWillMount() {
    if (!this.props.quizEntry.id) {
      this.props.history.replace('/')
      return
    }

    this.props.getQuiz(this.props.quizEntry.subject)
  }

  componentWillUnmount() {
    this.clearTickInterval()
  }

  start() {
    this.props.startQuizEntry()
    this.props.setNewQuizEntryQuestion()
    this.setTickInterval()
  }

  end() {
    this.props.endQuizEntry()
    this.clearTickInterval()
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

  render() {
    const {
      quiz,
      quizEntry
    } = this.props

    const wrapper = (x) => <div
      style={{
        paddingTop: '30px'
      }}
    >
      {x}
    </div>

    if (!quiz.id) {
      return <Spinner color="#ff0000"/>
    }

    if (quizEntry.ended) {
      return wrapper(
        <Scoreboard/>
      )
    }

    if (quizEntry.started) {
      return wrapper(
        <div>
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

    return wrapper(
      <QuizTop
        quiz={quiz}
        quizEntry={quizEntry}
        start={this.start.bind(this)}
        timeLeft={this.state.timeLeft}
        totalTime={this.totalTime}
      />
    )
  }
}
