// & for...of / for..in

// for...in 

var obj = {
  a: 1,
  b: 2,
  test () {
    console.log(1);
  }
}

obj.prototype = {
  c: 3,
  d: 4,
  test2 () {
    console.log(2);
  }
}

for (let key in obj) {
  console.log(key);
}

console.log(Object.getOwnPropertyDescriptors(obj.prototype));


// for...of 数据解构部署了 Symbol.iterator()
let arr = [1, 2, 3, 4, 5]
for (let key of arr) {
  console.log(key);
}