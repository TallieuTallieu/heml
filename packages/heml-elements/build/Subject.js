import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import Meta from './Meta.js';
const {
  createElement
} = utils;
export default createElement('subject', {
  parent: ['head'],
  unique: true,
  render(attrs, contents) {
    Meta.set('subject', contents);
    return false;
  },
  flush() {
    return Meta.get('subject') || '';
  }
});