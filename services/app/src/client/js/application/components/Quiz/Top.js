import React from 'react'

import Timer from './Timer'

export default class Top extends React.Component {
  renderInitial() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>Quiz</strong>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <p>
                  When you press start, the game will start. Answer as many questions correctly as you can before the
                  time runs out!
                </p>

                <center>
                  <button type="button" className="btn btn-primary" onClick={this.props.start}>
                    Start
                  </button>
                </center>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStarted() {
    const {
      timeLeft,
      totalTime
    } = this.props

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>Quiz</strong>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <Timer
                  timeLeft={timeLeft}
                  totalTime={totalTime}
                />
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { quizEntry } = this.props

    if (quizEntry && quizEntry.started) {
      return this.renderStarted()
    } else {
      return this.renderInitial()
    }
  }
}
