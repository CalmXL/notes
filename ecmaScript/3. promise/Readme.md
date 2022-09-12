# Promise

## 1. 什么是Promise?

promise 用于表示一个异步操作的最终状态(成功或失败)及其结果值。

promise 是一个回调嵌套（回调低于）变码方式的解决方案, 它在js中早有实现, Es6 将其写入标准， 统一用法， 提供了原生的Promise。

## 2. Promise 俩个特点: 

1. 状态不受外界影响。 
   
2. 状态一旦发生改变， 不会再被改变， 并且在任何时候都能获得这个结果。
    promise 状态改变只有俩种:  pending -> fulfilled. 
                            pending -> rejected
                  

Promise是一个构造函数， 它接收一个回调函数（executor）作为参数， 通过new调用生成一个Promise实例。

executor 有俩个参数： `resolve` 和 `reject`， `resolve` 在异步操作成功完成的时候调用，将 Promise 的状态 pending -> fulfilled, 并且将成功的结果传递出去；
`reject` 在异步操作失败的时候调用， 将Promise的状态从 pending -> rejected,并且将失败的信息传递出去。

```
const promise = new Promise ((resolve, reject) => {
  // doSth ... 同步代码
  if (/* 异步操作成功 */) {
    resolve(result);
  } else {
    reject(error);
  }
});
```
**注意: 虽然Promise 它代表一个异步的操作，但是executor内部的代码四同步执行的**


## Promise的常用静态方法和原型上的方法

### 1. Promise.then 和 Promise.catch

promise 实例生成之后， 可以通过 `then` 方法来指定成功或失败的回调函数: 

```javascript
promise.then((result) => {
  <!-- 成功 -->
}, (error) => {
  <!-- 失败 -->
})
```

也可以用 `catch` 指定失败的回调: 

```
  promsie.then((result) => {
    
  }).catch((err) => {
    <!-- 失败 -->
  })
```

`then` 和 `catch` 方法会返回一个新的 Promise 实例， 所以我们可以链式调用相关的方法。

另外 Promise 在状态改变之后， 内部发生了错误或者手动抛出一个错误的时候, 该promise 的状态会变成rejected。

```
const promise = new Promise((resolve, reject) => {
  throw new Error('error');
  resolve();
})

console.log(promise); // <rejected>
```

而在 Promise 状态变成 fulfilled 之后， 代码在发生错误， 将不会改变 Promise 状态：

```
const promise = new Promise((resolve, reject) => {
  resolve();
  throw new Error('error');
});

console.log(promise); // <fulfilled>
```

Promise 的错误还具有"冒泡"的性质， 错误会一致向后传递， 直接被 `catch` 捕获为止: 

```
promise.then(() => {})
       .then(() => {})
       .catch((err) => {
        // 处理之前可能产生的错误
       })
```

### 2. Promise.all 和 Promise.race

`Promise.all()` 接收一组 promise 实例作为参数， 通常是数组（也可以是任何具有 `iterator` 接口的数据解构, 只要返回的都是 Promise的实例即可）, 它返回一个新的 Promise 实例， 返回的实例状态有以下的特点:

1. 当参数中的所有的 Promise 实例都会变成 Fulfilled 状态， `Promise.all()` 实例的状态变成了 Fulfilled; 此时所有参数实例的结果会按顺序组装成数组传递出去。

2. 当参数中的某个 Promise 实例变成 Rejected 状态时, `Promise.all()` 实例的状态变成 Rejected; 此时参数中第一个变成 Rejected 状态的实例结果会被传递出去。

`Promise.race` 它的参数和 `Promise.all` 一样， `race` 在英文中有竞赛的意思， 也就是只要参数实例中有一个实例率先改变了状态， 那么 `Promsie.race` 实例的状态就会变成该状态， 同时传递实例的结果。

### 3. Promise.resolve 和 Promise.reject

1. `Promise.resolve()` 返回一个具有 fulfilled 状态的 Promise 实例;
2. `Promise.reject()` 返回一个具有 Rejected 状态的 Promise 实例;

需要注意的是： **如果 `Promise.resolve()` 的参数是一个具有 `then()` 方法的对象， 那么将会返回一个状态为 Pending 状态的 Promise 实例, ** 并且参数实例中的 `then()` 会被执行: 

```
const result1 = {
  name: 'zhangsan',
  age: 12
}
const p1 = Promise.resolve(result1)
console.log(p1) // <fulfilled>
p1.then(res => {
  console.log(res) // { name: 'zhangsan', age: 12 }
})

const result2 = {
  name: 'lisi',
  age: 12,
  then (res) { // 会被调用
    console.log(res) // f () { [native code] }
  }
}

const p2 = Promise.resolve(result2) 
console.log(p2) // <pending>

const p3 = Promise.reject(result2)
console.log(p3) // <rejected>

const result4 = {
  catch (err) {
    console.log(err)
  }
}
const p4 = Promise.reject(result4)
console.log(p4) // <rejected>
```

### 4. Promise.prototype.finally

`finally` 方法不管 Promise 的实例如何， 最终都会被执行。


## async 和 await

> async 函数是使用 `async` 关键字声明的函数， 并允许该函数中使用 `await` 关键字， `async` 和 `await` 关键字使得我们可以用一种更为简介的方式写出基于 Promise 的异步行为， 而无需刻意的链式调用Promise。


如果一个函数加上了 `async` 关键字, 它的返回值必定是一个 Promise 实例:

```
async function p1 () {
  return 1;
}

console.log(p1);
p1().then(res => console.log(res));
```

`await` 关键字后面的表达式一个 Promise 实例，相当于调用 Promise.resolve()包裹起来: 

```
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('resolve');
    resolve('resolve');
  }, 1000);
});

async function test1() {
  console.log(1);
  await p;
  console.log(2);
}

// test1 中的 await 可以这样理解
async _test1 () {
  console.log(1);
  new Promise ((resolve, reject) => {
    setTimeout(function () {
      console.log('resolve');
      resolve('resolve');
    }, 1000);
  }).then(() => {
    console.log(2)
  })
} 
```
