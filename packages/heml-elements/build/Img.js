"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
var _Style = _interopRequireDefault(require("./Style"));
var _lodash = require("lodash");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _isAbsoluteUrl = _interopRequireDefault(require("is-absolute-url"));
var _axios = _interopRequireDefault(require("axios"));
var _imageSize = _interopRequireDefault(require("image-size"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-line no-unused-vars
var _default = exports.default = (0, _hemlUtils.createElement)('img', {
  attrs: ['src', 'width', 'height', 'alt', 'infer', 'inline', 'style'],
  children: false,
  defaultAttrs: {
    border: '0',
    alt: ''
  },
  rules: {
    'img': [{
      '@pseudo': 'root'
    }, {
      display: _hemlUtils.transforms.trueHide()
    }, '@default']
  },
  async render(attrs, contents) {
    const isBlock = !attrs.inline;
    if (!!attrs.infer && (0, _lodash.has)(attrs, 'src') && !attrs.width) {
      attrs.width = await getWidth(attrs.src, attrs.infer === 'retina');
    }
    attrs.class += ` ${isBlock ? 'img__block' : 'img__inline'}`;
    attrs.style = isBlock ? '' : 'display: inline-block;';
    return [/*#__PURE__*/React.createElement("img", (0, _lodash.omit)(attrs, 'inline', 'infer')), /*#__PURE__*/React.createElement(_Style.default, {
      for: "img"
    }, `
        .img__block {
          display: block;
          max-width: 100%;
        }
      `)];
  }
});
async function getWidth(path, isRetina) {
  try {
    const image = await ((0, _isAbsoluteUrl.default)(path) ? getRemoteBuffer(path) : _fsExtra.default.readFile(path));
    const {
      width
    } = (0, _imageSize.default)(image);
    if (!width) {
      return 'auto';
    }
    return isRetina ? Math.round(width / 2) : width;
  } catch (e) {
    return 'auto'; // if we fail fall back to auto
  }
}
function getRemoteBuffer(path) {
  return (0, _axios.default)({
    method: 'get',
    url: path,
    responseType: 'arraybuffer'
  }).then(({
    data
  }) => {
    return Buffer.from(data, 'binary');
  });
}