"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _postcss = _interopRequireDefault(require("postcss"));
var _postcssSafeParser = _interopRequireDefault(require("postcss-safe-parser"));
var _postcssDiscardComments = _interopRequireDefault(require("postcss-discard-comments"));
var _postcssMinifyGradients = _interopRequireDefault(require("postcss-minify-gradients"));
var _postcssNormalizeDisplayValues = _interopRequireDefault(require("postcss-normalize-display-values"));
var _postcssNormalizeTimingFunctions = _interopRequireDefault(require("postcss-normalize-timing-functions"));
var _postcssConvertValues = _interopRequireDefault(require("postcss-convert-values"));
var _postcssCalc = _interopRequireDefault(require("postcss-calc"));
var _postcssOrderedValues = _interopRequireDefault(require("postcss-ordered-values"));
var _postcssMinifySelectors = _interopRequireDefault(require("postcss-minify-selectors"));
var _postcssMinifyParams = _interopRequireDefault(require("postcss-minify-params"));
var _postcssDiscardOverridden = _interopRequireDefault(require("postcss-discard-overridden"));
var _postcssNormalizeString = _interopRequireDefault(require("postcss-normalize-string"));
var _postcssMinifyFontValues = _interopRequireDefault(require("postcss-minify-font-values"));
var _postcssNormalizeRepeatStyle = _interopRequireDefault(require("postcss-normalize-repeat-style"));
var _postcssNormalizePositions = _interopRequireDefault(require("postcss-normalize-positions"));
var _postcssDiscardEmpty = _interopRequireDefault(require("postcss-discard-empty"));
var _postcssUniqueSelectors = _interopRequireDefault(require("postcss-unique-selectors"));
var _cssDeclarationSorter = _interopRequireDefault(require("css-declaration-sorter"));
var _postcssMergeAdjacentMedia = _interopRequireDefault(require("./plugins/postcss-merge-adjacent-media"));
var _postcssDiscardDuplicates = _interopRequireDefault(require("postcss-discard-duplicates"));
var _postcssMergeRules = _interopRequireDefault(require("postcss-merge-rules"));
var _postcssRgbaHex = _interopRequireDefault(require("postcss-rgba-hex"));
var _postcssColornamesToHex = _interopRequireDefault(require("postcss-colornames-to-hex"));
var _postcssColorRgbaFallback = _interopRequireDefault(require("postcss-color-rgba-fallback"));
var _postcssHexFormat = _interopRequireDefault(require("postcss-hex-format"));
var _postcssExpandShorthand = _interopRequireDefault(require("./plugins/postcss-expand-shorthand"));
var _postcssEmailImportant = _interopRequireDefault(require("postcss-email-important"));
var _postcssZeroOutMargin = _interopRequireDefault(require("./plugins/postcss-zero-out-margin"));
var _postcssElementExpander = _interopRequireDefault(require("./plugins/postcss-element-expander"));
var _postcssMergeLonghand = _interopRequireDefault(require("postcss-merge-longhand"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/** optimize css - credz to cssnano */

/** format colors */

/** email fixes */

/** custom element expander */

async function hemlstyles(contents, options = {}) {
  const {
    elements = {},
    aliases = {},
    plugins = []
  } = options;
  return (0, _postcss.default)([...plugins,
  // /** optimize css */
  (0, _postcssDiscardComments.default)({
    removeAll: false
  }), (0, _postcssMinifyGradients.default)(), (0, _postcssNormalizeDisplayValues.default)(), (0, _postcssNormalizeTimingFunctions.default)(), (0, _postcssConvertValues.default)({
    length: false
  }), (0, _postcssCalc.default)(), (0, _postcssOrderedValues.default)(), (0, _postcssMinifySelectors.default)(), (0, _postcssMinifyParams.default)(), (0, _postcssDiscardOverridden.default)(), (0, _postcssNormalizeString.default)(), (0, _postcssMinifyFontValues.default)({
    removeQuotes: false
  }), (0, _postcssNormalizeRepeatStyle.default)(), (0, _postcssNormalizePositions.default)(), (0, _postcssDiscardEmpty.default)(), (0, _postcssUniqueSelectors.default)(), (0, _cssDeclarationSorter.default)(), (0, _postcssMergeAdjacentMedia.default)(), (0, _postcssDiscardDuplicates.default)(), (0, _postcssMergeRules.default)(), /** color handling */
  (0, _postcssColornamesToHex.default)(), (0, _postcssRgbaHex.default)({
    rgbOnly: true,
    silent: true
  }), (0, _postcssColorRgbaFallback.default)(), (0, _postcssHexFormat.default)(), /** email fixes */
  (0, _postcssEmailImportant.default)(), (0, _postcssExpandShorthand.default)(),
  // so we can match for margin-top/margin-left etc.
  (0, _postcssZeroOutMargin.default)(), /** expanding to match heml elements */
  (0, _postcssElementExpander.default)({
    elements,
    aliases
  }), (0, _postcssMergeLonghand.default)(), (0, _postcssDiscardEmpty.default)()]).process(contents, {
    parser: _postcssSafeParser.default
  });
}
var _default = exports.default = hemlstyles;