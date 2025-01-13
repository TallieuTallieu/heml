"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-line no-unused-vars

let metaMap;
var _default = exports.default = (0, _hemlUtils.createElement)('meta', {
  attrs: true,
  parent: ['head'],
  preRender() {
    metaMap = new Map([['meta', []]]);
  },
  render(attrs, contents) {
    metaMap.get('meta').push(attrs);
    return true;
  },
  get(key) {
    return metaMap.get(key);
  },
  set(key, value) {
    return metaMap.set(key, value);
  },
  flush() {
    let metaObject = {};
    for (let [key, value] of metaMap) {
      metaObject[key] = value;
    }
    metaMap = null;
    return metaObject;
  }
});