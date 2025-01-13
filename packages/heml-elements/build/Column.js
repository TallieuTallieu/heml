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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // eslint-disable-line no-unused-vars
const {
  background,
  box,
  padding,
  border,
  borderRadius
} = _hemlUtils.cssGroups;
const breakpoint = 600;
var _default = exports.default = (0, _hemlUtils.createElement)('column', {
  attrs: ['small', 'large'],
  parent: ['row'],
  defaultAttrs: {
    small: 12,
    large: 12
  },
  containsText: true,
  rules: {
    '.column': [{
      '@pseudo': 'root'
    }, {
      display: _hemlUtils.transforms.trueHide(undefined, true)
    }, background, box, padding, border, borderRadius, 'vertical-align']
  },
  render(attrs, contents) {
    const small = parseInt(attrs.small, 10);
    const large = parseInt(attrs.large, 10);
    const largeWidth = `${Math.round(100 * large / 12)}%`;
    attrs.class += ` column col-sm-${small}`;
    delete attrs.large;
    delete attrs.small;
    return [/*#__PURE__*/React.createElement("td", _extends({}, attrs, {
      width: largeWidth,
      style: `width: ${largeWidth};`,
      align: "left",
      valign: "top"
    }), contents.length === 0 ? '&nbsp;' : contents), small === large ? '' : /*#__PURE__*/React.createElement(_Style.default, {
      for: "column",
      "heml-embed": true
    }, `
         @media only screen and (max-width: ${breakpoint}px) {
          .column, .column-filler { float: left; box-sizing: border-box; }
          .col-sm-${small} {
            width: ${Math.round(100 * small / 12)}% !important;
            display: block;
          }
        }
      `)];
  }
});