# [minibase-tests][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Tests for applications built on [minibase][] or [base][]. All Base apps passes these tests.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i minibase-tests --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const minibaseTests = require('minibase-tests')
```

## API

### [suite](index.js#L78)
> Test any app based on [minibase][] and [base][], just pass constructor as `App` argument. If it is `base` based pass `opts.isBase: true` option. When run `.runTests` it returns resolved Promise with array with length of 0 if all tests are passed. If any of the tests fails that `result` array will contain these tests - their title, index and the error. Resolved array also has `.tests` property which is the count of all tests, so easily you can do `res.tests - res.length` to find how many tests are failed, and get them by outputing `res`.

**Params**

* `App` **{Function}**: app constructor, if not a function returns rejected promise    
* `opts` **{Object}**: optional object, pass `isBase: true` for [base][] apps    
* `returns` **{Promise}**: promise if `App` not a function or instance of [Runner](./runner.js), so call `.runTests()`  

**Example**

```js
var suite = require('minibase-tests')
var Base = require('base')
var Assemble = require('assemble-core')
var Templates = require('templates')
var MiniBase = require('minibase').MiniBase

suite(Base, { isBase: true })
.runTests().then(function (res) {
  // if `res` has bigger length
  // it will contain failed tests
  console.log(res.length) // => 0
  console.log(res.tests) // => 17
})
suite(Assemble, { isBase: true })
.runTests().then(function (res) {
  console.log(res.length) // => 0
  console.log(res.tests) // => 17
})
suite(Templates, { isBase: true })
.runTests().then(function (res) {
  console.log(res.length) // => 0
  console.log(res.tests) // => 17
})

// MiniBase itself passes these tests too
suite(MiniBase).runTests().then(function (res) {
  console.log(res.length) // => 0
  console.log(res.tests) // => 17
})

function MyApp () {
  MiniBase.call(this)
}
MiniBase.extend(MyApp)

suite(MyApp).runTests().then(function (res) {
  console.log(res.length) // => 0
  console.log(res.tests) // => 17
})
```

## Related
- [assemble-core](https://www.npmjs.com/package/assemble-core): The core assemble application with no presets or defaults. All configuration is left to the implementor. | [homepage](https://github.com/assemble/assemble-core "The core assemble application with no presets or defaults. All configuration is left to the implementor.")
- [assemble](https://www.npmjs.com/package/assemble): Get the rocks out of your socks! Assemble makes you fast at creating web projects. Assemble is used by thousands of projects for rapid prototyping… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Get the rocks out of your socks! Assemble makes you fast at creating web projects. Assemble is used by thousands of projects for rapid prototyping, creating themes, scaffolds, boilerplates, e-books, UI components, API documentation, blogs, building websit")
- [generate](https://www.npmjs.com/package/generate): Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the robustness and configurability of Yeoman, the expressiveness and simplicity of… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the robustness and configurability of Yeoman, the expressiveness and simplicity of Slush, and more powerful flow control and composability than either.")
- [minibase-create-plugin](https://www.npmjs.com/package/minibase-create-plugin): Utility for [minibase][] and [base][] that helps you create plugins | [homepage](https://github.com/node-minibase/minibase-create-plugin#readme "Utility for [minibase][] and [base][] that helps you create plugins")
- [minibase-is-registered](https://www.npmjs.com/package/minibase-is-registered): Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and returns true or false if… [more](https://github.com/node-minibase/minibase-is-registered#readme) | [homepage](https://github.com/node-minibase/minibase-is-registered#readme "Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and returns true or false if named plugin is already registered on the instance.")
- [minibase](https://www.npmjs.com/package/minibase): MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation for building complex APIs with small units called plugins. Works well with most… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation for building complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine. Can be used as the basis for creating a static… [more](https://github.com/jonschlinkert/templates) | [homepage](https://github.com/jonschlinkert/templates "System for creating and managing template collections, and rendering templates with any node.js template engine. Can be used as the basis for creating a static site generator or blog framework.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/node-minibase/minibase-tests/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[base]: https://github.com/node-base/base
[minibase]: https://github.com/node-minibase/minibase

[npmjs-url]: https://www.npmjs.com/package/minibase-tests
[npmjs-img]: https://img.shields.io/npm/v/minibase-tests.svg?label=minibase-tests

[license-url]: https://github.com/node-minibase/minibase-tests/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/minibase-tests.svg

[downloads-url]: https://www.npmjs.com/package/minibase-tests
[downloads-img]: https://img.shields.io/npm/dm/minibase-tests.svg

[codeclimate-url]: https://codeclimate.com/github/node-minibase/minibase-tests
[codeclimate-img]: https://img.shields.io/codeclimate/github/node-minibase/minibase-tests.svg

[travis-url]: https://travis-ci.org/node-minibase/minibase-tests
[travis-img]: https://img.shields.io/travis/node-minibase/minibase-tests/master.svg

[coveralls-url]: https://coveralls.io/r/node-minibase/minibase-tests
[coveralls-img]: https://img.shields.io/coveralls/node-minibase/minibase-tests.svg

[david-url]: https://david-dm.org/node-minibase/minibase-tests
[david-img]: https://img.shields.io/david/node-minibase/minibase-tests.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

