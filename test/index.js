const eslint = require('eslint');
const test = require('tape');
const path = require('path');

const linter = new eslint.CLIEngine({
  configFile: path.join(__dirname, '..', 'eslintrc.json')
});

test('api: lintText', function(t) {
  t.plan(4);

  const result = linter.executeOnText("console.log('hi there')\n\n;(function () { }())");

  t.equals(result.results[0].messages.length, 3);
  t.equals(result.results[0].messages[0].message, 'Unexpected space before function parentheses.');
  t.equals(result.results[0].messages[1].message, 'Newline required at end of file but not found.');
  t.equals(result.results[0].messages[2].message, 'Missing semicolon.');
});
