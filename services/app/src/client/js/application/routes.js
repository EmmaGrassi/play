import * as log from 'loglevel'
import React from 'react'
import { Route } from 'react-router'

import App from './components/App'

export default ({ routes }) => {
  return (
    <div>
      <Route path="/" component={App}/>
      {routes}
    </div>
  )
}
