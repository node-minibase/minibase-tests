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

test('should given App pass all tests', function (done) {
  suite(MyApp).runTests().then(function (res) {
    test.strictEqual(res.length, 18)
    done()
  }, done)
})

test('should `base` and Base apps pass most of these tests', function (done) {
  suite(Base, { isBase: true }).runTests()
    .then(function (res) {
      test.strictEqual(res.length, 18)
      return suite(BaseApp, { isBase: true }).runTests()
    })
    .then(function (passed) {
      test.strictEqual(passed.length, 18)
      if (major > 0 || minor > 11) {
        suite(Templates, { isBase: true }).runTests().then(function (result) {
          test.strictEqual(result.length, 18)
          return suite(Assemble, { isBase: true }).runTests()
        }).then(function (pass) {
          test.strictEqual(pass.length, 18)
          done()
        })
        return
      }
      done()
    })
})

test('should MiniBase itself pass all tests', function (done) {
  suite(MiniBase).runTests().then(function (tests) {
    test.strictEqual(tests.length, 18)
    done()
  }, done)
})
