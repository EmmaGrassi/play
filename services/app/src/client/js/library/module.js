import React from 'react'
import { combineReducers } from 'redux'
import * as log from 'loglevel'

import { keys, each, map } from 'lodash'

function isObjectEmpty(object) {
  return keys(object).length === 0
}

export function getReducers(module) {
  log.debug('module#get-reducers', module)

  const moduleReducers = Object.assign({}, module.reducers)

  each(module.modules, (subModule) => {
    const submoduleReducers = getReducers(subModule)

    if (submoduleReducers) {
      moduleReducers[subModule.name] = submoduleReducers
    }
  })

  if (!isObjectEmpty(moduleReducers)) {
    return combineReducers(moduleReducers)
  }
}

export function getRoutes(module, store) {
  log.debug('module#get-routes', module)

  return module.routes({
    routes: map(module.routes, (submodule, i) => {
      return <div key={i}>{getRoutes(submodule, store)}</div>
    }),
    store
  })
}
