#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));
var _lodash = require("lodash");
var _develop = _interopRequireDefault(require("./commands/develop"));
var _build = _interopRequireDefault(require("./commands/build"));
var _package = require("../../package");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const commands = ['develop', 'build'];
const args = process.argv.slice(2);
_commander.default.usage('<command> [options]').version(_package.version);
_commander.default.command('develop <file>').description('Develop your email locally.').option('--open', 'Open the email in your browser').option('-p, --port <number>', 'Port for server', 3000).action(_develop.default);
_commander.default.command('build <file>').description('Build an HEML email for sending in the wild.').option('-o, --output <file>', 'The output HTML file').option('-v, --validate [level]', 'Sets the validation level', /^(none|soft|strict)$/i, 'soft').action(_build.default);
if (args.length === 0 || !commands.includes((0, _lodash.first)(args)) && !(0, _lodash.first)(args).startsWith('-')) {
  _commander.default.outputHelp();
}
_commander.default.parse(process.argv);