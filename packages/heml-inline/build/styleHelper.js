"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProp = getProp;
exports.removeProp = removeProp;
exports.setProp = setProp;
var _lodash = require("lodash");
/**
 * Gets the value of a prop in a given inline style string
 * @param {String} style inline styles
 * @param {String} prop  prop to get
 *
 * @return {String} style
 */
function getProp(style = '', prop) {
  prop = prop.trim().toLowerCase();
  const decls = style.split(';');
  let value = false;
  decls.forEach(decl => {
    if (decl.trim().toLowerCase().startsWith(`${prop}:`)) {
      value = decl.split(':')[1].trim();
    }
  });
  return value;
}

/**
 * Sets the value of a prop in a given inline style string
 * @param {String} style inline styles
 * @param {String} prop  prop to update/add
 * @param {String} value new value
 *
 * @return {String} style
 */
function setProp(style = '', prop, value) {
  prop = prop.trim().toLowerCase();
  const decls = style.split(';');
  let updated = false;
  const updatedDecls = decls.map(decl => {
    if (decl.trim().toLowerCase().startsWith(`${prop}:`)) {
      updated = true;
      return `${prop}: ${value}`;
    }
    return decl;
  });
  if (!updated) {
    updatedDecls.push(`${prop}: ${value}`);
  }
  return (0, _lodash.compact)(updatedDecls).join(';');
}

/**
 * removes a prop in a given inline style string
 * @param {String} style inline styles
 * @param {String} prop  prop to remove
 *
 * @return {String} style
 */
function removeProp(style = '', prop) {
  prop = prop.trim().toLowerCase();
  const decls = style.split(';');
  const updatedDecls = decls.map(decl => {
    if (decl.trim().toLowerCase().startsWith(`${prop}:`)) {
      return false;
    }
    return decl;
  });
  return (0, _lodash.compact)(updatedDecls).join(';');
}