"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;
var validatorsObject = _interopRequireWildcard(require("./validators"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const validators = Object.values(validatorsObject);

/**
* Validate that a cheerio instance contains valid HEML
* @param  {Cheero} $         the heml cheerio
* @param  {Object} options
* @return {Array[HEMLError]} an array of heml errors
*/
function validate($, options = {}) {
  const {
    elements = []
  } = options;
  let errors = [];
  for (let element of elements) {
    const matchedValidators = validators.filter(validator => validator.name in element);
    if (matchedValidators.length === 0) {
      return;
    }
    const $nodes = $.findNodes(element.tagName);
    $nodes.forEach($node => matchedValidators.forEach(validator => {
      try {
        validator($node, element, $);
      } catch (e) {
        errors.push(e);
      }
    }));
  }
  return errors;
}