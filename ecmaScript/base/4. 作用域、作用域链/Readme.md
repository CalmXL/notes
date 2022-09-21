# 作用域、作用域链

## 作用域

作用域是在代码运行的时候，某些特定部分中变量、函数、对象的可访问性。
简单来说就是作用域决定了代码区块中的变量和其他资源的可见性。作用域控制变量和函数的可见性和声明周期。

```javascript
function test () {
  var inner = 'inner';
}

console.log(inner);// Uncaught Reference: inner is not defiend
```

上面的例子中， 我们可以看出变量 inner 在全局作用域下没有声明，所以在全局作用域下访问会报错。
我们可以这样理解: **作用域是一个独立的地盘， 让变量不会外泄出去。 也就是说 作用域最大的好处就是隔离变量， 不同作用域下的同名变量不会有冲突**。

ES6之前没有 **块级作用域**，只存在 **全局作用域** 和 **函数作用域**。

## 全局作用域 和 函数作用域

**在代码中任何地方都能访问到的变量拥有全局作用域**， 一般来说有以下几种情况会拥有全局作用域:

1. 最外层函数和在最外层函数定义的变量： 

```javascript
var outerVariable = 'outer';
function outerFunc () {
  var innerVariable = 'inner';
  function innerFunc () {}
}
// 其中，outerVariable 与 outerFunc 就具有全局作用域
console.log(outerVariable);
console.log(outerFunc);
// console.log(innerVariable); // Uncaught ReferenceError: innerVariable is not defined
console.log(innerFunc); // Uncaught ReferenceError: innerFunc is not defined
```

2. 所有未被定义， 但直接赋值的变量（暗示全局变量: imply global variable）

```javascript
function test () {
  var a = 1;
  b = 2;
  var c = d = 3; 
}

test();
console.log(b, d); // 2, 3
```

3. 所有window对象的属性
一般情况下， window对象的内置属性都拥有全局作用域，例如 window.location、 window.name、window.top 等。

## 函数作用域

**函数作用域, 是指声明在函数内部的变量。** 和全局作用域不同， 局部作用域一般只在固定的代码片段才能访问到。

```javascript
function test () {
  var inner = 'inner';
  function say () {
    console.log(inner);
  }
  say();
}
test(); // 'inner'
console.log(inner); // Uncaught ReferenceError: inner is not defined
```

**作用域是分层的， 内部可以访问到外部， 反之不行**

**注意: 代码块{}, if， switch, for, while 不会创建新的作用域。**

## 块级作用域

在ES6中，有一个块级作用域的概念，可以通过let和const声明变量，所声明的变量在指定的代码块的作用域外无法被访问。

## 作用域链

在 javascript 中， 函数也是一种对象类型、 引用类型, 也称作引用值。

对象中有一些属性是我们无法访问的， 他们是js引擎内部固有的隐式属性（也可以叫做私有属性）， 接下来的 `[[scope]]` 便是其中之一。

## [[scope]]

`[[scope]]` 是在函数创建时， 生成的一个内部隐式属性，
它也是函数存储作用域的容器， 作用域链存储的就是AO, GO。

> AO： activation object 活跃对象 函数执行期上下文
>
> 	1. 先寻找形参和变量声明
> 	1. 实参值赋值给形参
> 	1. 找函数声明， 赋值
> 	1. 执行
>
> GO: global object 全局执行期上下文
>
> 1. 寻找变量
> 2. 找函数声明
> 3. 执行
> 4. GO === window

## 图解作用域链形成的过程

先看以下代码
```javascript
function a () {
  function b () {
    var b = 2;
  }
  var a = 1;
  b();
}
var c = 3;
a();
```

1. 当 `函数a` 被定义的时， 系统生成 `[[scope]]`属性， `[[scope]]`中保存该函数的作用域链， 该作用域链的第0位存储当前环境下的全局执行期上下文（GO）， GO里存储全局下所有对象， 其中包含 `函数a` 和 全局 `变量c`。

![](https://img1.humandetail.com/9y0VLKKQlT4s7X5j.png)

2. `函数a` 执行的前一刻， 作用域链的顶端（第0位）存储 `函数a` 生成的函数执行期上下文AO, 同时 GO 被挤到第`1`位。查找变量是在 `函数a` 存储的作用域链中从顶端开始依次向下查找。

![](https://img1.humandetail.com/HNmL63voFTcaEFkz.png)

3. 当 `函数b`被定义时， 是在`函数a`的环境下， 所以`函数b`此时的作用域链就是 `函数a`被执行时的作用域链。

![](https://img1.humandetail.com/xlKZm8GBqf0TNGDu.png)

4. 当 `函数b`执行的前一刻， 系统生成 `函数b` 的 `[[scope]]`属性， 存储 `函数b`的作用域链， 第`0`位存储`函数b`的AO, `函数a`的AO和全局GO被依次挤下去。

![](https://img1.humandetail.com/9c06J56etMqwJzvn.png)

5. 当`函数b`执行完毕， `函数b`的AO被销毁， 回归到被定义时的状态。

![](https://img1.humandetail.com/ti0JrN9ylFiur3FW.png)
![](https://img1.humandetail.com/rAZXEvOXCD0z7XGJ.png)

6. 当`函数a`被执行结束时， `函数a`的AO被销毁，同时`函数b`的 `[[scope]]` 也将不存在了。 `函数a`回归到被定义时的状态。

![](https://img1.humandetail.com/lSQCzulspYN5x9Uz.png)
![](https://img1.humandetail.com/kgaktfhbT4wxE39q.png)


注意: 
- 每一个函数的作用域都会有GO
- 每一个函数的作用域链最顶端都是自身的AO
- 函数执行之前会生成AO
- 每个函数都会都有自己的 AO GO， AO排在GO的上层，
- 当外层函数执行时， 内存函数定义， 内存的AO = 等于外层AO
- 函数执行完成之后， AO是要销毁的

## 作用域与执行期上下文

很多人都会经常混淆作用域和执行期上下文的概念， 误认为他们是相同的概念， 但是事实并非如此。

我们知道JavaScript属于解释型语言，JavaScript的执行分为: 解释和执行俩个阶段

**解释阶段:**

- 词法分析
- 语法分析
- 作用域规则确定

**执行阶段:**

- 创建执行期上下文
- 执行函数代码
- 垃圾回收

JavaScript解释阶段便会确定作用域规则， 因此作用域在函数定义时就已经确定了， 而不是在函数调用时确定的。
而执行期上下文是函数执行之前创建的。执行期上下文最明显的就是this的指向是执行时确定的，而作用域访问的变量是编写代码的结构确定的，

**作用域和执行期上下文之间的最大区别是：**
**执行期上下文运行时确定的，随时可能改变。 作用域在定义时就确定， 并不会改变。**

一个作用域下可能包含若干个上下文环境。 有可能从来没有过上下文环境(如: 函数不被调用)，有可能有， 当函数被调用完毕后， 上下文环境被销毁了。
也有可能同时存在一个或多个（闭包）。同一作用域下， 不同的调用产生不同的执行期上下文环境， 继而产生不同变量的值。
