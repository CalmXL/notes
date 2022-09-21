define(function (require, exports, module) {
  var moduleB = require('./module_b');

  return {
    c: moduleB.b.join('-')
  }
})