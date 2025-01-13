"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parent;
var _hemlUtils = require("@tallieu_tallieu/heml-utils");
function parent($node, {
  tagName,
  parent: allowedParents
}) {
  const parentTag = $node.parent().get(0);
  if (!parentTag) {
    return;
  }
  if (allowedParents.includes(parentTag.name)) {
    return;
  }
  let message = `${tagName} is inside of ${parentTag.name}.`;
  if (allowedParents.length === 0) {
    message = `${message} It may not have any parents.`;
  } else {
    message = `${message} It should only be used in: ${allowedParents.join(', ')}`;
  }
  throw new _hemlUtils.HEMLError(message, $node);
}