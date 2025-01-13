"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = develop;
var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _reload = _interopRequireDefault(require("reload"));
var _open = _interopRequireDefault(require("open"));
var _logUpdate = _interopRequireDefault(require("log-update"));
var _boxen = _interopRequireDefault(require("boxen"));
var _gaze = _interopRequireDefault(require("gaze"));
var _getPort = _interopRequireDefault(require("get-port"));
var _chalk = _interopRequireWildcard(require("chalk"));
var _isHemlFile = _interopRequireDefault(require("../utils/isHemlFile"));
var _renderHemlFile = _interopRequireDefault(require("../utils/renderHemlFile"));
var _buildErrorPage = _interopRequireDefault(require("../utils/buildErrorPage"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const errorBlock = _chalk.default.bgRed.white;
const {
  log
} = console;
async function develop(file, options) {
  const filepath = _path.default.resolve(file);
  const {
    port = 3000,
    open = false
  } = options;

  /** require .heml extention */
  if (!(0, _isHemlFile.default)(file)) {
    log(`${(0, _chalk.red)('ERROR')} ${file} must have ${(0, _chalk.yellow)('.heml')} extention`);
    process.exit(1);
  }
  try {
    const {
      update,
      url
    } = await startDevServer(_path.default.dirname(filepath), port);
    const {
      html,
      errors,
      metadata
    } = await (0, _renderHemlFile.default)(filepath);
    update({
      html,
      errors,
      metadata
    });
    if (open) (0, _open.default)(url);

    /** watch for file changes */
    (0, _gaze.default)(filepath, function (err) {
      if (err) throw err;
      this.on('changed', async changedFile => {
        const {
          html,
          errors,
          metadata
        } = await (0, _renderHemlFile.default)(filepath);
        update({
          html,
          errors,
          metadata
        });
      });
      this.on('deleted', async changedFile => {
        log(`${errorBlock(' Error ')} ${(0, _chalk.yellow)(file)} was deleted. Shutting down.`);
        process.exit();
      });
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      log(`${errorBlock(' Error ')} ${(0, _chalk.yellow)(file)} doesn't exist`);
    } else {
      log(`${errorBlock(' Error ')} ${err.message}`);
    }
    process.exit();
  }
}

/**
 * update the cli UI
 * @param  {String} params.url     URL for preview server
 * @param  {String} params.status  the current status
 * @param  {String} params.time    time to compile the heml
 * @param  {String} params.size    size of the HTML in mb
 */
function renderCLI({
  url,
  status,
  time,
  size
}) {
  return (0, _logUpdate.default)((0, _boxen.default)(`${_chalk.default.bgBlue.black(' HEML ')}\n\n` + `- ${_chalk.default.bold('Preview:')}         ${url}\n` + `- ${_chalk.default.bold('Status:')}          ${status}\n` + `- ${_chalk.default.bold('Compile time:')}    ${time}ms\n` + `- ${_chalk.default.bold('Total size:')}      ${size}`, {
    padding: 1,
    margin: 1
  }));
}

/**
 * Launches a server that reloads when the update function is called
 * @param  {String} defaultPreview  the default content for when the sever loads
 * @return {Object}                 { server, port, update }
 */
function startDevServer(directory, port = 3000) {
  let url;
  const app = (0, _express.default)();
  const {
    reload
  } = (0, _reload.default)(app);
  let preview = '';
  app.get('/', (req, res) => res.send(preview));
  app.use(_express.default.static(directory));
  function update({
    html,
    errors,
    metadata
  }) {
    let status = errors.length ? _chalk.default.red('failed') : _chalk.default.green('success');
    preview = errors.length ? (0, _buildErrorPage.default)(errors) : html.replace('</body>', '<script src="/reload/reload.js"></script></body>');
    renderCLI({
      url,
      status,
      time: metadata.time,
      size: metadata.size
    });
    reload();
  }
  return new Promise((resolve, reject) => {
    (0, _getPort.default)({
      port
    }).then(availablePort => {
      url = `http://localhost:${availablePort}`;
      app.listen(availablePort, () => resolve({
        update,
        url,
        app
      }));
    });
    process.on('uncaughtException', reject);
  });
}