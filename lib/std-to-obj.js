var _ = require('lodash');

function stdToObj(std) {
  var lines = std.trim().split('\n');
  var titles = null;
  var ret = [];

  var i=0;
  for (i; i < lines.length; i +=1) {
    var tokens = lines[i].split(/\s+/);
    if (i === 0) {
      titles = tokens;
    } else {
      var row = {};

      _.forEach(titles, function(title,index) {
        row[title] = tokens[index];
      });

      ret.push(row);
    }
  }

  return ret;
}

module.exports = stdToObj;
