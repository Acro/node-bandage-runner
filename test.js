'use strict'

/*!
 * imports.
 */

var test = require('bandage')
var path = require('path')

/*!
 * imports (local).
 */

var autorun = require('./')

/*!
 * default test file fixtures.
 */

var fixtures = [
  { name: './test', file: 'root-test.test.js' }
]

/*!
 * autorun files.
 */

var autorunFiles = autorun().map(basename)

/*!
 * tests.
 */

test('autorun() locates test files in default locations', function * (t) {
  t.plan(fixtures.length)

  fixtures.forEach(function (f) {
    t.ok(exists(f.file), f.name)
  })
})

/*!
 * Whether file exists.
 *
 * @param {String} file
 * @return {Boolean}
 */

function exists (file) {
  return !!~autorunFiles.indexOf(file)
}

/*!
 * Return file's basename.
 *
 * @param {String} file
 * @return {String}
 */

function basename (file) {
  return path.basename(file)
}

