import { createAction } from 'redux-actions'
import log from 'loglevel'

import initializeService from '../services/initialize'

export default createAction('initialize', () => {
  log.debug('initialize action');

  return initializeService();
})
