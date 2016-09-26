import * as log from 'loglevel'
import _ from 'lodash'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Component from './PersonForm'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default reduxForm({
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
})(Component)
