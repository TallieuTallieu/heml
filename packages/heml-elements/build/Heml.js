import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
const {
  createElement
} = utils;
export default createElement('heml', {
  unique: true,
  parent: [],
  children: ['head', 'body'],
  defaultAttrs: {
    'lang': 'en',
    'xmlns': 'http://www.w3.org/1999/xhtml',
    'xmlns:v': 'urn:schemas-microsoft-com:vml',
    'xmlns:o': 'urn:schemas-microsoft-com:office:office'
  },
  render(attrs, contents) {
    return [`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`, utils.renderElement("html", attrs, contents)];
  }
});