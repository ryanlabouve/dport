var debug = require('debug')('kill-a-proccess');
var exec = require('child_process').exec;
var inquirer = require('inquirer');
var _ = require('lodash');

function killAProcess(activeProcess) {
  debug('Active Process', JSON.stringify(activeProcess));
  var activePID = _.get(activeProcess, 'PID');
  debug('Active PID: ' + activePID);
  var killCommand = ["kill -9", activePID].join(' ');
  debug('Kill Command: ' + killCommand);

  var confirmKillText = 'Please confirm that you wish to kill ' + _.get(activeProcess, 'COMMAND') + ' (PID ' + _.get(activeProcess, 'PID') + ')';

  inquirer.prompt([{
    type: 'confirm',
    name: 'kill',
    message: confirmKillText
  }]).then(function(answers) {
    if(answers && answers.kill === true) {
      debug("<RUNNING> ", killCommand);
      exec(killCommand, function(err,stdout, stderr) {
        if (err) throw err;
        console.log("port cleared");
      });
    }
  });
}

module.exports = killAProcess;
