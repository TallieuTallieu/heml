"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
var _Style = _interopRequireDefault(require("./Style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-line no-unused-vars

const {
  trueHide,
  ieAlignFallback
} = _hemlUtils.transforms;
const {
  background,
  margin,
  padding,
  border,
  borderRadius,
  width,
  height,
  table,
  box
} = _hemlUtils.cssGroups;
var _default = exports.default = (0, _hemlUtils.createElement)('container', {
  containsText: true,
  rules: {
    '.container': [{
      '@pseudo': 'root'
    }, {
      display: trueHide('block')
    }, margin, width],
    '.container__table__ie': ['width', 'max-width', {
      [margin]: ieAlignFallback
    }],
    '.container__table': [{
      '@pseudo': 'table'
    }, table],
    '.container__row': [{
      '@pseudo': 'row'
    }],
    '.container__cell': [{
      '@pseudo': 'cell'
    }, height, background, box, padding, border, borderRadius]
  },
  render(attrs, contents) {
    attrs.class += ' container';
    return /*#__PURE__*/React.createElement("div", attrs, (0, _hemlUtils.condition)('mso | IE', `<table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td>`), /*#__PURE__*/React.createElement("table", {
      class: "container__table",
      role: "presentation",
      border: "0",
      align: "center",
      cellpadding: "0",
      cellspacing: "0",
      width: "100%"
    }, /*#__PURE__*/React.createElement("tr", {
      class: "container__row"
    }, /*#__PURE__*/React.createElement("td", {
      class: "container__cell",
      width: "100%",
      align: "left",
      valign: "top"
    }, contents))), (0, _hemlUtils.condition)('mso | IE', `</td></tr></table>`), /*#__PURE__*/React.createElement(_Style.default, {
      for: "container"
    }, `
          container {
            max-width: 600px;
            width: 100%;
            margin: auto;
          }
        `));
  }
});