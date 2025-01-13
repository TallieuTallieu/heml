function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import HEML, { createElement, transforms, cssGroups } from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import { omit, pick } from 'lodash';
import Style from './Style';
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
    return /*#__PURE__*/React.createElement("div", omit(attrs, ['href', 'target']), /*#__PURE__*/React.createElement("table", {
      role: "presentation",
      width: "100%",
      align: "left",
      border: "0",
      cellpadding: "0",
      cellspacing: "0"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("table", {
      role: "presentation",
      width: "auto",
      align: "center",
      border: "0",
      cellspacing: "0",
      cellpadding: "0",
      class: "button__table"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      align: "center",
      class: "button__cell"
    }, /*#__PURE__*/React.createElement("a", _extends({}, pick(attrs, ['href', 'target']), {
      class: "button__link",
      style: "display: inline-block;"
    }), /*#__PURE__*/React.createElement("span", {
      class: "button__text"
    }, contents)))))))), /*#__PURE__*/React.createElement(Style, {
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