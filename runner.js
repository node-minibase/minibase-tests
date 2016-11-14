'use strict'

var each = require('each-promise')
var Bluebird = require('bluebird')

function Runner () {
  this._tests = []
}

Runner.prototype.addTest = function addTest (title, fn) {
  fn.title = title
  this._tests.push(fn)
}

Runner.prototype.runTests = function runTests () {
  return each.serial(this._tests, {
    settle: false,
    Promise: Bluebird
  })
}

module.exports = Runner
