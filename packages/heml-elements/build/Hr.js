import HEML, { createElement, transforms, cssGroups, condition } from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import Style from './Style';
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
    return /*#__PURE__*/React.createElement("div", attrs, condition('mso | IE', `<table class="hr__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td>`), /*#__PURE__*/React.createElement("table", {
      class: "hr__table",
      role: "presentation",
      border: "0",
      align: "center",
      cellpadding: "0",
      cellspacing: "0",
      width: "100%",
      style: "table-layout: fixed;"
    }, /*#__PURE__*/React.createElement("tr", {
      class: "hr__row"
    }, /*#__PURE__*/React.createElement("td", {
      class: "hr__cell",
      width: "100%",
      align: "left",
      valign: "top"
    }, `&nbsp;`))), condition('mso | IE', `</td></tr></table>`), /*#__PURE__*/React.createElement(Style, {
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