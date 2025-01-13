"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;
var _path = _interopRequireDefault(require("path"));
var _fsExtra = require("fs-extra");
var _chalk = _interopRequireWildcard(require("chalk"));
var _isHemlFile = _interopRequireDefault(require("../utils/isHemlFile"));
var _renderHemlFile = _interopRequireDefault(require("../utils/renderHemlFile"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const errorBlock = _chalk.default.bgRed.black;
const successBlock = _chalk.default.bgGreen.black;
const {
  log
} = console;
async function build(file, options) {
  const filepath = _path.default.resolve(file);
  const outputpath = _path.default.resolve(options.output || file.replace(/\.heml$/, '.html'));

  /** require .heml extention */
  if (!(0, _isHemlFile.default)(file)) {
    log(`${(0, _chalk.red)('ERROR')} ${file} must have ${(0, _chalk.yellow)('.heml')} extention`);
    process.exit(1);
  }
  try {
    log(`${_chalk.default.bgBlue.black(' COMPILING ')}`);
    log(`${(0, _chalk.blue)(' -')} Reading ${file}`);
    log(`${(0, _chalk.blue)(' -')} Building HEML`);
    const {
      html,
      metadata,
      errors
    } = await (0, _renderHemlFile.default)(filepath, options);
    log(`${(0, _chalk.blue)(' -')} Writing ${metadata.size}`);
    await (0, _fsExtra.writeFile)(outputpath, html);
    const relativePath = (0, _chalk.yellow)(_path.default.relative(process.cwd(), outputpath));
    log(errors.length ? `\n${errorBlock(' DONE ')} Compiled with errors to ${(0, _chalk.yellow)(relativePath)} in ${metadata.time}ms\n` : `\n${successBlock(' DONE ')} Compiled successfully to ${(0, _chalk.yellow)(relativePath)} in ${metadata.time}ms\n`);
    if (errors.length) {
      log((0, _chalk.red)(`${errors.length} ${errors.length > 1 ? 'errors' : 'error'} `));
      errors.forEach(err => log(`> ${(0, _chalk.yellow)(err.selector)}\n  ${err.message}`));
    }
  } catch (err) {
    log(`\n${errorBlock(' ERROR ')} ${err.message}\n${(0, _chalk.dim)(err.stack)}`);
  }
}