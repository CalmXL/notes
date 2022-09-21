// & 1. 案例1
// console.log(1);
// // setTimeout1
// setTimeout(() => {
//   console.log(2)
//   // Promise1.then
//   Promise.resolve().then(() => {
//     console.log(3)
//   })
// }, 0);
// // Promise2
// new Promise((resolve, reject) => {
//   console.log(4)
//   // setTimeout2
//   setTimeout(() => {
//     console.log(5)
//     resolve(6);
//   }, 0);
//   // Promise2.then1
// }).then((res) => {
//   console.log(7);
//   // setTimeout3
//   setTimeout(() => {
//     console.log(res)
//   }, 0);
//   // Promise2.then2
// }).then(() => {
//   console.log(8);
//   // Promise2.then3
// }).then(() => {
//   console.log(9);
// });

// & 2. 案例2
// let p = new Promise(resolve => {
//   resolve(1);
//   Promise.resolve().then(() => console.log(2));
//   console.log(4);
// }).then(t => console.log(t));
// console.log(3);

// & 3. 案例3
// setTimeout1
// setTimeout(() => {
//   console.log('A');
// }, 0);
// var obj = {
//   func: function() {
//     // setTimeout2
//     setTimeout(function() {
//       console.log('B');
//     }, 0);
//     return new Promise(function(resolve) {
//       console.log('C');
//       resolve();
//     });
//   },
// };
// obj.func().then(function() {
//   console.log('D');
// });
// console.log('E');

// & 4. 案例4
// console.log("script start");

// // setTimeout1
// setTimeout(function() {
//   console.log("setTimeout---0");
// }, 0);

// // setTimeout2
// setTimeout(function() {
//   console.log("setTimeout---200");
//   // setTimeout3
//   setTimeout(function() {
//     console.log("inner-setTimeout---0");
//   });
//   // Promise1.then
//   Promise.resolve().then(function() {
//     console.log("promise5");
//   });
// }, 0);

// // Promise2
// Promise.resolve()
//   // Promise2.then1
//   .then(function() {
//     console.log("promise1");
//   })
//   // Promise2.then2
//   .then(function() {
//     console.log("promise2");
//   });
// // Promise3.then
// Promise.resolve().then(function() {
//   console.log("promise3");
// });
// console.log("script end");

// & 4.案例4-1

console.log('start')

// Promise1
Promise.resolve()
  // Promise1.then1
  .then(() => {
    console.log(1)

    // setTimeout1
    setTimeout(() => {
      console.log(2)
    })
  })
  // Promise1.then2
  .then(() => {
    console.log(3)

    // setTimeout2
    setTimeout(() => {
      console.log(4)
    })
  })
  // Promise1.then3
  .then(() => {
    console.log(5)

    // setTimeout3
    setTimeout(() => {
      console.log(6)
    })
  })

// Promise2
Promise.resolve()
  // Promise2.then1
  .then(() => {
    console.log(7)

    // setTimeout4
    setTimeout(() => {
      console.log(8)
    })
  })
  // Promise2.then2
  .then(() => {
    console.log(9)

    // setTimeout5
    setTimeout(() => {
      console.log(10)
    })
  })
  // Promise2.then3
  .then(() => {
    console.log(11)

    // setTimeout6
    setTimeout(() => {
      console.log(12)
    })
  })

console.log('end')