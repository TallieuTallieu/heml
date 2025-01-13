"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cheerio = require("cheerio");
var _lodash = require("lodash");
var _cryptoRandomString = _interopRequireDefault(require("crypto-random-string"));
var _htmlTags = _interopRequireWildcard(require("html-tags"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const wrappingHtmlTags = (0, _lodash.difference)(_htmlTags.default, _htmlTags.voidHtmlTags);
function parse(contents, options = {}) {
  const {
    elements = [],
    cheerio: cheerioOptions = {}
  } = options;
  const $ = (0, _cheerio.load)(contents, {
    xmlMode: true,
    lowerCaseTags: true,
    decodeEntities: false,
    ...cheerioOptions
  });
  $.findNodes = function (q) {
    return $(Array.isArray(q) ? q.join(",") : q).not("[heml-ignore]").toNodes();
  };
  $.prototype.toNodes = function () {
    return this.toArray().map(node => $(node));
  };
  const selfClosingTags = [..._htmlTags.voidHtmlTags, ...elements.filter(element => element.children === false).map(({
    tagName
  }) => tagName)];
  const wrappingTags = [...wrappingHtmlTags, ...elements.filter(element => element.children !== false).map(({
    tagName
  }) => tagName)];
  const $selfClosingNodes = $.findNodes(selfClosingTags).reverse();
  const $wrappingNodes = $.findNodes(wrappingTags).reverse();

  /** Move contents from self wrapping tags outside of itself */
  $selfClosingNodes.forEach($node => {
    $node.after($node.html());
    $node.html("");
  });

  /** ensure that all wrapping tags have at least a zero-width, non-joining character */
  $wrappingNodes.forEach($node => {
    if ($node.html().length === 0) {
      $node.html(" ");
    }
  });

  /** try for head, fallback to body, then heml */
  const $head = (0, _lodash.first)((0, _lodash.compact)([...$("head").toNodes(), ...$("body").toNodes(), ...$("heml").toNodes()]));

  /** move inline styles to a style tag with unique ids so they can be hit by the css processor */
  if ($head) {
    const $inlineStyleNodes = $.findNodes(elements.map(({
      tagName
    }) => tagName)).filter($node => !!$node.attr("style"));
    const inlineCSS = $inlineStyleNodes.map($node => {
      let id = $node.attr("id");
      const css = $node.attr("style");
      $node.removeAttr("style");
      if (!id) {
        id = `heml-${(0, _cryptoRandomString.default)(5)}`;
        $node.attr("id", id);
      }
      return `#${id} {${css}}`;
    }).join("\n");
    $head.append(`<style>${inlineCSS}</style>`);
  }
  return $;
}
var _default = exports.default = parse;