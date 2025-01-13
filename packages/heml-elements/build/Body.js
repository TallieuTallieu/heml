"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
var _Style = _interopRequireDefault(require("./Style"));
var _Preview = _interopRequireDefault(require("./Preview"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // eslint-disable-line no-unused-vars
const {
  background,
  padding,
  font,
  text
} = _hemlUtils.cssGroups;
var _default = exports.default = (0, _hemlUtils.createElement)('body', {
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
      'background-color': _hemlUtils.transforms.convertProp('color')
    }]
  },
  async render(attrs, contents) {
    attrs.class += ' body';
    return /*#__PURE__*/React.createElement("body", _extends({}, attrs, {
      style: "margin: 0; width: 100%;"
    }), _Preview.default.flush(), /*#__PURE__*/React.createElement("table", {
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
    }, '&nbsp; '.repeat(30)), /*#__PURE__*/React.createElement(_Style.default, {
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