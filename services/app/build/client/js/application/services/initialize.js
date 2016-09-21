'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = initializeService;

var _loglevel = require('loglevel');

var log = _interopRequireWildcard(_loglevel);

var _reduxActions = require('redux-actions');

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initializeStart = (0, _reduxActions.createAction)('initialize:start');
var initializeSuccess = (0, _reduxActions.createAction)('initialize:success');
var initializeFailure = (0, _reduxActions.createAction)('initialize:failure');

function initializeService() {
  log.debug('services/initializeService');

  var p = new _promise2.default(function (resolve, reject) {
    resolve('YES');
  });

  log.debug('services/initializeService:p', p);

  return p;
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(initializeStart, 'initializeStart', '/service/src/client/js/application/services/initialize.js');

  __REACT_HOT_LOADER__.register(initializeSuccess, 'initializeSuccess', '/service/src/client/js/application/services/initialize.js');

  __REACT_HOT_LOADER__.register(initializeFailure, 'initializeFailure', '/service/src/client/js/application/services/initialize.js');

  __REACT_HOT_LOADER__.register(initializeService, 'initializeService', '/service/src/client/js/application/services/initialize.js');
})();

;