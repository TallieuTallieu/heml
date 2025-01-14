function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import Style from './Style.js';
const {
  createElement,
  transforms,
  cssGroups
} = utils;
const {
  background,
  box,
  padding,
  border,
  borderRadius
} = cssGroups;
const breakpoint = 600;
export default createElement('column', {
  attrs: ['small', 'large'],
  parent: ['row'],
  defaultAttrs: {
    small: 12,
    large: 12
  },
  containsText: true,
  rules: {
    '.column': [{
      '@pseudo': 'root'
    }, {
      display: transforms.trueHide(undefined, true)
    }, background, box, padding, border, borderRadius, 'vertical-align']
  },
  render(attrs, contents) {
    const small = parseInt(attrs.small, 10);
    const large = parseInt(attrs.large, 10);
    const largeWidth = `${Math.round(100 * large / 12)}%`;
    attrs.class += ` column col-sm-${small}`;
    delete attrs.large;
    delete attrs.small;
    return [utils.renderElement("td", _extends({}, attrs, {
      width: largeWidth,
      style: `width: ${largeWidth};`,
      align: "left",
      valign: "top"
    }), contents.length === 0 ? '&nbsp;' : contents), small === large ? '' : utils.renderElement(Style, {
      for: "column",
      "heml-embed": true
    }, `
         @media only screen and (max-width: ${breakpoint}px) {
          .column, .column-filler { float: left; box-sizing: border-box; }
          .col-sm-${small} {
            width: ${Math.round(100 * small / 12)}% !important;
            display: block;
          }
        }
      `)];
  }
});