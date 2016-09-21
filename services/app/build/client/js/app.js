'use strict';

require('whatwg-fetch');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _domready = require('domready');

var _domready2 = _interopRequireDefault(_domready);

var _loglevel = require('loglevel');

var log = _interopRequireWildcard(_loglevel);

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _reactRouterRedux = require('react-router-redux');

var _application = require('./application');

var _application2 = _interopRequireDefault(_application);

var _initialize = require('./application/actions/initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _store = require('./store');

var _module = require('./library/module');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

log.setLevel('debug');

var reducers = window.reducers = (0, _module.getReducers)(_application2.default);
var store = window.store = (0, _store.configureStore)(reducers);
var routes = window.routes = (0, _module.getRoutes)(_application2.default, store);

function start() {
  var rootElement = document.querySelector('#root');

  (0, _domready2.default)(function () {
    return (0, _reactDom.render)(routes, rootElement);
  });

  if (module.hot) {
    module.hot.accept('./application/routes', function () {
      (0, _reactDom.render)(routes, rootElement);
    });
  }
}

store.subscribe(function () {
  var state = store.getState();

  if (state && state.Application && state.Application.initialize && state.Application.initialize.hasSucceeded) {
    debugger;
    start();
  }
});

store.dispatch((0, _initialize2.default)());
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(reducers, 'reducers', '/service/src/client/js/app.js');

  __REACT_HOT_LOADER__.register(store, 'store', '/service/src/client/js/app.js');

  __REACT_HOT_LOADER__.register(routes, 'routes', '/service/src/client/js/app.js');

  __REACT_HOT_LOADER__.register(start, 'start', '/service/src/client/js/app.js');
})();

;