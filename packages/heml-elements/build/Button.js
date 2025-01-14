function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import lodash from 'lodash';
const {
  omit,
  pick
} = lodash;
import Style from './Style.js';
const {
  createElement,
  transforms,
  cssGroups
} = utils;
const {
  background,
  margin,
  padding,
  border,
  borderRadius,
  width,
  height,
  table,
  text,
  font,
  box
} = cssGroups;
export default createElement('button', {
  attrs: ['href', 'target'],
  defaultAttrs: {
    href: '#'
  },
  rules: {
    '.button': [{
      '@pseudo': 'root'
    }, {
      display: transforms.trueHide('block')
    }],
    '.button__table': [{
      '@pseudo': 'table'
    }, margin, table],
    '.button__cell': [{
      '@pseudo': 'cell'
    }, background, padding, borderRadius, border, height, width, box],
    '.button__link': [{
      '@pseudo': 'link'
    }, background, text, font],
    '.button__text': [{
      '@pseudo': 'text'
    }, 'color', 'text-decoration']
  },
  render(attrs, contents) {
    attrs.class += ' button';
    return utils.renderElement("div", omit(attrs, ['href', 'target']), utils.renderElement("table", {
      role: "presentation",
      width: "100%",
      align: "left",
      border: "0",
      cellpadding: "0",
      cellspacing: "0"
    }, utils.renderElement("tr", null, utils.renderElement("td", null, utils.renderElement("table", {
      role: "presentation",
      width: "auto",
      align: "center",
      border: "0",
      cellspacing: "0",
      cellpadding: "0",
      class: "button__table"
    }, utils.renderElement("tr", null, utils.renderElement("td", {
      align: "center",
      class: "button__cell"
    }, utils.renderElement("a", _extends({}, pick(attrs, ['href', 'target']), {
      class: "button__link",
      style: "display: inline-block;"
    }), utils.renderElement("span", {
      class: "button__text"
    }, contents)))))))), utils.renderElement(Style, {
      for: "button"
    }, `
          button {
            margin: auto;
            border-radius: 3px;
            padding: 6px 12px;
            background-color: #2097e4;
            color: #ffffff;
            text-decoration: none;
          }
        `));
  }
});