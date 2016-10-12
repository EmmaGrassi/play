import React from 'react'

export default class QuizTimer extends React.Component {
  render() {
    const { timeLeft, totalTime } = this.props

    let timeNumber = Math.ceil(timeLeft / 100) / 10
    if (timeNumber % 1 === 0) {
      timeNumber = `${timeNumber}.0`
    }

    let progressClass = 'progress progress-striped'
    if (timeLeft <= 10000) {
      progressClass = 'progress progress-striped progress-warning'
    }
    if (timeLeft <= 5000) {
      progressClass = 'progress progress-striped progress-danger'
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-11">
            <progress
              className={progressClass}
              max={totalTime}
              value={totalTime - timeLeft}
              style={{
                marginTop: '4px'
              }}
            />
          </div>
          <div className="col-md-1">
            {timeNumber}
          </div>
        </div>
      </div>
    )
  }
}
