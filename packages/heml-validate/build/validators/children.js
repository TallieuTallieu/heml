"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = children;
var _hemlUtils = require("@tallieu_tallieu/heml-utils");
var _lodash = require("lodash");
function children($node, {
  tagName,
  children: requiredChildren
}) {
  if ((0, _lodash.isArray)(requiredChildren)) {
    const children = $node.children().toArray().map(c => c.name);
    const foundRequiredChildren = (0, _lodash.intersection)(requiredChildren, children);
    if (foundRequiredChildren.length < requiredChildren.length) {
      const missingRequiredChildren = (0, _lodash.difference)(requiredChildren, foundRequiredChildren);
      throw new _hemlUtils.HEMLError(`${tagName} is missing required children: ${missingRequiredChildren}`, $node);
    }
  }
}
;