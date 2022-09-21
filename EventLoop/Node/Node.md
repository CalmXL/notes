# Event Loop (node.js)

相对于浏览器的Event Loop来说， Node.js 中的 Event Loop 反而更加简洁。

Node.js 的事件循环， 它会把一些操作放到其他相关线程来处理， 当处理完毕之后， 会通知主线程， 由主线程决定什么时候来执行。

也就是说: 
1. Node.js 是通过事件循环机制来运行 JS代码的。
2. 提供了线程池处理 I/O 操作任务。
3. 俩种线程: 
  - 事件循环线程: 负责安排任务(require、 同步执行回调、注册新任务)
  - 线程池(libuv实现)， 负责处理任务(I/O操作， CPU密集型任务)

![](https://img-squad-prod.humandetail.com/inner/20220601xQdwggCS.png)

## 事件循环阶段 phase

1. Timers: setTimeout / setInterval
2. Pending callbacks: 执行延迟到下一个事件环迭代的 I/O 回调 （内部机制使用）。
3. Idle, prepare： 系统内部机制事件。 
4. Poll: 轮询，检查新的 I/O 事件， 执行 I/O 回调，(几乎所有情况下， 除了关闭的回调函数， 那些由计时器和 `setImmediate()`调度的之外)， 其余情况下 node 将在适当的时候在此阻塞。
5. Check: setImmediate
6. Close callbacks: 关闭回调函数 (内部机制使用)。

在每次运行的事件循环之间，Node.js 检查它是否在等待任何异步 I/O 或计时器，如果没有的话，则完全关闭。

案例1:
```javascript
// promise1.then
Promise.resolve().then(() => {
  console.log(1)
})

// nextTick1
process.nextTick(() => {
  console.log(2)
})

console.log('start')

// readFile
readFile('1.txt', 'utf-8', () => {
  // setTimeout1
  setTimeout(() => {
    console.log(3)
  }, 0)

  // nextTick2
  process.nextTick(() => {
    console.log(4)
  })

  // setImmediate1
  setImmediate(() => {
    console.log(5)
  })

  console.log(6)
})

console.log(7)

// setTimeout2
setTimeout(() => {
  console.log(8)
}, 0)

// setImmediate2
setImmediate(() => {
  console.log(9)
})

console.log('end')
```

分析: 
主执行栈