var test = require('tape');
var stdToObj = require('../../lib/std-to-obj');

test('stdToObj', function (t) {
  t.plan(6);

  noOutput = '';
  t.deepEqual(
    stdToObj(noOutput),
    {},
    'No input should yield empty object');

  onlyFirstRow = 'TITLE1 TITLE2 TITLE3 TITLE4';
  t.deepEqual(
    stdToObj(onlyFirstRow),
    [],
    'Only passing titles should result in empty object');

  happyPath= 'TITLE1 TITLE2 TITLE3 TITLE4\nval1 val2 val3 val4';
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

  tooManyTitles= 'TITLE1 TITLE2 TITLE3 TITLE4\nval1 val2 val3';
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

  tooManyValues= 'TITLE1 TITLE2 TITLE3\nval1 val2 val3 val4';
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

  tooManyValues= 'TITLE1 TITLE2 TITLE3 TITLE4\nval1 val2 val3 val4\n';
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
