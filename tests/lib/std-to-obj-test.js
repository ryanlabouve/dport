var test = require('tape');
var stdToObj = require('../../lib/std-to-obj');

test('stdToObj', function (t) {
  t.plan(6);

  var noOutput = '';
  t.deepEqual(
    stdToObj(noOutput),
    {},
    'No input should yield empty object');

  var onlyFirstRow = 'TITLE1 TITLE2 TITLE3 TITLE4';
  t.deepEqual(
    stdToObj(onlyFirstRow),
    [],
    'Only passing titles should result in empty object');

  var happyPath= 'TITLE1 TITLE2 TITLE3 TITLE4\nval1 val2 val3 val4';
  t.deepEqual(
    stdToObj(happyPath),
    [
      {
        "TITLE1": "val1",
        "TITLE2": "val2",
        "TITLE3": "val3",
        "TITLE4": "val4"
      }
    ],
    'Happy path works'
  );

  var tooManyTitles= 'TITLE1 TITLE2 TITLE3 TITLE4\nval1 val2 val3';
  t.deepEqual(
    stdToObj(tooManyTitles),
    [
      {
        "TITLE1": "val1",
        "TITLE2": "val2",
        "TITLE3": "val3",
        "TITLE4": undefined
      }
    ],
    'Missing properties should be undefined'
  );

  var tooManyValues= 'TITLE1 TITLE2 TITLE3\nval1 val2 val3 val4';
  t.deepEqual(
    stdToObj(tooManyValues),
    [
      {
        "TITLE1": "val1",
        "TITLE2": "val2",
        "TITLE3": "val3",
      }
    ],
    'Extra properties should be thrown away'
  );

  var tooManyValues= 'TITLE1 TITLE2 TITLE3 TITLE4\nval1 val2 val3 val4\n';
  t.deepEqual(
    stdToObj(tooManyValues),
    [
      {
        "TITLE1": "val1",
        "TITLE2": "val2",
        "TITLE3": "val3",
        "TITLE4": "val4",
      }
    ],
    'Extra newlines should not result in another row'
  );
});

test('stdToObj marked as active', function (t) {
  t.plan(3);

  var happyPath = 'TITLE1 TITLE2 TITLE3\nval1 val2 val3 (LISTEN)';
  var happyPathRes = stdToObj(happyPath, /(LISTEN)/);
  t.equal(
    happyPathRes[0]['_active'],
    true,
    'found active marker and marked active');

  var invalidPath = 'TITLE1 TITLE2 TITLE3\nval1 val2 val3';
  t.equal(
    stdToObj(invalidPath, /(LISTEN)/)[0]['_active'],
    false,
    'didn\'t find active marker and marked active');

  var undefinedPath = 'TITLE1 TITLE2 TITLE3\nval1 val2 val3';
  t.equal(
    stdToObj(undefinedPath)['_active'],
    undefined,
    'didn\'t pass active marker, so should be undefined');
});
