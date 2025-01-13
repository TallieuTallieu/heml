"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tr = exports.Td = exports.Table = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-line no-unused-vars

const Table = exports.Table = (0, _hemlUtils.createElement)('table', {
  attrs: true,
  containsText: true,
  rules: {
    '.table': [{
      '@pseudo': 'root'
    }, '@default', {
      display: _hemlUtils.transforms.trueHide('table')
    }]
  },
  render(attrs, contents) {
    attrs.class += ' table';
    return /*#__PURE__*/React.createElement("table", attrs, contents);
  }
});
const Tr = exports.Tr = (0, _hemlUtils.createElement)('tr', {
  attrs: true,
  containsText: true,
  rules: {
    '.tr': [{
      '@pseudo': 'root'
    }, '@default']
  },
  render(attrs, contents) {
    attrs.class += ' tr';
    return /*#__PURE__*/React.createElement("tr", attrs, contents);
  }
});
const Td = exports.Td = (0, _hemlUtils.createElement)('td', {
  attrs: true,
  containsText: true,
  rules: {
    '.td': [{
      '@pseudo': 'root'
    }, '@default']
  },
  render(attrs, contents) {
    attrs.class += ' td';
    return /*#__PURE__*/React.createElement("td", attrs, contents);
  }
});