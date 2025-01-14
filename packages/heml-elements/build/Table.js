import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
const {
  createElement,
  transforms
} = utils;
const Table = createElement('table', {
  attrs: true,
  containsText: true,
  rules: {
    '.table': [{
      '@pseudo': 'root'
    }, '@default', {
      display: transforms.trueHide('table')
    }]
  },
  render(attrs, contents) {
    attrs.class += ' table';
    return utils.renderElement("table", attrs, contents);
  }
});
const Tr = createElement('tr', {
  attrs: true,
  containsText: true,
  rules: {
    '.tr': [{
      '@pseudo': 'root'
    }, '@default']
  },
  render(attrs, contents) {
    attrs.class += ' tr';
    return utils.renderElement("tr", attrs, contents);
  }
});
const Td = createElement('td', {
  attrs: true,
  containsText: true,
  rules: {
    '.td': [{
      '@pseudo': 'root'
    }, '@default']
  },
  render(attrs, contents) {
    attrs.class += ' td';
    return utils.renderElement("td", attrs, contents);
  }
});
export { Table, Tr, Td };