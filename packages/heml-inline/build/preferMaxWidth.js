"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preferMaxWidth;
var _styleHelper = require("./styleHelper");
function preferMaxWidth($, selector) {
  $(selector).toNodes().forEach($node => {
    const maxWidth = (0, _styleHelper.getProp)($node.attr('style'), 'max-width');
    const width = $node.attr('width') || '';
    if (!maxWidth) {
      return;
    }
    const maxWidthIsPxValue = maxWidth && maxWidth.endsWith('px');
    const maxWidthIsSmallerThenWidth = maxWidth.endsWith('%') && width.endsWith('%') && parseInt(maxWidth, 10) < parseInt(width, 10);
    if (maxWidthIsPxValue || maxWidthIsSmallerThenWidth) {
      let styles = (0, _styleHelper.removeProp)($node.attr('style'), 'max-width');
      styles = (0, _styleHelper.removeProp)(styles, 'width');
      $node.attr('width', maxWidth.replace('px', ''));
      $node.attr('style', (0, _styleHelper.setProp)(styles, 'width', maxWidth));
    }
  });
}