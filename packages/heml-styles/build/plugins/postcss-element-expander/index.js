'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _postcss = _interopRequireDefault(require("postcss"));
var _coerceElements = _interopRequireDefault(require("./coerceElements"));
var _tagAliasSelectors = _interopRequireDefault(require("./tagAliasSelectors"));
var _findDirectElementSelectors = _interopRequireDefault(require("./findDirectElementSelectors"));
var _expanders = require("./expanders");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * elements var looks like this before being coerced
 *
 * {
 *   button: {
 *     '.button': [ { '@pseudo': 'root' }, { '@default': true }, 'background-color' ],
 *     '.text': [ { '@pseudo': 'text' }, { color: function() { tranform here } } ],
 *   },
 *   ...
 * }
 */
/**
 * aliases var looks like this
 *
 * {
 *   button: [ $node, $node, $node, ... ]
 *   ...
 * }
 */
/**
 * Convert CSS to match custom elements
 * @param  {Object} options.elements An object of elements that define how to
 *                                   split up the css for each element
 * @param  {[type]} options.$        A cheerio instance
 */
var _default = exports.default = _postcss.default.plugin('postcss-element-expander', ({
  elements,
  aliases
}) => {
  elements = (0, _coerceElements.default)(elements);
  return (root, result) => {
    for (let element of elements) {
      /**
       * add the element tag to any css selectors that implicitly target an element
       * .i.e. #my-button that selects <button id="my-button">click me</button>
       */
      root.walkRules(rule => {
        (0, _tagAliasSelectors.default)(element, aliases[element.tag], rule);
      });

      /**
       * There are 3 (non-mutually exclusive) possibilities when it contains the element tag
       *
       * 1. it directly targets the element - i.e. button { background: blue; }
       *    in this case we need generate entirely new rules, prepend before the original rule, and strip the used selectors
       *
       * 2. it uses an element tag as an ancestor/sibling - .i.e. button span { color: black; }
       *
       * 3. it uses an element pseudo element - .i.e. button::text { color: blue }
       */
      root.walkRules(new RegExp(element.tag, 'i'), rule => {
        /** CASE 1 */
        /** grab all the selectors that target this element */
        const elementSelectors = (0, _findDirectElementSelectors.default)(element, rule.selector);

        /** Create new rules to properly target the elements */
        const expandedRules = (0, _expanders.expandElementRule)(element, elementSelectors, rule);
        expandedRules.forEach(expandedRule => rule.before(expandedRule));

        /** remove the directly targeting selectors from the original rule */
        rule.selectors = rule.selectors.filter(selector => !elementSelectors.includes(selector));

        /** remove the rule if has no selectors */
        if (rule.selector.trim() === '') return rule.remove();

        /** CASE 2 */
        /** Replace all mentions of the element pseudo elements */
        rule.selector = (0, _expanders.replaceElementPseudoMentions)(element, rule.selector);

        /** CASE 3 */
        /** Replace all mentions of the element tag */
        rule.selector = (0, _expanders.replaceElementTagMentions)(element, rule.selector);
      });
    }
  };
});