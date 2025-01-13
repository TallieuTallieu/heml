"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _isPromise = _interopRequireDefault(require("is-promise"));
var _lodash = require("lodash");
var _createHtmlElement = _interopRequireDefault(require("./createHtmlElement"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name, attrs, ...contents) {
  /** catch all promises in this content and wait for them to finish */
  if (contents.filter(_isPromise.default).length > 0) {
    return Promise.all(contents).then(contents => render(name, attrs, contents.join('')));
  }
  return render(name, attrs, contents.join(''));
}
function render(name, attrs, contents) {
  if (!name || (0, _lodash.isPlainObject)(name) && !name.render) {
    throw new Error(`name must be a HEML element or HTML tag name (.e.g 'td'). Received: ${JSON.stringify(name)}`);
  }
  if ((0, _lodash.isPlainObject)(name) && name.render) {
    /** set the defaults and massage attribute values */
    attrs = (0, _lodash.defaults)({}, attrs, name.defaultAttrs || {});
    attrs = (0, _lodash.mapValues)(attrs, (value, name) => {
      if (value === '' && name !== 'class' || value === 'true' || value === 'on') {
        return true;
      }
      if (value === 'false' || value === 'off') {
        return false;
      }
      return value;
    });

    /**
     * custom elements can return promises, arrays, or strings
     *
     * we will:
     * 1. check for the shorthands and render on that
     * 2. return a string synchronously if we can
     * 3. return a string in a promise
     */
    const renderResults = (0, _lodash.castArray)(name.render(attrs, contents));

    /** 1. catch shorthands for rerendering the element */
    if (renderResults.length === 1 && renderResults[0] === true) {
      return render(name.tagName, attrs, contents);
    }

    /** 2. we want to return synchronously if we can */
    if (renderResults.filter(_isPromise.default).length === 0) {
      return (0, _lodash.compact)(renderResults).join('');
    }

    /** otherwise, combine the array of promises/strings into a single string */
    return Promise.all(renderResults).then(results => {
      return (0, _lodash.compact)((0, _lodash.flattenDeep)(results)).join('');
    });
  }

  /** if we have a regular ol element go ahead and convert it to a string */
  if (attrs && attrs.class === '') {
    delete attrs.class;
  }
  if (attrs && attrs.class) {
    attrs.class = attrs.class.trim();
  }
  return (0, _createHtmlElement.default)({
    name,
    attrs,
    contents
  });
}