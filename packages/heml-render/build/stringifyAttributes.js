"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stringifyAttributes;
/** escapeless version of npmjs.com/stringify-attributes */
function stringifyAttributes(attrsObj) {
  const attributes = [];
  for (let [key, value] of Object.entries(attrsObj)) {
    if (value === false) {
      continue;
    }
    if (Array.isArray(value)) {
      value = value.join(' ');
    }
    value = value === true ? '' : `="${String(value)}"`;
    attributes.push(`${key}${value}`);
  }
  return attributes.length > 0 ? ' ' + attributes.join(' ') : '';
}