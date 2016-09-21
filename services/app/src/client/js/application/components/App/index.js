import * as log from 'loglevel'
import { connect } from 'react-redux'

import App from './App'

function mapStateToProps(state) {
  log.debug('application/components/App/index:mapStateToProps', state)

  return {}
}

function mapDispatchToProps(dispatch) {
  log.debug('application/components/App/index:mapDispatchToProps', dispatch)

  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)