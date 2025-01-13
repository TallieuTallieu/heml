"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unique;
var _hemlUtils = require("@tallieu_tallieu/heml-utils");
function unique($node, {
  tagName,
  unique: shouldBeUnique
}, $) {
  const $nodes = $.findNodes(tagName);
  if ($nodes.length > 1 && shouldBeUnique) {
    /** remove all but the first $node */
    $nodes.slice(1).forEach($node => $node.remove());
    throw new _hemlUtils.HEMLError(`${tagName} should be unique. ${$nodes.length} were found.`, $node);
  }
}