"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _postcss = _interopRequireDefault(require("postcss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * convert margin-top/margin-bottom to 0 when they are margin auto
 */
var _default = exports.default = _postcss.default.plugin('postcss-zero-out-margin', () => root => {
  root.walkDecls(/margin-top|margin-bottom/i, decl => {
    decl.value = decl.value.toLowerCase() === 'auto' ? '0' : decl.value;
  });
});