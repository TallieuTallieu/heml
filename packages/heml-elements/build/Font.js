import HEML, { createElement } from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars

export default createElement('font', {
  parent: ['head'],
  children: false,
  defaultAttrs: {
    href: ''
  },
  render(attrs, contents) {
    return [`<!--[if !mso]><!-->`, /*#__PURE__*/React.createElement("link", {
      href: attrs.href,
      rel: "stylesheet",
      type: "text/css"
    }), /*#__PURE__*/React.createElement("style", {
      type: "text/css"
    }, `@import url(${attrs.href});`), `<!--<![endif]-->`];
  }
});