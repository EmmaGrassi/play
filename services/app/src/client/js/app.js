import 'whatwg-fetch'

import React from 'react'
import domready from 'domready'
import * as log from 'loglevel'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'

import application from './application'
import initializeAction from './application/actions/initialize'
import { configureStore } from './store'
import { getReducers, getRoutes } from './library/module'

log.setLevel('debug')

const reducers = window.reducers = getReducers(application)
const store    = window.store    = configureStore(reducers)
const routes   = window.routes   = getRoutes(application, store)

function start() {
  const rootElement = document.querySelector('#root')

  domready(() => render(routes, rootElement))

  //if (module.hot) {
  //  module.hot.accept('./application/routes', () => {
  //    render(routes, rootElement)
  //  })
  //}
}

store.subscribe(() => {
  const state = store.getState()

  if (
    state &&
    state.Application &&
    state.Application.initialize &&
    state.Application.initialize.hasSucceeded
  ) {
    debugger
    start()
  }
});

store.dispatch(initializeAction())
