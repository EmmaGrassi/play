import React from 'react'

export default class Question extends React.Component {
  renderTitle() {
    const { title } = this.props.quizEntry.currentQuestion

    return (
      <strong>{title}</strong>
    )
  }

  renderOptions() {
    const { options } = this.props.quizEntry.currentQuestion

    return (
      <div>
        {_.map(options, ({ value }, i) => {
          return (
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="answer"
                  checked={false}
                  defaultChecked={false}
                  onClick={this.props.answerQuizEntryQuestion.bind(this, i)}
                />
                {value}
              </label>
            </div>
          )
        })}
      </div>
    )
  }

  renderQuestion() {
    const { question } = this.props.quizEntry.currentQuestion

    return (
      <p>{question}</p>
    )
  }

  renderCode() {
    const { code } = this.props.quizEntry.currentQuestion

    if (code && code !== '') {
      return (
        <blockquote>
          <pre>{code}</pre>
        </blockquote>
      )
    }
  }

  render() {
    const { quizEntry } = this.props

    if (!quizEntry.currentQuestion) {
      return null
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              {this.renderTitle()}
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                {this.renderQuestion()}
                {this.renderCode()}
                {this.renderOptions()}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
