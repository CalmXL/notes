// 1. promise 是什么？ 

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     reject(1);
//   }, 1000);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     reject(2);
//   }, 2000);
// });

// const p3 = new Promise((resolve, reject) => {
//   setTimeout(function () {
//     reject(3);
//   }, 3000);
// });

// const p4 = Promise.all([p1, p2, p3]);

// p4.then((result) => {
//   console.log(result);
// }, (error) => {
//   console.log(error);
// });

// const p5 = Promise.race([p1, p2, p3]);

// p5.then((result) => {
//   console.log(result);
// }, (error) => {
//   console.log(error);
// })


// const result1 = {
//   name: 'zhangsan',
//   age: 12
// }

// const p1 = Promise.resolve(result1);
// console.log(p1); // Promise <fulfilled>

// p1.then((res) => {
//   console.log(res); // { name: zhangsan, age: 12}
// });


// const result2 = {
//   name: 'lisi',
//   age: 12,
//   then (res) {
//     console.log(res); // f () { [native code] }
//   }
// };

// const p2 = Promise.resolve(result2);
// console.log(p2); // Promise <pending>

// const p3 = Promise.reject(result2);
// console.log(p3); // Promise <rejected>

// const result4 = {
//   catch (err) {
//     console.log(err);
//   }
// }

// const p4 = Promise.reject(result4);
// console.log(p4);  // Promise <rejected>



// async function p1 () {
//   return 1;
// }

// console.log(p1()); // Promise <fulfilled>

// p1().then(res => console.log(res)); // 1

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('resolve');
//     resolve('resolve');
//   }, 1000);
// });

// async function test1 () {
//   console.log(1);
//   await p;
//   console.log(2);
// }

// 1
// 'resolve'
// 2
// test1();


// async function _test1 () {
//   console.log(1);

//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('resolve');
//       resolve('resolve');
//     }, 1000);
//   }).then(() => {
//     console.log(2);
//   })
// }

// async function test2 () {
//   console.log(1);
//   await console.log(3);
//   console.log(2);
// }

// test2();

const p1 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('p1')
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('p2')
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('p3')
  }, 3000);
});

const p = Promise.all([p1, p2, p3, 11]);

p.then((res) => {
  console.log(res);
})
