var moduleA = require('./moduleA') ;

var b = (function () {
  return moduleA.a.concat([6, 7, 8, 9, 10]);
})();

module.exports = {
  b
}