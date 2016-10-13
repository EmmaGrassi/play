import * as log from 'loglevel'
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import PersonForm from './components/PersonForm'
import Quiz from './components/Quiz'
import Scoreboard from './components/Scoreboard'

export default () => {
  return (
    <Route path="/" component={App}>
      <Route path="/quiz/:language" component={Quiz}/>
      <Route path="/scoreboard" component={Scoreboard}/>
      <IndexRoute component={PersonForm}/>
    </Route>
  )
}
