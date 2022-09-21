require.config({
  paths: {
    moduleA: './module_a',
    moduleB: './module_b',
    moduleC: './module_c'
  }
});

require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC) {
  console.log(moduleA.a);
  console.log(moduleB.b);
  console.log(moduleC.c);
});