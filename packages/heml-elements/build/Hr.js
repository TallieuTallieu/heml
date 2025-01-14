import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import Style from './Style.js';
const {
  createElement,
  transforms,
  cssGroups,
  condition
} = utils;
const {
  trueHide,
  ieAlignFallback
} = transforms;
const {
  background,
  margin,
  padding,
  border,
  borderRadius,
  width,
  height,
  table,
  box
} = cssGroups;
export default createElement('hr', {
  children: false,
  rules: {
    '.hr': [{
      '@pseudo': 'root'
    }, {
      display: trueHide()
    }, margin, width],
    '.hr__table__ie': ['width', 'max-width', {
      [margin]: ieAlignFallback
    }],
    '.hr__table': [{
      '@pseudo': 'table'
    }, table],
    '.hr__row': [{
      '@pseudo': 'row'
    }],
    '.hr__cell': [{
      '@pseudo': 'cell'
    }, height, background, box, padding, border, borderRadius, 'vertical-align']
  },
  render(attrs, contents) {
    attrs.class += ' hr';
    return utils.renderElement("div", attrs, condition('mso | IE', `<table class="hr__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td>`), utils.renderElement("table", {
      class: "hr__table",
      role: "presentation",
      border: "0",
      align: "center",
      cellpadding: "0",
      cellspacing: "0",
      width: "100%",
      style: "table-layout: fixed;"
    }, utils.renderElement("tr", {
      class: "hr__row"
    }, utils.renderElement("td", {
      class: "hr__cell",
      width: "100%",
      align: "left",
      valign: "top"
    }, `&nbsp;`))), condition('mso | IE', `</td></tr></table>`), utils.renderElement(Style, {
      for: "hr"
    }, `
          hr {
            width: 100%;
            margin: auto;
            border-top: 1px solid #9A9A9A;
          }
        `));
  }
});