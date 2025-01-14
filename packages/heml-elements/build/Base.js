import Meta from './Meta.js';
import isAbsoluteUrl from 'is-absolute-url';
import { resolve } from 'url';
import lodash from 'lodash';
import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars

const {
  has,
  first
} = lodash;
const {
  createElement
} = utils;
export default createElement('base', {
  parent: ['head'],
  children: false,
  unique: true,
  defaultAttrs: {
    href: ''
  },
  render(attrs, contents) {
    Meta.set('base', attrs.href);
    return false;
  },
  preRender({
    $
  }) {
    const base = first($.findNodes('base'));
    if (base) {
      const baseUrl = base.attr('href');
      $('[href], [src]').each((i, node) => {
        const attr = has(node.attribs, 'href') ? 'href' : 'src';
        if (has(node.attribs, attr) && !isAbsoluteUrl(node.attribs[attr])) {
          node.attribs[attr] = resolve(baseUrl, node.attribs[attr]);
        }
      });
    }
  }
});