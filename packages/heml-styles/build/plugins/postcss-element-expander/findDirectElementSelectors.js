"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _postcssSelectorParser = _interopRequireDefault(require("postcss-selector-parser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const simpleSelectorParser = (0, _postcssSelectorParser.default)();

/**
 * find all selectors that target the give element
 * @param  {Object} element  the element definition
 * @param  {String} selector the selector
 * @return {Array}           the matched selectors
 */
function _default(element, selector) {
  const selectors = simpleSelectorParser.process(selector).res;
  return selectors.filter(selector => {
    let selectorNodes = selector.nodes.concat([]).reverse(); // clone the array

    for (const node of selectorNodes) {
      if (node.type === 'combinator') {
        return false;
      }
      if (node.type === 'pseudo' && node.value.replace(/::?/, '') in element.pseudos) {
        return false;
      }
      if (node.type === 'tag' && node.value === element.tag) {
        return true;
      }
    }
  }).map(selector => String(selector).trim());
}