"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hemlUtils = _interopRequireWildcard(require("@tallieu_tallieu/heml-utils"));
var _lodash = require("lodash");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-line no-unused-vars
var _default = exports.default = (0, _hemlUtils.createElement)('row', {
  children: ['column'],
  rules: {
    '.row': [{
      '@pseudo': 'root'
    }, {
      display: _hemlUtils.transforms.trueHide('block')
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
    return /*#__PURE__*/React.createElement("div", attrs, /*#__PURE__*/React.createElement("table", {
      class: "row__table",
      width: "100%",
      align: "center",
      role: "presentation",
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      style: "table-layout: fixed;"
    }, /*#__PURE__*/React.createElement("tr", {
      class: "row__row"
    }, contents)));
  },
  preRender({
    $
  }) {
    $.findNodes('row').forEach($row => {
      const $columns = $row.children().toNodes();
      const columnSizes = $columns.map($column => parseInt($column.attr('large') || 0, 10));
      const remainingSpace = 12 - (0, _lodash.sum)(columnSizes);
      const remainingColumns = columnSizes.filter(size => size === 0).length;
      const spacePerColumn = (0, _lodash.max)([Math.floor(remainingSpace / remainingColumns), 1]);
      const overageSpace = remainingSpace - spacePerColumn * remainingColumns;
      let filledColumns = 0;
      $columns.forEach($column => {
        if ((0, _lodash.isUndefined)($column.attr('large'))) {
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