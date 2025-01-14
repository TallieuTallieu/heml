import utils from '@tallieu_tallieu/heml-utils'; // eslint-disable-line no-unused-vars
import lodash from 'lodash';
const {
  sum,
  max,
  isUndefined
} = lodash;
const {
  createElement,
  transforms
} = utils;
export default createElement('row', {
  children: ['column'],
  rules: {
    '.row': [{
      '@pseudo': 'root'
    }, {
      display: transforms.trueHide('block')
    }],
    '.row__table': [{
      '@pseudo': 'table'
    }],
    '.row__row': [{
      '@pseudo': 'row'
    }]
  },
  render(attrs, contents) {
    attrs.class += ' row';
    return utils.renderElement("div", attrs, utils.renderElement("table", {
      class: "row__table",
      width: "100%",
      align: "center",
      role: "presentation",
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      style: "table-layout: fixed;"
    }, utils.renderElement("tr", {
      class: "row__row"
    }, contents)));
  },
  preRender({
    $
  }) {
    $.findNodes('row').forEach($row => {
      const $columns = $row.children().toNodes();
      const columnSizes = $columns.map($column => parseInt($column.attr('large') || 0, 10));
      const remainingSpace = 12 - sum(columnSizes);
      const remainingColumns = columnSizes.filter(size => size === 0).length;
      const spacePerColumn = max([Math.floor(remainingSpace / remainingColumns), 1]);
      const overageSpace = remainingSpace - spacePerColumn * remainingColumns;
      let filledColumns = 0;
      $columns.forEach($column => {
        if (isUndefined($column.attr('large'))) {
          filledColumns++;
          $column.attr('large', spacePerColumn + (filledColumns === remainingColumns ? overageSpace : 0));
        }
      });

      // if they don't add up to 12
      // and there are no specified columns
      if (remainingColumns === 0 && remainingSpace > 0) {
        $row.append('<td class="column-filler" style="padding: 0; mso-hide: all; max-height: 0px; overflow: hidden;"></td>');
      }
    });
  }
});