"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = authentication;
function authentication(app) {
  app.enableAuth();
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(authentication, "authentication", "/service/src/server/boot/authentication.js");
})();

;