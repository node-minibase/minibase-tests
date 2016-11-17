/*!
 * minibase-tests <https://github.com/node-minibase/minibase-tests>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var assert = require('assert')
var Bluebird = require('bluebird')
var assertKindof = require('assert-kindof')
var EventEmitter3 = require('eventemitter3')
var Runner = require('./runner')

/**
 * > Test any app based on [minibase][] and [base][], just
 * pass constructor as `App` argument. If it is `base` based
 * pass `opts.isBase: true` option. When run `.runTests` it
 * returns resolved Promise with array with length of 0 if all
 * tests are passed. If any of the tests fails that `result`
 * array will contain these tests - their title, index and the error.
 * Resolved array also has `.tests` property which is the count of
 * all tests, so easily you can do `res.tests - res.length` to find
 * how many tests are failed, and get them by outputing `res`.
 *
 * **Example**
 *
 * ```js
 * var suite = require('minibase-tests')
 * var Base = require('base')
 * var Assemble = require('assemble-core')
 * var Templates = require('templates')
 * var MiniBase = require('minibase').MiniBase
 *
 * suite(Base, { isBase: true })
 * .runTests().then(function (res) {
 *   // if `res` has bigger length
 *   // it will contain failed tests
 *   console.log(res.length) // => 0
 *   console.log(res.tests) // => 17
 * })
 * suite(Assemble, { isBase: true })
 * .runTests().then(function (res) {
 *   console.log(res.length) // => 0
 *   console.log(res.tests) // => 17
 * })
 * suite(Templates, { isBase: true })
 * .runTests().then(function (res) {
 *   console.log(res.length) // => 0
 *   console.log(res.tests) // => 17
 * })
 *
 * // MiniBase itself passes these tests too
 * suite(MiniBase).runTests().then(function (res) {
 *   console.log(res.length) // => 0
 *   console.log(res.tests) // => 17
 * })
 *
 * function MyApp () {
 *   MiniBase.call(this)
 * }
 * MiniBase.extend(MyApp)
 *
 * suite(MyApp).runTests().then(function (res) {
 *   console.log(res.length) // => 0
 *   console.log(res.tests) // => 17
 * })
 * ```
 *
 * @name   suite
 * @param  {Function} `App` app constructor, if not a function returns rejected promise
 * @param  {Object} `opts` optional object, pass `isBase: true` for [base][] apps
 * @return {Promise} promise if `App` not a function or instance of [Runner](./runner.js), so call `.runTests()`
 * @api public
 */

module.exports = function minibaseTests (App, opts) {
  if (typeof App !== 'function') {
    var err = new TypeError('minibase-tests: expect `App` to be constructor')
    return Bluebird.reject(err)
  }
  opts = opts && typeof opts === 'object' ? opts : {}
  var app = App()
  var runner = new Runner()

  runner.addTest('should return an instance of MiniBase with or without `new` keyword', function () {
    if (opts.isBase) {
      return Bluebird.resolve()
    }
    assert.strictEqual(typeof (new App()), 'object')
    assert.strictEqual(typeof (App()), 'object')
    return Bluebird.resolve()
  })

  runner.addTest('should be an instance of event emitter', function () {
    if (opts.isBase) {
      return Bluebird.resolve()
    }
    assert.strictEqual(App() instanceof EventEmitter3, true, 'should be instanceof EventEmitter3')
    assert.strictEqual((new App()) instanceof EventEmitter3, true, 'should be instanceof EventEmitter3')
    return Bluebird.resolve()
  })

  runner.addTest('should expose `.delegate`, `.define` and `.extend` static methods', function () {
    assertKindof.function(App.extend)
    if (opts.isBase) {
      return Bluebird.resolve()
    }
    assertKindof.function(App.delegate)
    assertKindof.function(App.define)
    return Bluebird.resolve()
  })

  runner.addTest('should expose `.define`, `.use` and `.delegate` prototype methods', function () {
    assert.ok(assertKindof.is.function(app.use))
    assert.ok(assertKindof.is.function(app.define))

    if (opts.isBase) {
      return Bluebird.resolve()
    }
    assert.ok(assertKindof.is.function(app.delegate))
    return Bluebird.resolve()
  })

  runner.addTest('should extend the given Ctor with static methods', function () {
    function Ctor () {
      App.call(this)
    }
    App.extend(Ctor)
    assertKindof.function(Ctor.extend)
    if (!opts.isBase) {
      assertKindof.function(Ctor.define)
      assertKindof.function(Ctor.delegate)
    }

    function foo () {}
    Ctor.extend(foo)
    assertKindof.function(foo.extend)

    if (!opts.isBase) {
      assert.strictEqual(typeof foo.delegate, 'function')
      assert.strictEqual(typeof foo.define, 'function')
    }

    assertKindof.undefined(foo())
    assertKindof.object(new Ctor())
    return Bluebird.resolve()
  })

  runner.addTest('should extend the prototype of given Ctor', function () {
    function Foo () {
      App.call(this)
    }
    App.extend(Foo)

    var foo = new Foo()
    assertKindof.function(foo.use)
    assertKindof.function(foo.define)
    if (!opts.isBase) assertKindof.function(foo.delegate)
    return Bluebird.resolve()
  })

  runner.addTest('should expose `options` instance properties', function () {
    assertKindof.object(app.options)
    if (!opts.isBase) assertKindof.number(app._anonymousPluginsCount)
    return Bluebird.resolve()
  })

  runner.addTest('should expose event emitter prototype methods', function () {
    var some = new App({
      foo: 'qqq'
    })
    assertKindof.function(some.on)
    assertKindof.object(some)
    assertKindof.object(some.options)
    assertKindof.function(some.emit)
    assertKindof.function(some.once)
    return Bluebird.resolve()
  })

  runner.addTest('should call the function passed to `.use` method', function () {
    return new Bluebird(function (resolve, reject) {
      var base = App()
      base.once('error', reject)
      base.use(function () {
        resolve()
      })
    })
  })

  runner.addTest('should `.use` has instance context', function () {
    return new Bluebird(function (resolve, reject) {
      var base = new App()
      base.foo = 123
      base.once('error', reject)
      base.use(function () {
        assert.strictEqual(this instanceof App, true)
        if (!opts.isBase) assert.strictEqual(this instanceof EventEmitter3, true)
        assert.strictEqual(this.foo, 123)
        resolve()
      })
    })
  })

  runner.addTest('should `.use` be passed with app instance context', function () {
    return new Bluebird(function (resolve) {
      app.bar = 'foo'
      app.use(function (self) {
        assert.strictEqual(self.bar, 'foo')
        assert.strictEqual(self instanceof App, true)
        if (!opts.isBase) assert.strictEqual(self instanceof EventEmitter3, true)
        resolve()
      })
    })
  })

  runner.addTest('should `.define` a key-value pair on the instance', function () {
    var app = new App({ aaa: 'bbb' })

    app.define('foo', 'bar')
    assert.strictEqual(app.foo, 'bar')
    return Bluebird.resolve()
  })

  runner.addTest('should `.define` an own property', function () {
    app.define('bar', 123)
    assert.strictEqual(app.hasOwnProperty('bar'), true)
    return Bluebird.resolve()
  })

  runner.addTest('should `.define` a non-emumerable property', function () {
    app.define('qux', 'bar')
    assert.strictEqual(Object.keys(app).indexOf('qux'), -1)
    return Bluebird.resolve()
  })

  runner.addTest('should define multiple properties with `.delegate`', function () {
    if (opts.isBase) {
      return Bluebird.resolve()
    }
    app.delegate({
      foo: 'xxx',
      baz: 'zzz'
    })

    assert.strictEqual(app.hasOwnProperty('foo'), true)
    assert.strictEqual(app.hasOwnProperty('baz'), true)
    assert.strictEqual(app.foo, 'xxx')
    assert.strictEqual(app.baz, 'zzz')
    return Bluebird.resolve()
  })

  runner.addTest('should emit `error` event when error in plugin', function () {
    if (opts.isBase) {
      return Bluebird.resolve()
    }
    var app = new App({ silent: true })

    return new Bluebird(function (resolve) {
      app.on('error', function (err) {
        assertKindof.error(err)
        assertKindof.string(err.name)
        assertKindof.string(err.message)
        assert.strictEqual(err.message, 'plugin err')
        assert.strictEqual(err instanceof Error, true)
        resolve()
      })
      app.use(function (app) {
        throw new Error('plugin err')
      })
    })
  })

  runner.addTest('should default MiniBase plugins passed to `.use` be synchronous', function () {
    return new Bluebird(function (resolve, reject) {
      app.once('error', reject)
      app.use(function (self, cb) {
        if (!opts.isBase) assert.strictEqual(arguments.length, 1)
        if (!opts.isBase) assert.strictEqual(assertKindof.is.function(cb), false)
        assertKindof.object(self)
        resolve()
      })
    })
  })

  return runner
}
