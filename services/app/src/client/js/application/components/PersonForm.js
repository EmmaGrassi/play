import * as log from 'loglevel'
import React from 'react'
import _ from 'lodash'
import { Field, SubmissisonError, reduxForm } from 'redux-form'
import { hashHistory } from 'react-router'

import Header from './Header'

import JavaIcon from 'babel!svg-react!../../../images/svg/java.svg?name=JavaIcon'
import NodeIcon from 'babel!svg-react!../../../images/svg/node.svg?name=NodeIcon'
import PythonIcon from 'babel!svg-react!../../../images/svg/python.svg?name=PythonIcon'
import RubyIcon from 'babel!svg-react!../../../images/svg/ruby.svg?name=RubyIcon'
import ScalaIcon from 'babel!svg-react!../../../images/svg/scala.svg?name=ScalaIcon'

import setQuizEntryAction from '../actions/setQuizEntry'
import postQuizEntryService from '../services/postQuizEntry'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const self = x => x

let FIXME_STATE

@reduxForm({
  form: 'person',
  fields: [
    'contact',
    'email',
    'firstName',
    'github',
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

    if (!data.contact) {
      errors.contact = 'You must agree to these terms in order to continue.'
    }

    return errors
  },

  // TODO: Server side validation
  /*
  onSubmitFail: async (errors) => {
    const json = await response.json()

    // Get the first of each message, since the form supports one error message per input currently.
    const messages = _.mapValues(json.error.details.messages, a => a[0])

    // Set the generic error message.
    messages._error = json.error._message

    throw new SubmissisonError(messages)
  },
  */

  onSubmitSuccess: async (response, dispatch) => {
    log.debug('PersonForm.reduxForm#onSubmitSuccess', response, dispatch)

    const json = await response.json()

    dispatch(setQuizEntryAction(json))

    hashHistory.push(`/quiz/${FIXME_STATE}`)
  }
})
export default class PersonForm extends React.Component {
  componentWillMount() {
    log.debug('PersonForm#componentWillMount')

    this.props.initialize({
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      intoJava: false,
      intoScala: false,
      intoNode: false,
      intoRuby: false,
      intoPython: false,
      contact: false
    })
  }

  async handleSubmit(data) {
    log.debug('PersonForm#handleSubmit')

    // FIXME
    data.subject = FIXME_STATE

    return postQuizEntryService(data)
  }

  startSubmit(language, ...args) {
    log.debug('PersonForm#startSubmit')

    // FIXME
    FIXME_STATE = language

    this.props.handleSubmit(this.handleSubmit.bind(this))
  }

  renderAsterisk() {
    log.debug('PersonForm#renderAsterisk')

    return <strong style={{color:'#000000'}}>*</strong>
  }

  renderTextInput({ type, input, meta }) {
    log.debug('PersonForm#renderTextInput')

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
    log.debug('PersonForm#renderCheckbox')

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
    log.debug('PersonForm#renderContactCheckbox')

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

  renderDetails() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>Details</strong>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
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
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderInterests() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <strong>Interests</strong>
            </div>
            <div className="card-block">
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <Field name="intoJava" type="checkbox" label="Java" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group">
                    <Field name="intoNode" type="checkbox" label="Node.js" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group">
                    <Field name="intoPython" type="checkbox" label="Python" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group">
                    <Field name="intoRuby" type="checkbox" label="Ruby" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group">
                    <Field name="intoScala" type="checkbox" label="Scala" component={this.renderCheckbox} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTermsOfService() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Terms of Service {this.renderAsterisk()}</strong>
              </div>
              <div className="card-block">
                <Field name="contact" type="checkbox" component={this.renderContactCheckbox} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderServerError(error) {
    //log.debug('PersonForm#renderServerError')

    if (!error) {
      return null
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <label><strong style={{color: '#ff0000'}}>{error}</strong></label>
        </div>
      </div>
    )
  }

  renderQuizStart() {
    const {
      pristine,
      submitting,
    } = this.props

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <center>
              <label><strong>Start the quiz!</strong></label>
            </center>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <center>
              <small>Answer as many questions as you can before your time runs out.</small>
            </center>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <center>
              <div className="btn-group" role="group">
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting} onClick={this.startSubmit.bind(this, 'java')}>
                  <JavaIcon style={{ width: 64, height: 64 }}/>
                </button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting} onClick={this.startSubmit.bind(this, 'node')}>
                  <NodeIcon style={{ width: 64, height: 64 }}/>
                </button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting} onClick={this.startSubmit.bind(this, 'python')}>
                  <PythonIcon style={{ width: 64, height: 64 }}/>
                </button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting} onClick={this.startSubmit.bind(this, 'ruby')}>
                  <RubyIcon style={{ width: 64, height: 64 }}/>
                </button>
                <button type="submit" className="btn btn-secondary" disabled={pristine || submitting} onClick={this.startSubmit.bind(this, 'scala')}>
                  <ScalaIcon style={{ width: 64, height: 64 }}/>
                </button>
              </div>
            </center>
          </div>
        </div>
      </div>
    )
  }

  render() {
    log.debug('PersonForm#render')

    const {
      handleSubmit,
      error
    } = this.props

    return (
      <div>
        <Header/>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          {this.renderDetails()}
          {this.renderInterests()}
          {this.renderTermsOfService()}
          {this.renderServerError(error)}
          {this.renderQuizStart()}
        </form>
      </div>
    )
  }
}
