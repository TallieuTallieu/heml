"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createHtmlElement;
var _stringifyAttributes = _interopRequireDefault(require("./stringifyAttributes"));
var _htmlTags = require("html-tags");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createHtmlElement({
  name,
  attrs,
  contents = ' '
}) {
  if (_htmlTags.voidHtmlTags.includes(name)) {
    return `<${name}${attrs ? (0, _stringifyAttributes.default)(attrs) : ''} />`;
  }
  return `<${name}${attrs ? (0, _stringifyAttributes.default)(attrs) : ''}>${contents || ' '}</${name}>`;
}