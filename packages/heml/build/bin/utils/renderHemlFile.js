"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fsExtra = require("fs-extra");
var _ = _interopRequireDefault(require("../../"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function renderHemlFile(filepath, options) {
  const contents = await (0, _fsExtra.readFile)(filepath, 'utf8');
  const startTime = process.hrtime();
  const results = await (0, _.default)(contents, options);
  results.metadata.time = Math.round(process.hrtime(startTime)[1] / 1000000);
  return results;
}
var _default = exports.default = renderHemlFile;