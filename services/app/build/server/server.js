'use strict';

var _loopback = require('loopback');

var _loopback2 = _interopRequireDefault(_loopback);

var _loopbackBoot = require('loopback-boot');

var _loopbackBoot2 = _interopRequireDefault(_loopbackBoot);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _loopback2.default)();

_loglevel2.default.setLevel(process.env.LOGLEVEL || 'debug');

(0, _loopbackBoot2.default)(app, __dirname, function (error) {
  if (error) {
    throw error;
  }

  return app.listen(function () {
    app.emit('started');

    var baseUrl = app.get('url').replace(/\/$/, '');

    console.log('Web server listening at: %s', baseUrl);

    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;

      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
});

module.exports = app;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(app, 'app', '/service/src/server/server.js');
})();

;