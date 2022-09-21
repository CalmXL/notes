var moduleB = require('./moduleB');

var c = (function () {
  return moduleB.b.join('-');
})();

module.exports = {
  c
}