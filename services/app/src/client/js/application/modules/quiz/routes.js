import * as log from 'loglevel'
import React from 'react'
import { Route, Redirect } from 'react-router'

import Quiz from './components/Quiz'
import QuizQuestion from './components/QuizQuestion'

export default ({ routes }) => {
  return (
    <div>
      <Route path="/quiz/:language" component={Quiz}>
        <Route path="/:question" component={QuizQuestion}/>
        <Redirect from="/" to="/0"/>
        {routes}
      </Route>
    </div>
  )
}
