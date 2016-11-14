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

### [suite](index.js#L68)
> Test any app based on [minibase][] and [base][], just pass constructor as `App` argument. If it is `base` based pass `opts.isBase: true` option. When run `.runTests` it returns resolved Promise with array with length of 18. If any of the defined tests fails it will return rejected Promise.

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
  console.log(res.length) // => 18
})
suite(Assemble, { isBase: true })
.runTests().then(function (res) {
  console.log(res.length) // => 18
})
suite(Templates, { isBase: true })
.runTests().then(function (res) {
  console.log(res.length) // => 18
})

// MiniBase itself passes these tests too
suite(MiniBase).runTests().then(function (res) {
  console.log(res.length) // => 18
})

function MyApp () {
  MiniBase.call(this)
}
MiniBase.extend(MyApp)

suite(MyApp).runTests().then(function (res) {
  console.log(res.length) // => 18
})
```

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

