define('moduleC', ['moduleB'], function (moduleB) {
  return {
    c: moduleB.b.join('-')
  }
});