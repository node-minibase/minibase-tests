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
var Base = require('base')
var Assemble = require('assemble-core')
var Templates = require('templates')
var MiniBase = require('minibase').MiniBase

var version = process.version.match(/^.(\d+)\.(\d+)/)
var major = version[1]
var minor = version[2]

function MyApp (options) {
  if (!(this instanceof MyApp)) {
    return new MyApp(options)
  }
  this.options = { silent: true }
  MiniBase.call(this, options)
}
MiniBase.extend(MyApp)

function BaseApp () {
  if (!(this instanceof BaseApp)) {
    return new BaseApp()
  }
  Base.call(this)
}
Base.extend(BaseApp)

test('should expose a function', function (done) {
  test.strictEqual(typeof suite, 'function')
  done()
})

test('should suite(123) reject with TypeError if App not a function', function (done) {
  suite(123).catch(function (err) {
    test.strictEqual(err.name, 'TypeError')
    test.strictEqual(err.message, 'minibase-tests: expect `App` to be constructor')
    done()
  })
})

test('should given App and MiniBase itself pass all tests', function (done) {
  suite(MyApp).runTests().then(function (res) {
    test.strictEqual(res.length, 0)
    return suite(MiniBase).runTests().then(function (tests) {
      var len = tests.length
      test.strictEqual(len, 0)
      done()
    }, done)
  }, done)
})

test('should `base` and Base-based app pass most of these tests', function (done) {
  var opts = { isBase: true }
  suite(Base, opts).runTests()
    .then(function (res) {
      test.strictEqual(res.length, 0)
      return suite(BaseApp, opts).runTests()
    }, done)
    .then(function (passed) {
      test.strictEqual(passed.length, 0)
      done()
    }, done)
})

test('should Templates and AssembleCore apps pass all tests', function (done) {
  if (major > 0 || minor > 11) {
    suite(Templates, { isBase: true }).runTests().then(function (result) {
      var length = result.length
      test.strictEqual(length === 0, true)
      return suite(Assemble, { isBase: true }).runTests()
    }, done)
    .then(function (pass) {
      test.strictEqual(pass.length, 0)
      done()
    }, done)
    return
  }
  done()
})
