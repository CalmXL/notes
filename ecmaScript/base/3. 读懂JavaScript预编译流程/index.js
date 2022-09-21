// & 1. if, switch, for, while 不会影响到预编译。
// console.log(a);
// var type = '1';
// for (var a = 0; a < 10; a++) {

// }

// if (true) {
//   var a = 1;
// }

// switch (type) {
//   case '1': 
//     var a =  1;
//     break;
// }

// while (false) {
//   var a = 1;
// }

// & 2. 实例分析

a = 1;
function test (e) {
  function e () {}
  arguments[0] = 2;
  console.log(e);

  if (a) {
    var b = 3;
  }

  var c;
  a = 4;
  var a;
  console.log(b); // undefined
  f = 5;
  console.log(c);
  console.log(a);
}
var a;
test(1);
console.log(a);
console.log(f);

// 1. GO = {}
// 2.GO = {
//   a: undefined
// }
// 3. GO = {
//   a: undefined, 
//   test: function test (e) {}
// }

// 4. GO = {
// a: 1
// }

// 1. AO(test): {}
// 2. AO(test): {
//   e: undefined,
//   b: undefined,
//   c: undefined,
//   a: undefined,
// }

// 3. AO(test): {
//   e: 1,
//   b: undefined,
//   a: undefined,
//   c: undefined,
// } 

// 4. AO(test) : {
//   e: 1 -> function (e) {}
//   b: undefined,
//   a: undefined,
//   c: undefined,
// }

// 5. AO(test) : {
//   e: 1 -> function (e) {} -> 2
//   b: undefined,
//   a: undefined,
//   c: undefined,
// }
// 输出2

// 输出undefined

// GO = {
//   ...
//   f = 5
// }

// 输出c undefined
// a 输出4

// 全局a 1
// f 5
