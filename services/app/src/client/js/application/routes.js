import * as log from 'loglevel'
import React from 'react'
import { Route, Redirect } from 'react-router'

import App from './components/App'
import Quiz from './components/Quiz'
import QuizQuestion from './components/QuizQuestion'

export default ({ routes }) => {
  return (
    <div>
      <Route path="/" component={App}/>
      <Route path="/quiz/:language" component={Quiz}>
        <Redirect from="/" to="/0"/>
        <Route path="/:question" component={QuizQuestion}/>
      </Route>
      {routes}
    </div>
  )
}
