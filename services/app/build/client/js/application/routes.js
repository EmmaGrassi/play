'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = applicationRouter;

var _loglevel = require('loglevel');

var log = _interopRequireWildcard(_loglevel);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHotLoader = require('react-hot-loader');

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Root = function (_React$Component) {
  (0, _inherits3.default)(Root, _React$Component);

  function Root(options) {
    (0, _classCallCheck3.default)(this, Root);

    log.debug('Root#constructor');

    return (0, _possibleConstructorReturn3.default)(this, (Root.__proto__ || (0, _getPrototypeOf2.default)(Root)).call(this, options));
  }

  (0, _createClass3.default)(Root, [{
    key: 'render',
    value: function render() {
      log.debug('Root#render');

      return _react2.default.createElement(
        _reactRouter.Router,
        { history: this.props.history },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _App2.default })
      );
    }
  }]);
  return Root;
}(_react2.default.Component);

function applicationRouter(_ref) {
  var store = _ref.store;
  var history = _ref.history;

  return _react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(Root, { store: store, history: history })
  );
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Root, 'Root', '/service/src/client/js/application/routes.js');

  __REACT_HOT_LOADER__.register(applicationRouter, 'applicationRouter', '/service/src/client/js/application/routes.js');
})();

;