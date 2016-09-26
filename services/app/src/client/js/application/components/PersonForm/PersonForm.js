import _ from 'lodash'
import React from 'react'
import { Field, SubmissisonError } from 'redux-form'
import * as log from 'loglevel'

import submitPersonForm from '../../services/submitPersonForm'

export default class App extends React.Component {
  componentWillMount() {
    this.props.initialize({
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      intoJava: false,
      intoScala: false,
      intoClojure: false,
      intoNode: false,
      intoRuby: false,
      intoPython: false,
      contact: false
    })
  }

  async handleSubmit(data) {
    const response = await submitPersonForm(data)

    if (!response.ok) {
      const json = await response.json()

      debugger

      // Get the first of each message, since the form supports one error message per input currently.
      const messages = _.mapValues(json.error.details.messages, a => a[0])

      // Set the generic error message.
      messages._error = json.error._message

      throw new SubmissisonError(messages)
    } else {
      log.debug('NO ERRORS LIEK WAT')
    }
  }

  renderAsterisk() {
    return <strong style={{color:'#000000'}}>*</strong>
  }

  renderTextInput({ type, input, meta }) {
    if (meta.touched) {
      if (meta.error) {
        return (
          <div className="has-danger">
            <input type={type} className="form-control form-control-danger" {...input}/>
            <div className="form-control-feedback">{meta.error}</div>
          </div>
        )
      } else {
        return (
          <div className="has-success">
            <input type={type} className="form-control form-control-success" {...input}/>
            <div className="form-control-feedback">{meta.error}</div>
          </div>
        )
      }
    } else {
      return (
        <div>
          <input type={type} className="form-control" {...input}/>
        </div>
      )
    }
  }

  renderCheckbox({ type, input, meta, label }) {
    if (meta.touched) {
      if (meta.error) {
        return (
          <div className="form-check has-danger">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" {...input}/>
              {label}
            </label>
          </div>
        )
      } else {
        return (
          <div className="form-check has-success">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" {...input}/>
              {label}
            </label>
          </div>
        )
      }
    } else {
      return (
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" {...input}/>
            {label}
          </label>
        </div>
      )
    }
  }

  renderContactCheckbox({ type, input, meta, label }) {
    if (meta.touched) {
      if (meta.error) {
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="form-check has-danger">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" {...input}/>
                  Sytac may contact me for business opportunities and promomotional information.
                </label>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="form-check has-success">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" {...input}/>
                  Sytac may contact me for business opportunities and promomotional information.
                </label>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="row">
          <div className="col-md-12">
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" {...input}/>
                Sytac may contact me for business opportunities and promomotional information.
              </label>
            </div>
          </div>
        </div>
      )
    }
  }

  renderServerError(error) {
    return (
      <div className="row">
        <div className="col-md-12">
          <label><strong style={{color: '#ff0000'}}>{error}</strong></label>
        </div>
      </div>
    )
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      error
    } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="firstName">First name {this.renderAsterisk()}</label>
              <Field name="firstName" type="text" component={this.renderTextInput} />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name {this.renderAsterisk()}</label>
              <Field name="lastName" type="text" component={this.renderTextInput} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email {this.renderAsterisk()}</label>
              <Field name="email" type="text" component={this.renderTextInput} />
            </div>

            <div className="form-group">
              <label htmlFor="github">Github</label>
              <Field name="github" type="text" component={this.renderTextInput} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label>I'm into</label>
          </div>

          <div className="col-md-2">
            <Field name="intoClojure" type="checkbox" label="Clojure" component={this.renderCheckbox} />
          </div>

          <div className="col-md-2">
            <Field name="intoJava" type="checkbox" label="Java" component={this.renderCheckbox} />
          </div>

          <div className="col-md-2">
            <Field name="intoNode" type="checkbox" label="Node.js" component={this.renderCheckbox} />
          </div>

          <div className="col-md-2">
            <Field name="intoPython" type="checkbox" label="Python" component={this.renderCheckbox} />
          </div>

          <div className="col-md-2">
            <Field name="intoRuby" type="checkbox" label="Ruby" component={this.renderCheckbox} />
          </div>

          <div className="col-md-2">
            <Field name="intoScala" type="checkbox" label="Scala" component={this.renderCheckbox} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label><strong>Terms of Service {this.renderAsterisk()}</strong></label>
          </div>
        </div>

        <Field name="contact" type="checkbox" component={this.renderContactCheckbox} />

        {this.renderServerError(error)}

        <div className="row">
          <div className="col-md-12">
            <label><strong>Start the quiz!</strong></label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <center>
              <div className="btn-group" role="group">
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting}>Clojure</button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting}>Java</button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting}>Node.js</button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting}>Python</button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting}>Ruby</button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting}>Scala</button>
              </div>
            </center>
          </div>
        </div>
      </form>
    )
  }
}
