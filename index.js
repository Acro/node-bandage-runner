'use strict'

var glob = require('globby').sync
var path = require('path')
var bandage = require('bandage')
var check = require('syntax-error')
var fs = require('fs')

var patterns = [
  'test/**/*.test{,s}.js',
  'test/**/test{,s}.js'
]

function runner (params, files, endCb) {
  var list

  if (files) {
    list = Array.isArray(files) ? files : [files]
  } else {
    list = globs()
  }

  var testParams = [bandage].concat(params)

  list.forEach(function (file) {
    try {
      var func = require(path.resolve(file))
    } catch (e) {
      if (e instanceof SyntaxError) {
        var src = fs.readFileSync(path.resolve(file))
        var err = check(src, file)
        throw err
      } else {
        throw e
      }
    }

    if (typeof func === 'function') {
      func.apply(null, testParams)
    }
  })

  if (!endCb) {
    endCb = function () {}
  }

  bandage.run(null, endCb)

  return list
}

function globs () {
  return glob(patterns.map(rootify))
}

function rootify (pattern) {
  return path.resolve(process.cwd(), pattern)
}

module.exports = runner

