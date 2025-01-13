"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = require("lodash");
/**
 * finds all the tables that are centered with margins
 * and centers them with the align attribute
 * @param  {Cheerio} $
 */
function inlineMargins($) {
  $('table[style*=margin]').toNodes().forEach($el => {
    const {
      left,
      right
    } = getSideMargins($el.attr('style'));
    if (left === 'auto' && right === 'auto') {
      $el.attr('align', 'center');
    } else if (left === 'auto' && right !== 'auto') {
      $el.attr('align', 'right');
    } else if (left !== 'auto') {
      $el.attr('align', 'left');
    }
  });
}

/**
 * pulls the left and right margins from the given inline styles
 * @param  {String} style the inline styles
 * @return {Object}       object with left and right margins
 */
function getSideMargins(style) {
  const margins = (0, _lodash.compact)(style.split(';')).map(decl => {
    const split = decl.split(':');
    return {
      prop: (0, _lodash.first)(split).trim().toLowerCase(),
      value: (0, _lodash.last)(split).trim().toLowerCase()
    };
  }).filter(({
    prop,
    value
  }) => prop.indexOf('margin') === 0);
  let left = 0;
  let right = 0;
  margins.forEach(({
    prop,
    value
  }) => {
    if (prop === 'margin-left') {
      left = value;
      return;
    }
    if (prop === 'margin-right') {
      right = value;
      return;
    }
    if (prop === 'margin') {
      const values = value.split(' ').map(i => i.trim());
      switch (values.length) {
        case 1:
          right = (0, _lodash.first)(values);
          left = (0, _lodash.first)(values);
          break;
        case 2:
          right = (0, _lodash.last)(values);
          left = (0, _lodash.last)(values);
          break;
        case 3:
          right = (0, _lodash.nth)(values, 1);
          left = (0, _lodash.nth)(values, 1);
          break;
        default:
          right = (0, _lodash.nth)(values, 1);
          left = (0, _lodash.nth)(values, 3);
          break;
      }
    }
  });
  return {
    left,
    right
  };
}
var _default = exports.default = inlineMargins;