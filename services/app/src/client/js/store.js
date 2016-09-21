import * as log from 'loglevel'
import * as reduxForm from 'redux-form'
import loggerMiddleware from 'redux-logger'
import sagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { hashHistory } from 'react-router'
import { persistState } from 'redux-devtools'
import { routerMiddleware } from 'react-router-redux'

export function configureStore(appReducers) {
  log.debug('store.configureStore', appReducers)

  const reducers = combineReducers({
    Application: appReducers,
    form: reduxForm.reducer
  });

  log.debug('store.configureStore:reducers', reducers)

  const initialState = {
    Application: {},
    form: {}
  }

  log.debug('store.configureStore:initialState', initialState)

  const middleware = compose(
    applyMiddleware(
      routerMiddleware(hashHistory),
      loggerMiddleware({
        collapsed: true
      }),
      sagaMiddleware()
    ),
    window.devToolsExtension && window.devToolsExtension()
  )

  log.debug('store.configureStore:middleware', middleware)

  const store = createStore(reducers, initialState, middleware)

  log.debug('store.configureStore:store', store)

  return store;
}
