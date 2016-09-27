import reducers from './reducers'
import routes from './routes'

import quiz from './modules/quiz'

export default {
  name: 'Application',
  reducers: reducers,
  routes: routes,
  modules: [
    quiz,
  ]
}
