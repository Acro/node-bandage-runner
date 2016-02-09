# bandage-runner
> A [bandage] runner API allowing you to create custom test runners.

[![Build Status](http://img.shields.io/travis/Pajk/node-bandage-runner.svg)](https://travis-ci.org/Pajk/node-bandage-runner) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) [![npm](https://img.shields.io/npm/v/bandage-runner.svg)](https://www.npmjs.org/package/bandage-runner)

```shell
npm install bandage-runner --save-dev
```

## Usage

###### test.js

```js
var runner = require('bandage-runner')
var testHelper = require('./your-test-helper')
var dependencyContainer = require('./your-dependency-container')

var testParams = [testHelper, dependencyContainer]

runner(testParams)
```

###### test/example.test.js

```js
module.exports = function(should, helper, container) {
  should('be awesome', function* (t) {
    t.ok(true, 'checked')
  }
}
```

###### package.json

```js
{
  "scripts": {
    "test": "node test.js"
  }
}
```

## Features

 - Auto-locates tests in the `test` directory.
 - Supports naming test files `*.test.js`, `*.tests.js`, `test.js`, and `tests.js`.
 - Supports passing values into tests.
 - Supports passing in an alternative array of test files (ignores the default file glob).

## API

### `runner(params, file, endCb)`

###### arguments

 - `[params]: (Array)` parameters to pass to exported test function.
 - `[files] (Array|String)` exact path(s) of file(s) containing tests.
 - `[endCb] (Function)` function which is called after all tests finish.

[bandage]: https://www.npmjs.com/package/bandage

