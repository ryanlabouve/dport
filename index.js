#!/usr/bin/env node
var util = require('util');
var exec = require('child_process').exec;
var stdToObj = require('./lib/std-to-obj');

var child;

var program = require('commander')
  .version('1.0.0')
  .option('-k, --kill', 'Kill this process after it\'s found.')

program.on('--help', function() {
  console.log('Example: `misport 3000`');
  console.log('>>> info about what\'s running');
});

child = exec("lsof -i :4205", function(err, stdout, stderr) {
  stdToObj(stdout);
  // util.print('stdout: ' + stdout);
  // util.print('stderr: ' + stderr);
  //
  if (err !== null ) {
    console.log('exec error: ', err);
  }
});

program.parse(process.argv);
