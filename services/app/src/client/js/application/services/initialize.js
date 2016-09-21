import * as log from 'loglevel'
import { createAction } from 'redux-actions'
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

const initializeStart = createAction('initialize:start')
const initializeSuccess = createAction('initialize:success')
const initializeFailure = createAction('initialize:failure')

export default function initializeService() {
  log.debug('services/initializeService')

  const p = new Promise((resolve, reject) => {
    resolve('YES');
  });

  log.debug('services/initializeService:p', p)

  return p;
}
