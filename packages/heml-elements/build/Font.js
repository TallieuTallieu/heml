import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
const {
  createElement
} = utils;
export default createElement('font', {
  parent: ['head'],
  children: false,
  defaultAttrs: {
    href: ''
  },
  render(attrs, contents) {
    return [`<!--[if !mso]><!-->`, utils.renderElement("link", {
      href: attrs.href,
      rel: "stylesheet",
      type: "text/css"
    }), utils.renderElement("style", {
      type: "text/css"
    }, `@import url(${attrs.href});`), `<!--<![endif]-->`];
  }
});