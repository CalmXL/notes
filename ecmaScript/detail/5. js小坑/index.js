// & 1. ParseInt 遇上 map

// const result = ['1', '2', '3'].map(parseInt);

// console.log(result); // [1, NaN, NaN] 

// & 2. 神奇的null

// console.log(typeof null); // 'object'
// console.log(null instanceof Object); // false

// & 3. reduce
// const res = [3, 2, 1].reduce(Math.pow);
// Math.pow(3, 2) -> return 9 

// console.log(res);

// const res1 = [].reduce(Math.pow);
// console.log(res1); // Uncaught TypeError: Reduce of empty array with no initial value

// const res2 = [100].reduce(function (prev, item) {
//   console.log(item);
// })
// console.log(res2);

// const res1 = [3, 2, 1].reduce(function (prev, item, index, arr) {
//   console.log(prev, item, index, arr); // 3, 2, 1 [3, 2, 1]
//   // prev.push(item + 1);
//   // return prev
// }, []);

// console.log(res1);

// [].reduce(Math.pow);

// & 4. 该死的优先级

const val = 'hero';
console.log('he is ' + val === 'hero' ? 'good' : 'bad'); // no

console.log(`he is ${ val === 'hero' ? 'good' : 'bad'}`); // he is good