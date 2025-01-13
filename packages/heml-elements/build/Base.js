"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
var _Meta = _interopRequireDefault(require("./Meta"));
var _isAbsoluteUrl = _interopRequireDefault(require("is-absolute-url"));
var _url = require("url");
var _lodash = require("lodash");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-line no-unused-vars
var _default = exports.default = (0, _hemlUtils.createElement)('base', {
  parent: ['head'],
  children: false,
  unique: true,
  defaultAttrs: {
    href: ''
  },
  render(attrs, contents) {
    _Meta.default.set('base', attrs.href);
    return false;
  },
  preRender({
    $
  }) {
    const base = (0, _lodash.first)($.findNodes('base'));
    if (base) {
      const baseUrl = base.attr('href');
      $('[href], [src]').each((i, node) => {
        const attr = (0, _lodash.has)(node.attribs, 'href') ? 'href' : 'src';
        if ((0, _lodash.has)(node.attribs, attr) && !(0, _isAbsoluteUrl.default)(node.attribs[attr])) {
          node.attribs[attr] = (0, _url.resolve)(baseUrl, node.attribs[attr]);
        }
      });
    }
  }
});