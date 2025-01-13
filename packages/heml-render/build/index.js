"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;
Object.defineProperty(exports, "renderElement", {
  enumerable: true,
  get: function () {
    return _renderElement.default;
  }
});
var _lodash = require("lodash");
var _renderElement = _interopRequireDefault(require("./renderElement"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * preRender, render, and postRender all elements
 * @param  {Array}   elements  List of element definitons
 * @param  {Object}  globals
 * @return {Promise}           Returns an object with the cheerio object and metadata
 */
async function render($, options = {}) {
  const {
    elements = []
  } = options;
  const globals = {
    $,
    elements,
    options
  };
  const Meta = (0, _lodash.first)(elements.filter(({
    tagName
  }) => tagName === 'meta'));
  await preRenderElements(elements, globals);
  await renderElements(elements, globals);
  await postRenderElements(elements, globals);
  return {
    $,
    metadata: Meta ? Meta.flush() : {}
  };
}

/**
 * Run the async preRender functions for each element
 * @param  {Array}  elements  List of element definitons
 * @param  {Object} globals
 * @return {Promise}
 */
async function preRenderElements(elements, globals) {
  for (let element of elements) {
    await element.preRender(globals);
  }
}

/**
 * Run the async postRender functions for each element
 * @param  {Array}  elements  List of element definitons
 * @param  {Object} globals
 * @return {Promise}
 */
async function postRenderElements(elements, globals) {
  for (let element of elements) {
    await element.postRender(globals);
  }
}

/**
 * Renders all HEML elements
 * @param  {Array}  elements  List of element definitons
 * @param  {Object} globals
 * @return {Promise}
 */
async function renderElements(elements, globals) {
  const {
    $
  } = globals;
  const elementMap = (0, _lodash.keyBy)(elements, 'tagName');
  const metaTagNames = (0, _lodash.filter)(elements, {
    parent: ['head']
  }).map(({
    tagName
  }) => tagName);
  const nonMetaTagNames = (0, _lodash.difference)(elements.map(({
    tagName
  }) => tagName), metaTagNames);
  const $nodes = [...$.findNodes(metaTagNames), /** Render the meta elements first to last */
  ...$.findNodes(nonMetaTagNames).reverse() /** Render the elements last to first/outside to inside */];
  for (let $node of $nodes) {
    const element = elementMap[$node.prop('tagName').toLowerCase()];
    const contents = $node.html();
    const attrs = $node[0].attribs;
    const renderedValue = await Promise.resolve((0, _renderElement.default)(element, attrs, contents));
    $node.replaceWith(renderedValue.trim());
  }
}