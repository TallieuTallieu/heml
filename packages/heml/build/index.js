"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlParse = _interopRequireDefault(require("@tallieu_tallieu/heml-parse"));
var _hemlRender = _interopRequireDefault(require("@tallieu_tallieu/heml-render"));
var _hemlInline = _interopRequireDefault(require("@tallieu_tallieu/heml-inline"));
var _hemlValidate = _interopRequireDefault(require("@tallieu_tallieu/heml-validate"));
var _hemlUtils = require("@tallieu_tallieu/heml-utils");
var _byteLength = _interopRequireDefault(require("byte-length"));
var _jsBeautify = require("js-beautify");
var _lodash = require("lodash");
var coreElements = _interopRequireWildcard(require("@tallieu_tallieu/heml-elements"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * renders the given HEML string with the config provided
 * @param  {String} HEML     the heml to render
 * @param  {Object} options  the options
 * @return {Object}          { metadata, html, errors }
 */
async function heml(contents, options = {}) {
  const results = {};
  const {
    beautify: beautifyOptions = {},
    validate: validateOption = "soft"
  } = options;
  options.elements = (0, _lodash.flattenDeep)((0, _lodash.toArray)(coreElements).concat(options.elements || []));

  /** parse it ✂️ */
  const $heml = (0, _hemlParse.default)(contents, options);

  /** validate it 🕵 */
  const errors = (0, _hemlValidate.default)($heml, options);
  if (validateOption.toLowerCase() === "strict" && errors.length > 0) {
    throw errors[0];
  }
  if (validateOption.toLowerCase() === "soft") {
    results.errors = errors;
  }

  /** render it 🤖 */
  const {
    $: $html,
    metadata
  } = await (0, _hemlRender.default)($heml, options);

  /** inline it ✍️ */
  (0, _hemlInline.default)($html, options);

  /** beautify it 💅 */
  results.html = _hemlUtils.condition.replace((0, _jsBeautify.html)($html.html(), {
    indent_size: 2,
    indent_inner_html: true,
    preserve_newlines: false,
    extra_liners: [],
    ...beautifyOptions
  }));

  /** final touches 👌 */
  metadata.size = `${((0, _byteLength.default)(results.html) / 1024).toFixed(2)}kb`;
  results.metadata = metadata;

  /** send it back 🎉 */
  return results;
}
var _default = exports.default = heml;