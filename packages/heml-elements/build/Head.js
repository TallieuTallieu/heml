"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
var _Subject = _interopRequireDefault(require("./Subject"));
var _Style = _interopRequireDefault(require("./Style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-line no-unused-vars
var _default = exports.default = (0, _hemlUtils.createElement)('head', {
  unique: true,
  parent: ['heml'],
  attrs: [],
  async render(attrs, contents) {
    return [/*#__PURE__*/React.createElement("head", null, " "), /*#__PURE__*/React.createElement("head", attrs, /*#__PURE__*/React.createElement("meta", {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8"
    }), /*#__PURE__*/React.createElement("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    }), /*#__PURE__*/React.createElement("meta", {
      name: "x-apple-disable-message-reformatting"
    }), /* <!-- https://webdesign.tutsplus.com/tutorials/creating-a-future-proof-responsive-email-without-media-queries--cms-23919 --> */
    `<!--[if !mso]><!-->`, /*#__PURE__*/React.createElement("meta", {
      "http-equiv": "X-UA-Compatible",
      content: "IE=edge"
    }), `<!--<![endif]-->`, /*#__PURE__*/React.createElement("style", {
      type: "text/css",
      "data-embed": true
    }, `
        * { text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        html { height: 100%; width: 100%; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; mso-line-height-rule: exactly; }
        div[style*="margin: 16px 0"] { margin:0 !important; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
        .ReadMsgBody, .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div { line-height: 100%; }
      `), /*#__PURE__*/React.createElement("style", {
      type: "text/css"
    }, `
        h1, h2, h3, h4, h5, h6 { margin: 20px 0; }
        h1 { line-height: 40px; }
        h2 { line-height: 30px; }
        h3 { line-height: 24px; }
        h5 { line-height: 17px; }
        h6 { line-height: 12px; }
        p { display: block; margin: 14px 0; }
        ul { margin-left: 20px; margin-top: 16px; margin-bottom: 16px; padding: 0; list-style-type: disc; }
      `), `<!--[if gte mso 9]>
      <style type="text/css">
      li { text-indent: -1em; }
      table td { border-collapse: collapse; }
      </style>
      <![endif]-->`, /*#__PURE__*/React.createElement("title", null, _Subject.default.flush()), await _Style.default.flush(), `<!-- content -->`, /* drop in the contents */
    contents, /* https://litmus.com/community/discussions/151-mystery-solved-dpi-scaling-in-outlook-2007-2013 */
    `<!--[if gte mso 9]><xml>
       <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
      </xml><![endif]-->`)];
  }
});