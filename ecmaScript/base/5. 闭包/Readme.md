## 作用域链和闭包

```javascript
function bar() {
  console.log(myName)
}
function foo() {
  var myName = 'heora'
  bar()
}
var myName = 'yueluo'
foo()
```

你觉得这段代码中的 `bar` 函数和 `foo` 函数打印出来的内容是什么？让我们分析一下这两段代码的执行流程。

当代码执行到 bar 函数内部是，其调用栈状态如下所示。

![](https://img.yueluo.club/blog/img/4e0bcf72b30576633692f7af7c3b8492.png)

从图中可以看到， 全局上下文和 `foo` 函数的执行上下文都包含变量 `myName`, 那么 bar 函数里面 `myName` 的值到底应该选择哪个呢？

也许你的第一反应该死按照调用栈的顺序来查找变量， 查找方式如下: 

- 先查找栈顶是否存在 `myName` 变量， 如果没有， 接着往下往下查找 `foo` 函数中的变量。
- 在 `foo`函数中可以找到 `myName` 变量，这时候就是使用 `foo` 函数中的 `myName`。



如果按照这种思路来查找变量， 那么最终打印结果应该是 `hearo`。 但是实际并非如此， 上述代码实际会打印 `yueluo`。 要想解析清楚这个问题，那么你就需要搞清楚作用域链。

## 作用域链

其实在每个执行上下文的变量环境中，都包含一个外部引用， 用来指向外部的执行上下文， 我们把这个外部引用成为 **outer**

当一段代码使用一个变量时， JavaScript引擎首先会在 “当前的执行上下文” 中查找该变量。比如上面这段代码在查找变量 `myName` 变量时，如果在当前的环境中没有查找到， 那么javaScript引擎会在 `outer` 所指向的上下文中继续查找。

![](https://img.yueluo.club/blog/img/49da7adee631577398f3851dfd43a10ec.png)

从图中可以看出， `bar`函数 和 `foo`函数的 outer 都是指向全局上下文， 这也就意味着如果在 `bar` 函数或者 `foo`函数中使用外部变量， 那么js引擎会向全局执行上下文中查找。我们把这个查找的链条就叫做作用域链。

现在你知道变量是通过作用域链来查找的，不过还有一个疑问没有解开，`foo` 函数调用的 `bar` 函数，那为什么 `bar` 函数的外部引用是全局执行上下文，而不是 `foo` 函数的执行上下文？

要回答这个问题，你还需要知道什么是 **词法作用域**。在 JavaScript 执行过程中，其作用域链是由词法作用域决定的。



## 词法作用域

**词法作用域就是指作用域由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能预测代码在执行过程中如何查找标识符。**

![](https://img.yueluo.club/blog/img/28107ddb58ecc32b1c8aa56fc19a6aaba.png)

从图中可以看出， 词法作用域是根据代码的位置来决定的， 其中`main`函数包含了 `bar`函数, `bar`函数包括了 `foo`函数， 因为JavaScript作用域链是由词法作用域决定的， 所以整个语法的词法作用域链顺序是: `foo`函数作用域 - `bar`函数作用域 - `main`函数作用域 -  `全局作用域`。

了解词法作用域以及JavaScript中的作用域链， 我们再回头看这个问题。


```javascript
function bar () {
	console.log(myName);
}

function foo () {
  var myName = 'heora';
  bar();
}

var myName = 'yueluo';
foo();
```

在这段代码中。`foo`和 `bar`的上级作用域都是全局作用域， 所以如果 `foo`或者 `bar` 函数使用了一个它们没有定义的变量， 它们就会到全局作用域中去查找。也就是说，**词法作用域是代码编译阶段就决定好的， 与函数调用无关。**



## 块级作用域中的变量查找

前面我们通过全局作用域和函数作用域分析了作用域链，接下来我们再来看看块级作用域中变量是如何查找的。

在编写代码的时候，如果你使用了一个在当前作用域中不存在的变量，这时 JavaScript 引擎就需要按照作用域链在其他作用域中查找该变量，如果你不了解该过程，很大概率会写出不稳定的代码。

我们先来看下面这段代码。

```javascript
function bar() {
  var myName = 'heora'
  let test1 = 100
  if (1) {
    let myName = 'chrome browser'
    console.log(test)
  }
}
function foo() {
  var myName = 'yueluo'
  let test = 2
  {
    let test = 3
    bar()
  }
}
var myName = '月落'
let myAge = 10
let test = 1
foo()
```

ES6 是支持块级作用域的，当执行到代码块时，如果代码块中有 let 或者 const 声明的变量，那么变量就会存放到函数的词法环境中。对于上面这段代码，当执行到 bar 函数内部的 if 语句块时，其调用栈的情况如图所示：

![](https://img.yueluo.club/blog/img/319bf1a7c374f6b98ce2ae917ba878c1.png)

执行到bar函数的if语句时， 需要打印出变量test, 那么就需要查找到test变量的值， 起查找的顺序过程在图中标出。

下面就来解释一下这个过程。首先是在 bar 函数的执行上下文中查找，但因为 bar 函数的执行上下文中没有定义 test 变量，所以根据词法作用域的规则，下一次就在 bar 函数的外部作用域中查找，也就是全局作用域。

## 闭包


```javascript
function foo() {
  let myName = 'heora'
  let test1 = 1
  let test2 = 2
  var innerBar = {
    getName: function() {
      console.log(test1)
      return myName
    },
    setName: function(newName) {
      myName = newName
    }
  }
  return innerBar
}
var bar = foo()
bar.setName('yueluo')
bar.getName()
console.log(bar.getName())
```

首先我们看看执行`foo`函数内部的 `return innerBar`这行代码时调用栈的情况。

![](https://img.yueluo.club/blog/img/99226b6e544ec4255b25d100e54506678.png)

`innerBar` 是一个对象， 包含了 `getName` 和 `setName` 的俩个方法。你可以看到，这俩个方法都是在 `foo` 函数内部定义的， 并且这俩个方法都用到了 `myName` 和 `test1`变量。

根据词法作用的规则， 内部函数 `getName`和 `setName`总是可以访问它们的外部函数 `foo` 中的变量， 所以当 `innerBar`对象返回给全局变量 `bar`时， 虽然 `foo`函数已经执行结束， 但是 `getName`和`setName`函数依然可以使用`foo`函数中的变量， 所以 `foo`函数执行完成之后， 其整个调用栈的状态如图：

![](https://img.yueluo.club/blog/img/ab33108d10be0bceb20894fa647c75c336.png)

从上图可以看出，`foo` 函数执行完成之后，其执行上下文已经从栈顶弹出，但是由于返回的 `setName` 和 `getName` 方法中使用了 `foo` 函数内部的变量 `myName` 和 `test1`，所以这两个变量依然保存在内存中。这非常像 `setName` 和 `getName` 方法背的一个专属背包，无论是在哪调用 `setName` 和 `getName` 方法，它们都会背着这个 `foo` 函数的专属背包。

之所以是专属背包，是因为除了 `setName` 和 `getName` 函数之外，其他任何地方都是无法访问该背包的，我们就可以把这个背包称为 `foo` 函数的闭包。

现在我们可以给闭包一个正式的定义了。**在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。**比如外部函数是 `foo`，那么这些变量的集合就称为 `foo` 函数的闭包。

> [MDN 闭包定义](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
>
> 一个函数和对其周围状态(lexical environment， 词法环境)的引用捆绑在一起(或者说函数被引用包围)，这样的组合就是闭包。也就是说，闭包可以让你在内层函数中访问到外层函数的作用域。在JavaScript中, 每创建一个函数， 闭包就会在函数创建的同时被创建出来。



## 闭包是如何回收的

如果闭包使用不正确，那么很容易造成**内存泄露**，明白闭包如何回收能使你正确的使用闭包。

通常，如果引用闭包的函数是一个全局变量， 那么闭包会一直存在知道页面关闭。 但如果这个闭包以后不在使用的话， 就会造成内存泄露。

如果引用闭包函数的是一个局部变量， 等函数销毁后，下次JavaScript引擎执行垃圾回收时，判断闭包这块内容如果已经不在使用了， 那么JavaScript引擎的垃圾回收器就会回收这块内存。

所以在使用闭包的时候，应该尽量注意一个原则：**如果该闭包会一直使用，那么它可以作为全局变量而存在。但如果使用频率不高，而且占用内存又比较大，那就尽量让它成为一个局部变量。**

