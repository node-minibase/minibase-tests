/*!
 * minibase-tests <https://github.com/node-minibase/minibase-tests>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var assert = require('assert-kindof')
var EventEmitter3 = require('eventemitter3')
var MiniBase = require('minibase').MiniBase
var test = require('mukla')

module.exports = function minibaseTests (App, end) {
  if (typeof App !== 'function') {
    throw new TypeError('minibase-tests: expect `App` to be constructor')
  }
  var count = 0
  var app = App()

  setTimeout(function () {
    test('should return an instance of MiniBase with or without `new` keyword', function (done) {
      test.strictEqual((new App()) instanceof MiniBase, true)
      test.strictEqual(App() instanceof MiniBase, true)
      count++
      done()
    })

    test('should return an instance of EventEmitter3', function (done) {
      test.strictEqual(App() instanceof EventEmitter3, true)
      count++
      done()
    })

    test('should expose `.delegate`, `.define` and `.extend` static methods', function (done) {
      assert.function(App.extend)
      assert.function(App.define)
      assert.function(App.define)
      count++
      done()
    })

    test('should expose `.define`, `.use` and `.delegate` prototype methods', function (done) {
      test.ok(assert.is.function(app.use))
      test.ok(assert.is.function(app.define))
      test.ok(assert.is.function(app.delegate))
      count++
      done()
    })

    test('should extend the given Ctor with static methods', function (done) {
      function Ctor () {
        App.call(this)
      }
      App.extend(Ctor)
      assert.function(Ctor.extend)
      assert.function(Ctor.define)
      assert.function(Ctor.delegate)

      function foo () {}
      Ctor.extend(foo)
      assert.function(foo.delegate)
      assert.function(foo.extend)
      assert.function(foo.define)
      assert.undefined(foo())
      assert.object(new Ctor())
      count++
      done()
    })

    test('should extend the prototype of given Ctor', function (done) {
      function Foo () {
        App.call(this)
      }
      App.extend(Foo)

      var foo = new Foo()
      assert.function(foo.use)
      assert.function(foo.define)
      assert.function(foo.delegate)
      count++
      done()
    })

    test('should expose `options` and `_anonymousPluginsCount` instance properties', function (done) {
      assert.object(app.options)
      assert.number(app._anonymousPluginsCount)
      count++
      done()
    })

    test('should expose event emitter prototype methods', function (done) {
      var some = new App({
        foo: 'qqq'
      })
      assert.function(some.on)
      assert.object(some)
      assert.object(some.options)
      assert.function(some.emit)
      assert.string(some.options.foo)
      assert.function(some.once)
      count++
      done()
    })

    test('should call the function passed to `.use` method', function (done) {
      var base = App()
      base.use(function () {
        count++
        done()
      })
    })

    test('should `.use` has instance context', function (done) {
      var base = new App()
      base.foo = 123
      base.use(function () {
        test.strictEqual(this instanceof MiniBase, true)
        test.strictEqual(this instanceof App, true)
        test.strictEqual(this instanceof EventEmitter3, true)
        test.strictEqual(this.foo, 123)
        count++
        done()
      })
    })

    test('should `.use` be passed with app instance context', function (done) {
      app.bar = 'foo'
      app.use(function (self) {
        test.strictEqual(self.bar, 'foo')
        test.strictEqual(self instanceof App, true)
        test.strictEqual(self instanceof EventEmitter3, true)
        test.strictEqual(self instanceof MiniBase, true)
        count++
        done()
      })
    })

    test('should `.define` a key-value pair on the instance', function (done) {
      var app = new App({ aaa: 'bbb' })

      app.define('foo', 'bar')
      test.strictEqual(app.foo, 'bar')
      test.strictEqual(app.options.aaa, 'bbb')
      count++
      done()
    })

    test('should `.define` an own property', function (done) {
      app.define('bar', 123)
      test.strictEqual(app.hasOwnProperty('bar'), true)
      count++
      done()
    })

    test('should `.define` a non-emumerable property', function (done) {
      app.define('qux', 'bar')
      test.strictEqual(Object.keys(app).indexOf('qux'), -1)
      count++
      done()
    })

    test('should define multiple properties with `.delegate`', function (done) {
      app.delegate({
        foo: 'xxx',
        baz: 'zzz'
      })

      test.strictEqual(app.hasOwnProperty('foo'), true)
      test.strictEqual(app.hasOwnProperty('baz'), true)
      test.strictEqual(app.foo, 'xxx')
      test.strictEqual(app.baz, 'zzz')
      count++
      done()
    })

    test('should emit `error` event when error in plugin', function (done) {
      var app = new App({ silent: true })
      var called = false

      app.on('use', /* istanbul ignore next */ function () {
        // should not be called
        // because plugin errors
        called = true
      })
      app.on('error', function (err) {
        assert.error(err)
        assert.string(err.name)
        assert.string(err.message)
        test.strictEqual(err.message, 'plugin err')
        test.strictEqual(err instanceof Error, true)
        test.strictEqual(called, false)
        count++
        done()
      })
      app.use(function (app) {
        throw new Error('plugin err')
      })
    })

    test('should emit `use` event if plugin dont have errors', function (done) {
      var called = false
      var base = new App()

      base.on('error', /* istanbul ignore next */ function () {
        called = true
      })
      base.on('use', function (fn, res) {
        assert.function(fn)
        assert.number(res)
        test.strictEqual(res, 123)
        test.strictEqual(called, false)
        test.strictEqual(base.foo, 123)
        count++
        done()
      })
      base.use(function (self) {
        self.foo = 123
        return self.foo
      })
    })

    test('should default plugins passed to `.use` be synchronous', function (done) {
      app.use(function (self, cb) {
        test.strictEqual(arguments.length, 1)
        test.strictEqual(assert.is.function(cb), false)
        assert.object(self)
        count++
        done()
      })
    })
  }, 10)
  setTimeout(function () {
    end(count)
  }, 20)
}
