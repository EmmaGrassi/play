'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loglevel = require('loglevel');

var log = _interopRequireWildcard(_loglevel);

var _reactRedux = require('react-redux');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function mapStateToProps(state) {
  log.debug('application/components/App/index:mapStateToProps', state);

  return {};
}

function mapDispatchToProps(dispatch) {
  log.debug('application/components/App/index:mapDispatchToProps', dispatch);

  return {};
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_App2.default);

exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/service/src/client/js/application/components/App/index.js');

  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/service/src/client/js/application/components/App/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/service/src/client/js/application/components/App/index.js');
})();

;