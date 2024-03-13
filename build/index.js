import render from "@heml/render";
import inline from "@heml/inline";
import validate from "@heml/validate";
import utils from "@heml/utils";
import byteLength from "byte-length";
import beautify from "js-beautify";
import lodash from "lodash";
import * as coreElements from "@heml/elements";
import { load } from "cheerio";
import randomString from "crypto-random-string";
import htmlTags from "html-tags";
import selfClosingHtmlTags from "html-tags/void.js";

const wrappingHtmlTags = lodash.difference(htmlTags, selfClosingHtmlTags);

function parse(contents, options = {}) {
  const { elements = [], cheerio: cheerioOptions = {} } = options;
  const $ = load(contents, {
    xmlMode: true,
    lowerCaseTags: true,
    decodeEntities: false,
    ...cheerioOptions,
  });
  $.findNodes = function (q) {
    console.log("q", q);
    return $(Array.isArray(q) ? q.join(",") : q)
      .not("[heml-ignore]")
      .toNodes();
  };
  $.prototype.toNodes = function () {
    return this.toArray().map((node) => $(node));
  };
  const selfClosingTags = [
    ...selfClosingHtmlTags,
    ...elements
      .filter((element) => element.children === false)
      .map(({ tagName }) => tagName),
  ];
  const wrappingTags = [
    ...wrappingHtmlTags,
    ...elements
      .filter((element) => element.children !== false)
      .map(({ tagName }) => tagName),
  ];
  const $selfClosingNodes = $.findNodes(selfClosingTags).reverse();
  const $wrappingNodes = $.findNodes(wrappingTags).reverse();

  /** Move contents from self wrapping tags outside of itself */
  $selfClosingNodes.forEach(($node) => {
    $node.after($node.html());
    $node.html("");
  });

  /** ensure that all wrapping tags have at least a zero-width, non-joining character */
  $wrappingNodes.forEach(($node) => {
    if ($node.html().length === 0) {
      $node.html(" ");
    }
  });

  /** try for head, fallback to body, then heml */
  const $head = lodash.first(
    lodash.compact([
      ...$("head").toNodes(),
      ...$("body").toNodes(),
      ...$("heml").toNodes(),
    ]),
  );

  /** move inline styles to a style tag with unique ids so they can be hit by the css processor */
  if ($head) {
    const $inlineStyleNodes = $.findNodes(
      elements.map(({ tagName }) => tagName),
    ).filter(($node) => !!$node.attr("style"));
    const inlineCSS = $inlineStyleNodes
      .map(($node) => {
        let id = $node.attr("id");
        const css = $node.attr("style");
        $node.removeAttr("style");
        if (!id) {
          id = `heml-${randomString(5)}`;
          $node.attr("id", id);
        }
        return `#${id} {${css}}`;
      })
      .join("\n");
    $head.append(`<style>${inlineCSS}</style>`);
  }
  return $;
}
/**
 * renders the given HEML string with the config provided
 * @param  {String} HEML     the heml to render
 * @param  {Object} options  the options
 * @return {Object}          { metadata, html, errors }
 */
async function heml(contents, options = {}) {
  const results = {};
  const { beautify: beautifyOptions = {}, validate: validateOption = "soft" } =
    options;
  options.elements = lodash.flattenDeep(
    lodash.toArray(coreElements).concat(options.elements || []),
  );

  /** parse it ✂️ */
  const $heml = parse(contents, options);

  /** validate it 🕵 */
  const errors = validate($heml, options);
  if (validateOption.toLowerCase() === "strict" && errors.length > 0) {
    throw errors[0];
  }
  if (validateOption.toLowerCase() === "soft") {
    results.errors = errors;
  }

  /** render it 🤖 */
  const { $: $html, metadata } = await render($heml, options);

  /** inline it ✍️ */
  inline($html, options);

  /** beautify it 💅 */
  results.html = utils.condition.replace(
    beautify.html($html.html(), {
      indent_size: 2,
      indent_inner_html: true,
      preserve_newlines: false,
      extra_liners: [],
      ...beautifyOptions,
    }),
  );

  /** final touches 👌 */
  metadata.size = `${(byteLength(results.html) / 1024).toFixed(2)}kb`;
  results.metadata = metadata;

  /** send it back 🎉 */
  return results;
}

/** module.exports for commonjs */
export default heml;

