"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
var _lodash = require("lodash");
var _Style = _interopRequireDefault(require("./Style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // eslint-disable-line no-unused-vars
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
} = _hemlUtils.cssGroups;
var _default = exports.default = (0, _hemlUtils.createElement)('button', {
  attrs: ['href', 'target'],
  defaultAttrs: {
    href: '#'
  },
  rules: {
    '.button': [{
      '@pseudo': 'root'
    }, {
      display: _hemlUtils.transforms.trueHide('block')
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
    return /*#__PURE__*/React.createElement("div", (0, _lodash.omit)(attrs, ['href', 'target']), /*#__PURE__*/React.createElement("table", {
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
    }, /*#__PURE__*/React.createElement("a", _extends({}, (0, _lodash.pick)(attrs, ['href', 'target']), {
      class: "button__link",
      style: "display: inline-block;"
    }), /*#__PURE__*/React.createElement("span", {
      class: "button__text"
    }, contents)))))))), /*#__PURE__*/React.createElement(_Style.default, {
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