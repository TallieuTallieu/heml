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
export default createElement('container', {
  containsText: true,
  rules: {
    '.container': [{
      '@pseudo': 'root'
    }, {
      display: trueHide('block')
    }, margin, width],
    '.container__table__ie': ['width', 'max-width', {
      [margin]: ieAlignFallback
    }],
    '.container__table': [{
      '@pseudo': 'table'
    }, table],
    '.container__row': [{
      '@pseudo': 'row'
    }],
    '.container__cell': [{
      '@pseudo': 'cell'
    }, height, background, box, padding, border, borderRadius]
  },
  render(attrs, contents) {
    attrs.class += ' container';
    return utils.renderElement("div", attrs, condition('mso | IE', `<table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td>`), utils.renderElement("table", {
      class: "container__table",
      role: "presentation",
      border: "0",
      align: "center",
      cellpadding: "0",
      cellspacing: "0",
      width: "100%"
    }, utils.renderElement("tr", {
      class: "container__row"
    }, utils.renderElement("td", {
      class: "container__cell",
      width: "100%",
      align: "left",
      valign: "top"
    }, contents))), condition('mso | IE', `</td></tr></table>`), utils.renderElement(Style, {
      for: "container"
    }, `
          container {
            max-width: 600px;
            width: 100%;
            margin: auto;
          }
        `));
  }
});