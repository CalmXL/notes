define('moduleB', ['moduleA'], function (moduleA) {
  var b = [6, 7, 8, 9, 10];

  return {
    b: moduleA.a.concat(b)
  }
});