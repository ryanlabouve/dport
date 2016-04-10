#!/usr/bin/env node
var util = require('util');
var exec = require('child_process').exec;
var stdoutToObj = require('./lib/std-to-obj');
var killAProcess = require('./lib/kill-a-process');
var _ = require('lodash');
var debug = require('debug')('main');

var child;

var program = require('commander')
  .version('1.0.0')
  .option('-k, --kill', 'Kill this process after it\'s found.');

var portOfInterest = _.get(process.argv, 2);

if (!portOfInterest) {
  throw "Must Provide Port";
}

program.on('--help', function() {
  debug('Example: `misport 3000`');
  debug('>>> info about what\'s running');
});

function runLsof(port) {
  var portLookup = ["lsof -i :", port].join('');
  debug("Running lookup: ", portLookup);

  child = exec(portLookup, function(err, stdout, stderr) {
    var lsofResults = stdoutToObj(stdout, /(LISTEN)/);
    debug('~> Found ' + lsofResults.length + ' result(s)');

    var activeProcess = _.find(lsofResults, function(p) {
      return _.get(p, '_active') === true;
    });

    debug(activeProcess);

    killAProcess(activeProcess);
  });
}

function killAProcess(activeProcess) {
  var activePID = _.get(activeProcess, 'PID');
  debug('~*~*~*~', activePID);
  var killCommand = ["kill -9", activePID].join(' ');
  debug(killCommand);
  // exec(killCommand, function(err,stdout, stderr) {
  //   if (err) throw err;
  //   console.log("misport success");
  // });
  //
}

runLsof(portOfInterest);
program.parse(process.argv);
