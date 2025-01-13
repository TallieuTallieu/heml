"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _juice = _interopRequireDefault(require("juice"));
var _inlineMargins = _interopRequireDefault(require("./inlineMargins"));
var _fixWidthsFor = _interopRequireDefault(require("./fixWidthsFor"));
var _removeProcessingIds = _interopRequireDefault(require("./removeProcessingIds"));
var _preferMaxWidth = _interopRequireDefault(require("./preferMaxWidth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function inline($, options = {}) {
  const {
    juice: juiceOptions = {}
  } = options;
  _juice.default.juiceDocument($, {
    ...juiceOptions
  });
  (0, _inlineMargins.default)($);
  (0, _preferMaxWidth.default)($, '[class$="__ie"]');
  (0, _fixWidthsFor.default)($, 'img, .block__table__ie, .column');
  (0, _removeProcessingIds.default)($);
  return $;
}
var _default = exports.default = inline;