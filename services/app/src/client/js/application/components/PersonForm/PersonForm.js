import * as log from 'loglevel'
import React from 'react'
import _ from 'lodash'
import { Field, SubmissisonError, reduxForm } from 'redux-form'
import { push } from 'react-router'

import submitPersonForm from '../../services/submitPersonForm'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@reduxForm({
  form: 'person',
  fields: [
    'contact',
    'email',
    'firstName',
    'github',
    'intoClojure',
    'intoJava',
    'intoNode',
    'intoPython',
    'intoRuby',
    'intoScala',
    'lastName',
  ],

  validate: (data) => {
    // First run will be empty.
    if (_.keys(data).length === 0) {
      return {}
    }

    const errors = {}

    if (data.firstName.length <= 2) {
      errors.firstName = 'First name must be longer then 2 characters.'
    }

    if (data.lastName.length <= 2) {
      errors.lastName = 'Last name must be longer then 2 characters.'
    }

    if (!EMAIL_REGEX.test(data.email)) {
      errors.email = 'Please enter a valid email address.'
    }

    log.debug('contact', data.contact)

    if (!data.contact) {
      errors.contact = 'You must agree to these terms in order to continue.'
    }

    return errors
  },

  onSubmitFail: () => {
    debugger
  },

  onSubmitSuccess: () => {
    debugger
  },
})
export default class App extends React.Component {
  componentWillMount() {
    debugger

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
    return submitPersonForm(data)

    /*
    debugger

    const response = await submitPersonForm(data)

    if (!response.ok) {
      const json = await response.json()

      debugger

      // Get the first of each message, since the form supports one error message per input currently.
      const messages = _.mapValues(json.error.details.messages, a => a[0])

      // Set the generic error message.
      messages._error = json.error._message

      throw new SubmissisonError(messages)
    }
    */
  }

  onSubmitFail() {
    debugger
  }

  onSubmitSuccess() {
    debugger
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
