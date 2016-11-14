/*!
 * minibase-tests <https://github.com/node-minibase/minibase-tests>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var suite = require('./index')
var MiniBase = require('minibase').MiniBase

function MyApp (options) {
  if (!(this instanceof MyApp)) {
    return new MyApp(options)
  }
  MiniBase.call(this, options)
}
MiniBase.extend(MyApp)

test('should expose a function', function (done) {
  test.strictEqual(typeof suite, 'function')
  done()
})

test('should throw TypeError if passed first argument is not a function', function (done) {
  function fixture () {
    suite(123)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /minibase-tests: expect `App` to be constructor/)
  done()
})

test('should given App pass all tests', function (done) {
  suite(MyApp, function (passed) {
    test.strictEqual(passed, 18)
    done()
  })
})
