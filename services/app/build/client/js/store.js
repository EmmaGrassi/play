'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = configureStore;

var _loglevel = require('loglevel');

var log = _interopRequireWildcard(_loglevel);

var _reduxForm = require('redux-form');

var reduxForm = _interopRequireWildcard(_reduxForm);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reactRouter = require('react-router');

var _reduxDevtools = require('redux-devtools');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function configureStore(appReducers) {
  log.debug('store.configureStore', appReducers);

  var reducers = (0, _redux.combineReducers)({
    Application: appReducers,
    form: reduxForm.reducer
  });

  log.debug('store.configureStore:reducers', reducers);

  var initialState = {
    Application: {},
    form: {}
  };

  log.debug('store.configureStore:initialState', initialState);

  var middleware = (0, _redux.compose)((0, _redux.applyMiddleware)((0, _reactRouterRedux.routerMiddleware)(_reactRouter.hashHistory), (0, _reduxLogger2.default)({
    collapsed: true
  }), (0, _reduxSaga2.default)()), window.devToolsExtension && window.devToolsExtension());

  log.debug('store.configureStore:middleware', middleware);

  var store = (0, _redux.createStore)(reducers, initialState, middleware);

  log.debug('store.configureStore:store', store);

  return store;
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(configureStore, 'configureStore', '/service/src/client/js/store.js');
})();

;