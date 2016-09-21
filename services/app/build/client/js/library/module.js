'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.getReducers = getReducers;
exports.getRoutes = getRoutes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _loglevel = require('loglevel');

var log = _interopRequireWildcard(_loglevel);

var _lodash = require('lodash');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObjectEmpty(object) {
  return (0, _lodash.keys)(object).length === 0;
}

function getReducers(module) {
  log.debug('module#get-reducers', module);

  var moduleReducers = (0, _assign2.default)({}, module.reducers);

  (0, _lodash.each)(module.modules, function (subModule) {
    var submoduleReducers = getReducers(subModule);

    if (submoduleReducers) {
      moduleReducers[subModule.name] = submoduleReducers;
    }
  });

  if (!isObjectEmpty(moduleReducers)) {
    return (0, _redux.combineReducers)(moduleReducers);
  }
}

function getRoutes(module, store) {
  log.debug('module#get-routes', module);

  return module.routes({
    routes: (0, _lodash.map)(module.routes, function (submodule, i) {
      return _react2.default.createElement(
        'div',
        { key: i },
        getRoutes(submodule, store)
      );
    }),
    store: store
  });
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isObjectEmpty, 'isObjectEmpty', '/service/src/client/js/library/module.js');

  __REACT_HOT_LOADER__.register(getReducers, 'getReducers', '/service/src/client/js/library/module.js');

  __REACT_HOT_LOADER__.register(getRoutes, 'getRoutes', '/service/src/client/js/library/module.js');
})();

;