
seajs.use([
  './module_a.js', 
  './module_b.js', 
  './module_c.js'
], function (moduleA, moduleB, moduleC) {
  console.log(moduleA.a);
  console.log(moduleB.b);
  console.log(moduleC.c);
})