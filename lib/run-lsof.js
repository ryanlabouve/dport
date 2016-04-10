var killAProcess = require('./kill-a-process');
var debug = require('debug')('run-lsof');
var stdoutToObj = require('./std-to-obj');
var exec = require('child_process').exec;
var _ = require('lodash');

var child;
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

    if(activeProcess) {
      killAProcess(activeProcess);
    } else {
      console.log('port already cleared');
    }
  });
}

module.exports = runLsof;
