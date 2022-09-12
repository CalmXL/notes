// var, let, const 三者区别 

// & 1. ES6 let 命令, 声明变量。 用法类似于 var，但是所声明的变量只在 代码块内有效

// {
//   let a = 10;
//   var b = 0;
// }

// var 可以返回正确的值， let 报错
// console.log(a); // a is not defined
// console.log(b); // 0


// & 2. let 声明的变量只在其所在的代码块有效。 
// i 是用 var 声明的， 全局范围都有效， 所以每一次循环 新的i都会覆盖旧值，导致输出的最后一轮i值 

// var a = [];

// for (var i = 0; i < 10; i ++) {
//   a[i] = function () {
//     console.log(i);
//   }
// }

// ^ 方法1 立即执行函数
// for (var i = 0; i < 10; i ++) {
//   (function (i) {
//     a[i] = function () {
//       console.log(i);
//     }
//   })(i);
// }


// ^ 方法2 在外边传入参数
// for (var i = 0; i < 10; i ++) {
//   a[i] = function (num) {
//     console.log(num);
//   }
// }

// a[6](); // 10

// ^ 方法3 将其在函数内部进行保存

// for (var i = 0; i < 10; i ++) {
//   (function (i) {
//     a[i] = function (i) {
//       console.log(i);
//     }
//   })(i);
// }

// a[]();


// var b = [];

// for (let i = 0; i < 10; i ++) {
//   b[i] = function () {
//     console.log(i);
//   }
// }

// b[6](); // 6



// & 3. 不存在的变量提升
// & let 不像 var 那样变量提升。

// console.log(foo); 
// & 3.1 Cannot access 'foo' before initialization
// let foo = 2;

// & 3.2 Cannot access 'foo' before initialization
// typeof x; 
// let x;

// & 4. 暂时性死区
// & 4.1 在变量声明前， 提前赋值 会报错

// if (true) {
//   // let tmp;
//   tmp = 'abc';
//   console.log(tmp);

//   let tmp;
//   console.logo(tmp);

//   tmp = 123;
//   console.log(tmp);

// }

// & 5. 不允许重复声明


// function funcA () {
//   let a = 10;
//   // Uncaught SyntaxError: Identifier 'a' has already been declared
//   var a = 1;
// }

// function funcB () {
//   let a = 10;
    // ^ SyntaxError: Identifier 'a' has already been declared 
//   let a = 10; 
// }

// & 5.1不能在函数内部重新声明函数
// function funC (arg) {
    // ^ SyntaxError: Identifier 'arg' has already been declared
//   let arg;
// }


// function funcD (arg) {
//   {
//     let arg;
//   }
//   console.log(arg);
// }

// funcD(1);




// & 6. 块级作用域

// & 6.1 内层变量覆盖外层变量
// var tmp = new Date();

// function f () {
//   console.log(tmp);
//   if (false) {
//     var tmp = 'hello world';
//   }
// }

// ^ 变量提升 导致了 tmp 被覆盖
// f(); // undefined 

// & 6.2 用来循环计数的变量泄露为全局变量

// var s = 'hello';

// for (var i = 0; i < s.length; i ++) {
//   console.log(s[i]);
// }

// console.log(i); // 5

// function f () {
//   console.log('I am outSide!');
// }

// ^ 函数声明提升 if 不具有块级作用域
// if (true) {
//   function f () {
//     console.log('I am inside');
//   }
//   f(); 
// } 

// f();



// & const
// 用来声明常量 一旦声明 就不能被改变

const PI = 3.1415;
// ^ Assigment to constant variable.
// PI = 1; 


// ^ Syntax: Missing initializer in const declaration. 声明必须赋值
// const Foo;



// if (true) {
//   const max = 5;
// }

// ^ Syntax: max is not defined. 只在声明的作用域有效
// console.log(max);


// ^ 对于复合型的变量， 变量名不指向数据， 而是指向数据所在的地址。

// const obj = {
//   a: 1
// }

// obj.a = 2;
// console.log(obj); // { a : 2 }
// ^ Syntax：Assignment to constant variable
// obj = { b : 2 }




