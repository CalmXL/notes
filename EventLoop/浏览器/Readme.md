# Event Loop 浏览器

我们直接先上图
![eventLoop](https://img-squad-prod.humandetail.com/inner/20220601rQeMejlR.png)

名词解释: 
1. 执行栈: 所有代码都会放到这里执行。
2. 微任务: 语言标准(ECMA262)提供的API运行，Promise、MutationObserve、process.nextTick、setImmediate。
3. GUI渲染: 渲染DOM。
4. 宏任务: 宿主提供的异步方法和任务， setTimeout、 setInterval、 script、 UI渲染、 ajax、 DOM的事件。



event-loop流程:

>1. 首先js引擎线程执行同步代码， 分别将宏任务 和 微任务添加到相应的队列中。
>2. Js引擎线程执行栈中的同步执行完成之后, 接下来要清空微任务队列中的任务。
>3. 微任务队列清空后，执行GUI渲染利用GUI单独的渲染进程进行渲染任务。
>4. 渲染完成之后，从宏任务队列中取出一个宏任务到JS引擎线程执行栈中执行， 宏任务队列的顺序先进先出

宏任务与微任务: 

> 宏任务(Macrotask):
>
> script、UI渲染、setTimeout、setInterval、setImmediate、messageChannel、requestAnimationFrame、 用户交互事件、ajax。
>
> 微任务(Microtask):
>
> Promise.prototype.then()、 MutationObserver、process.nextTick

## 案例分析： 

```javascript
console.log(1);
// setTimeout1
setTimeout(() => {
  console.log(2)
  // Promise1.then
  Promise.resolve().then(() => {
    console.log(3)
  })
}, 0);
// Promise2
new Promise((resolve, reject) => {
  console.log(4)
  // setTimeout2
  setTimeout(() => {
    console.log(5)
    resolve(6);
  }, 0);
  // Promise2.then1
}).then((res) => {
  console.log(7);
  // setTimeout3
  setTimeout(() => {
    console.log(res)
  }, 0);
  // Promise2.then2
}).then(() => {
  console.log(8);
  // Promise2.then3
}).then(() => {
  console.log(9);
});
```

分析：

>执行栈: script执行，promise2(executor)，sto1, sto2
>
>微任务: promise1.then(), Promise2.then()
>
>GUI渲染:
>
>宏任务: setTimeout1、setTimeout2, setTimeout3
>
>
>
>输出: 
>
>​	1
>
>​	4
>
>​	2 -> sto1 x
>
>​	3 ->  promise1.then()x
>
>​	5
>
>​	7
>
>​	8
>
>​	9
>
>​	6

案例2：

```javascript
let p = new Promise(resolve => {
  resolve(1);
  Promise.resolve().then(() => console.log(2));
  console.log(4);
}).then(t => console.log(t));
console.log(3);
```
分析: 
> 执行栈：Promise, 
>
> 宏任务：
>
> GUI渲染:
>
> 微任务：Promsie.resolve().then, promise.then()
>
> 
>
> 输出: 4 3 2 1
>

案例3：

```javascript
// setTimeout1
setTimeout(() => {
  console.log('A');
}, 0);
var obj = {
  func: function() {
    // setTimeout2
    setTimeout(function() {
      console.log('B');
    }, 0);
    return new Promise(function(resolve) {
      console.log('C');
      resolve();
    });
  },
};
obj.func().then(function() {
  console.log('D');
});
console.log('E');
```
分析: 
  宏任务： sto1， sto2
  微任务： promise.then， promise.then
  输出： C, E, D, A, B


案例4:
```javascript
console.log("script start");

// setTimeout1
setTimeout(function() {
  console.log("setTimeout---0");
}, 0);

// setTimeout2
setTimeout(function() {
  console.log("setTimeout---200");
  // setTimeout3
  setTimeout(function() {
    console.log("inner-setTimeout---0");
  });
  // Promise1.then
  Promise.resolve().then(function() {
    console.log("promise5");
  });
}, 0);

// Promise2
Promise.resolve()
  // Promise2.then1
  .then(function() {
    console.log("promise1");
  })
  // Promise2.then2
  .then(function() {
    console.log("promise2");
  });
// Promise3.then
Promise.resolve().then(function() {
  console.log("promise3");
});
console.log("script end");
```

分析:

宏任务: sto1, sto2,sto3
微任务: promise2.then1, promise3.then, promise2.then2, promsie1.then

输出: 
1. "script start"
2. "script end"
3. "promise1"
4. "promise3"
5. "promise2"
6. "setTimeout---0"
7. "setTimeout---200"
8. "promise5"
9. "inner-setTimeout---0"



案例4-1:
```javascript
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
```

分析： 
宏任务: sto1, sto4, sto2, sto3, sto5, sto6
微任务:  promise1.then1x, 
        promise2.then1x,
        promise1.then2,
        promise2.then2,
        promise1.then3.
        promise2.then3


输出: 
1. start
2. end
3. 1
4. 7
5. 3
6. 9
7. 5
8. 11
9. 2
10. 8
11. 4
12. 10
13. 6
14. 12

