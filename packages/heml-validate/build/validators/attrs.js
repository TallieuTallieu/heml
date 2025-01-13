"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = attrs;
var _hemlUtils = require("@tallieu_tallieu/heml-utils");
var _lodash = require("lodash");
const nativeAttrs = ['id', 'class', 'dir', 'lang', 'accesskey', 'tabindex', 'title', 'translate'];
function attrs($node, {
  tagName,
  attrs: allowedAttrs,
  defaultAttrs
}) {
  /** allow any attributes through */
  if (allowedAttrs === true) {
    return;
  }
  allowedAttrs = allowedAttrs.concat(Object.keys(defaultAttrs)).concat(nativeAttrs);
  const usedAttrs = Object.keys($node.get(0).attribs);
  const foundNotAllowedAttrs = (0, _lodash.difference)(usedAttrs, allowedAttrs);
  if (foundNotAllowedAttrs.length > 0) {
    /** remove non-whitelisted attributes */
    foundNotAllowedAttrs.forEach(attr => $node.removeAttr(attr));
    const plural = foundNotAllowedAttrs.length > 1;
    throw new _hemlUtils.HEMLError(`Attribute${plural ? 's' : ''} ${foundNotAllowedAttrs.join(', ')} ${plural ? 'are' : 'is'} not allowed on ${tagName}.`, $node);
  }
}