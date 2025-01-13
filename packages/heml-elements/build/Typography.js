"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ul = exports.P = exports.Ol = exports.Li = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.A = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
var _lodash = require("lodash");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-line no-unused-vars

const {
  margin,
  background,
  border,
  borderRadius,
  text,
  font
} = _hemlUtils.cssGroups;

/**
 * create mergable text element
 * @param  {String} name
 * @param  {Object} element
 * @return {Object}
 */
function createTextElement(name, element = {}) {
  let classToAdd = '';
  const Tag = name;
  if (/^h\d$/i.test(name)) {
    classToAdd = 'header';
  } else {
    classToAdd = 'text';
  }
  return (0, _hemlUtils.createElement)(name, (0, _lodash.merge)({
    attrs: true,
    rules: {
      [`.${name}.${classToAdd}`]: [{
        '@pseudo': 'root'
      }, '@default', {
        display: _hemlUtils.transforms.trueHide()
      }, margin, background, border, borderRadius, text, font]
    },
    render(attrs, contents) {
      attrs.class += ` ${classToAdd} ${name}`;
      return /*#__PURE__*/React.createElement(Tag, attrs, contents);
    }
  }, element));
}
const H1 = exports.H1 = createTextElement('h1');
const H2 = exports.H2 = createTextElement('h2');
const H3 = exports.H3 = createTextElement('h3');
const H4 = exports.H4 = createTextElement('h4');
const H5 = exports.H5 = createTextElement('h5');
const H6 = exports.H6 = createTextElement('h6');
const P = exports.P = createTextElement('p');
const Ol = exports.Ol = createTextElement('ol');
const Ul = exports.Ul = createTextElement('ul');
const Li = exports.Li = createTextElement('li');
const A = exports.A = (0, _hemlUtils.createElement)('a', {
  attrs: true,
  defaultAttrs: {
    href: '#'
  },
  rules: {
    '.a': [{
      '@pseudo': 'root'
    }, {
      '@default': true
    }, {
      display: _hemlUtils.transforms.trueHide('inline')
    }, 'color', 'text-decoration'],
    '.a__text': [{
      '@pseudo': 'text'
    }, 'color', 'text-decoration']
  },
  render(attrs, contents) {
    attrs.class += ' a';
    return /*#__PURE__*/React.createElement("a", attrs, /*#__PURE__*/React.createElement("span", {
      class: "a__text"
    }, contents));
  }
});