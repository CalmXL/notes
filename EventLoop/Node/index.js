const { readFile } = require('fs');

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