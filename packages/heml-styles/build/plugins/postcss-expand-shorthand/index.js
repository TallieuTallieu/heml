"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _postcss = _interopRequireDefault(require("postcss"));
var _cssShorthandExpand = _interopRequireDefault(require("css-shorthand-expand"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = _postcss.default.plugin('postcss-expand-shorthand', () => root => {
  root.walkDecls(decl => {
    if (shouldExpand(decl.prop) && !!decl.value) {
      const expandedDecls = (0, _cssShorthandExpand.default)(decl.prop, decl.value);
      if (!expandedDecls) {
        return;
      }
      for (const [prop, value] of Object.entries(expandedDecls)) {
        decl.before(_postcss.default.decl({
          prop,
          value
        }));
      }
      decl.remove();
    }
  });
});
function shouldExpand(prop) {
  return ['background', 'font', 'margin'].includes(prop);
}