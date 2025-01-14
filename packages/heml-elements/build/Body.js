function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import Style from './Style.js';
import Preview from './Preview.js';
const {
  createElement,
  transforms,
  cssGroups
} = utils;
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
    return utils.renderElement("body", _extends({}, attrs, {
      style: "margin: 0; width: 100%;"
    }), Preview.flush(), utils.renderElement("table", {
      class: "bodyTable",
      role: "presentation",
      width: "100%",
      align: "left",
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      style: "margin: 0;"
    }, utils.renderElement("tr", null, utils.renderElement("td", {
      class: "body__content",
      align: "left",
      width: "100%",
      valign: "top"
    }, contents))), utils.renderElement("div", {
      style: "display:none; white-space:nowrap; font-size:15px; line-height:0;"
    }, '&nbsp; '.repeat(30)), utils.renderElement(Style, {
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