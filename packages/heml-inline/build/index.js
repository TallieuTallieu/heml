import juice from 'juice';
import inlineMargins from './inlineMargins.js';
import fixWidthsFor from './fixWidthsFor.js';
import removeProcessingIds from './removeProcessingIds.js';
import preferMaxWidth from './preferMaxWidth.js';
function inline($, options = {}) {
  const {
    juice: juiceOptions = {}
  } = options;
  juice.juiceDocument($, {
    ...juiceOptions
  });
  inlineMargins($);
  preferMaxWidth($, '[class$="__ie"]');
  fixWidthsFor($, 'img, .block__table__ie, .column');
  removeProcessingIds($);
  return $;
}
export default inline;