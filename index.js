#!/usr/bin/env node
var debug = require('debug')('main');
var runLsof = require('./lib/run-lsof');

var program = require('commander')
  .version(require('./package.json').version)
  .option('-k, --kill', 'Kill this process after it\'s found.')
  .parse(process.argv);

program.on('--help', function() {
  debug('Example: `dport 3000`');
  debug('>>> info about what\'s running');
});

if (!program.args.length) {
  program.help();
} else {
  runLsof(program.args[0]);
}
