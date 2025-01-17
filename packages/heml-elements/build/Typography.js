import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import lodash from 'lodash';
const {
  merge
} = lodash;
const {
  createElement,
  transforms,
  cssGroups
} = utils;
const {
  margin,
  background,
  border,
  borderRadius,
  text,
  font
} = cssGroups;

/**
 * create mergable text element
 * @param  {String} name
 * @param  {Object} element
 * @return {Object}
 */
function createTextElement(name, element = {}) {
  let classToAdd = '';
  const Tag = name;
  if (/^h\d$/i.test(name)) {
    classToAdd = 'header';
  } else {
    classToAdd = 'text';
  }
  return createElement(name, merge({
    attrs: true,
    rules: {
      [`.${name}.${classToAdd}`]: [{
        '@pseudo': 'root'
      }, '@default', {
        display: transforms.trueHide()
      }, margin, background, border, borderRadius, text, font]
    },
    render(attrs, contents) {
      attrs.class += ` ${classToAdd} ${name}`;
      return utils.renderElement(Tag, attrs, contents);
    }
  }, element));
}
const H1 = createTextElement('h1');
const H2 = createTextElement('h2');
const H3 = createTextElement('h3');
const H4 = createTextElement('h4');
const H5 = createTextElement('h5');
const H6 = createTextElement('h6');
const P = createTextElement('p');
const Ol = createTextElement('ol');
const Ul = createTextElement('ul');
const Li = createTextElement('li');
const A = createElement('a', {
  attrs: true,
  defaultAttrs: {
    href: '#'
  },
  rules: {
    '.a': [{
      '@pseudo': 'root'
    }, {
      '@default': true
    }, {
      display: transforms.trueHide('inline')
    }, 'color', 'text-decoration'],
    '.a__text': [{
      '@pseudo': 'text'
    }, 'color', 'text-decoration']
  },
  render(attrs, contents) {
    attrs.class += ' a';
    return utils.renderElement("a", attrs, utils.renderElement("span", {
      class: "a__text"
    }, contents));
  }
});
export { H1, H2, H3, H4, H5, H6, P, Ol, Ul, Li, A };