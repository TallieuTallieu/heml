"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * remove all ids used for processing only
 * @param  {Cheerio} $
 */
function removeProcessingIds($) {
  $('[id^="heml-"]').removeAttr('id');
}
var _default = exports.default = removeProcessingIds;