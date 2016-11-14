'use strict'

var each = require('each-promise')
var Bluebird = require('bluebird')

function Runner () {
  this._tests = []
}

Runner.prototype.addTest = function addTest (title, fn) {
  function wrapper () {
    var promise = new Bluebird(function (resolve) {
      resolve(fn())
    })
    return promise
  }
  wrapper.title = title
  this._tests.push(wrapper)
}

Runner.prototype.runTests = function runTests (show) {
  var titles = []
  return each.serial(this._tests, {
    settle: true,
    flat: false,
    Promise: Bluebird,
    beforeEach: function (item) {
      titles[item.index] = item.value.title
    },
    afterEach: function (item) {
      /* istanbul ignore next */
      if (!show) return
        /* istanbul ignore next */
      if (item.reason) {
        console.error('not ok', item.index + 1, titles[item.index])
        console.error(item.reason.stack)
        return
      }
      /* istanbul ignore next */
      console.log('ok', item.index + 1, titles[item.index])
    }
  }).then(function (res) {
    var result = res.map(function (item) {
      item.title = titles[item.index]
      /* istanbul ignore next */
      return item.reason ? item : false
    })
    result = result.filter(Boolean)
    result.tests = res.length
    return result
  })
}

module.exports = Runner
