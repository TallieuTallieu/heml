function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import HEML, { createElement, transforms, cssGroups } from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import Style from './Style';
import Preview from './Preview';
const {
  background,
  padding,
  font,
  text
} = cssGroups;
export default createElement('body', {
  unique: true,
  parent: ['heml'],
  containsText: true,
  rules: {
    '.body': [{
      '@pseudo': 'root'
    }, background],
    '.bodyTable': [{
      '@pseudo': 'table'
    }, '@default', background],
    '.body__content': [{
      '@pseudo': 'content'
    }, padding, font, text],
    '.preview': [{
      'background-color': transforms.convertProp('color')
    }]
  },
  async render(attrs, contents) {
    attrs.class += ' body';
    return /*#__PURE__*/React.createElement("body", _extends({}, attrs, {
      style: "margin: 0; width: 100%;"
    }), Preview.flush(), /*#__PURE__*/React.createElement("table", {
      class: "bodyTable",
      role: "presentation",
      width: "100%",
      align: "left",
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      style: "margin: 0;"
    }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      class: "body__content",
      align: "left",
      width: "100%",
      valign: "top"
    }, contents))), /*#__PURE__*/React.createElement("div", {
      style: "display:none; white-space:nowrap; font-size:15px; line-height:0;"
    }, '&nbsp; '.repeat(30)), /*#__PURE__*/React.createElement(Style, {
      for: "body"
    }, `
          body {
            margin: 0;
            width: 100%;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 20px;
            color: black;
          }
      `));
  }
});