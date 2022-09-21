# JS 模块化

IE6之前没有JS引擎，JS属于渲染引擎。IE6之后，出现JS引擎，JS才真正开始发展。

## 模块化概念产生: 
  当时方式， 直接在 script 标签内写JS脚本。

```html
<script>
  // 代码... 
</script>
```

随着发展， 代码量增多， 开始使用外部JS, 并进行区分。 这是最初模块化概念。

index1.html

```html
<script type="text/javascript" src="js/index1.js"></script>
```

index2.html

```html
<script type="text/javascript" src="js/index2.js"></script>
```

## 外部文件引入

问题: 处理通用的JS脚本。

解决方案: 处理 common.js 文件， 编写公用脚本，以供页面使用。

index1.html
```html
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/index1.js"></script>
```

index.html
```html
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/index2.js"></script>
```

## 公用脚本处理

问题: 通过引入common.js， 加载某些不必要的JS脚本。
解决方案: 不能只以页面为基础， 来区分JS文件， 需要以JS脚本功能作为区分。

module_a.js
```javascript
var a = [1, 2, 3, 4, 5].reverse();
```

module_b.js
```javascript
var b = a.concat([6, 7, 8, 9, 10]);
```

module_c.js
```javascript
var c = b.join('-');
```

index.js
```javascript
console.log(a);
console.log(b);
console.log(c);
```

index.html
```html
<script type="text/javascript" src="js/module_a.js"></script>
<script type="text/javascript" src="js/module_c.js"></script>
<script type="text/javascript" src="js/module_c.js"></script>
<script type="text/javascript" src="js/index.js"></script>
```

## 存在问题

- JS加载顺序必须以模块之间逻辑相关。
- 引入模块文件使用一个JS作用域(全局作用域)。
- 变量重名导致变量覆盖问题， 会污染全局。

## 模块化解决的本质问题
- 加载顺序
- 污染全局

## 关于污染全局

- 污染全局并不是只要在全局声明变量就是污染全局。
- 所有可控的声明在全局中不叫污染全局。
- 在全局声明数据类型的变量才是真正的污染全局。

```javascript
var a = 123;
var b = [];
var c = {};
```

## 模块独立、相互依赖

问题: 全局污染
解决方案: 使用立即执行函数， 创建模块的独立作用域。

## 使用立即执行函数

解决污染全局问题和模块依赖问题，实现按需调用，互不干扰。
但是并没有解决加载顺序问题。

module_a.js

```javascript
var moduleA = (function () {
  var a = [1, 2, 3, 4, 5].reverse();

  return {
    a: a
  }
})();
```

module_b.js

```javascript
var moduleB = (function (moduleA) {
    var b = moduleA.concat([6, 7, 8, 9, 10]);

    return {
      b: b
    }
})(moduleA);
```

module_c.js

```javascript
var moduleC = (function (moduleB) {
   var c = moduleB.join('-');

   return {
     c: c
   }
})(moduleB);
```

index.js
```javascript
var moduleC = (function (moduleB) {
   var c = moduleB.join('-');

   return {
     c: c
   }
})(moduleB);
```

index.html

```html
<script type="text/javascript" src="js/module_a.js"></script>
<script type="text/javascript" src="js/module_c.js"></script>
<script type="text/javascript" src="js/module_c.js"></script>
<script type="text/javascript" src="js/index.js"></script>
```

## NodeJs模块化体验

NodeJS诞生带来前所未有的模块化体验，不再需要html导入JS, 真正实现JS模块之间的相互独立与依赖。

> require('....') // 引入模块
> module.exports // 导出模块

## CommonJS实现

module_a.js

```javascript
var a = (function () {
  return [1, 2, 3, 4, 5].reverse();
})();

module.exports = {
  a
}
```

module_b.js
```javascript
var moduleA = require('./module_a') ;

var b = (function () {
  return moduleA.a.concat([6, 7, 8, 9, 10]);
})();

module.exports = {
  b
}
```

module_c.js
```javascript
var moduleB = require('./moduleB');

var c = (function () {
  return moduleB.b.join('-');
})();

module.exports = {
  c
}
```

index.js
```javascript
import moduleA require('./moduleA');
import moduleB require('./moduleB');
import moduleC require('./moduleC');

console.log(moduleA.a);
console.log(moduleB.b);
console.log(moduleC.c);
```

## 关于CommonJS 

CommonJS是一种模块化规范， 不是JS方法集合、JS库。
CommonJS规范来源于NodeJS。
CommonJS使用的方法， 实际是同步方法， 文件加载是同步进行的。

CommonJS使用require关键字， 只要引用，就会创建一个模块实例(实例化)。
CommonJS存在缓存机制，只要require导入，模块就会被缓存，不对多次进行导入。
CommonJS是在Node环境中运行的， 客户端环境无法运行。

require在引用后实质是一个立即执行函数。

```javascript
;(function (exports, require, module, __filename, _dirname) {

})()
```

## AMD

客户端的"CommonJS" -AMD, 但俩者只是表面上相似
CommonJS是同步模块定义， AMD是异步模块定义(Asynchronous Module Definiton)
RequireJS是AMD规范的实现，AMD规范是由RequireJS实现的，可以实现异步加载模块；
AMD不支持浏览器，不需要运行在node环境，也不需要运行在webpack中

> define(moduleName, [module], factory); // 定义模块
> require([module], callback); // 引入模块

AMD是所有模块加载完毕，才会执行回调函数， 是前置依赖，即依赖前面的模块。
不会考虑模块的加载顺序问题，解决模块加载顺序问题。
规范了模块的输入与输出， 实际使用async的方式异步加载模块。

RequireJS

module_a.js
```javascript
define('moduleA', function () {
  var a = [1, 2, 3, 4, 5];

  return {
    a: a.reverse()
  }
});
```

module_b.js
```javascript
define('moduleB', ['moduleA'], function (moduleA) {
  var b = [6, 7, 8, 9, 10];

  return {
    b: moduleA.a.concat(b)
  }
});
```

module_c.js
```javascript
define('moduleC', ['moduleB'], function (moduleB) {
  return {
    c: moduleB.b.join('-')
  }
});
```
index.js
```javascript
require.config({
  paths: {
    moduleA: './module_a',
    moduleB: './module_b',
    moduleC: './module_c'
  }
});

require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC) {
  console.log(moduleA.a);
  console.log(moduleB.b);
  console.log(moduleC.c);
});
```

index.html
```html
<script src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js"></script>
<script src="./index.js"></script>
```

## CMD

阿里也为模块化做贡献-CMD
通用模块定义 (Common Module Definiton)
浏览器同样不支持CMD规范，使用SeaJS规范

```javascript
// 定义模块
define(function (require, exports, module) {}); 

// 使用模块
seajs.use([module路径], function (moduleA, moduleB, moduleC) {});
```

CMD require 引入模块、 define定义模块
exports 导出模块、 module 操作模块

使用模块时， 需要配置模块URL;
依赖加载完毕后执行factory

CMD是依赖就近，按需加载模块， 与CommonJS、 AMD有本质区别。
AMD是前置依赖，CMD是需要的时候去加载模块。

## SeaJS

module_a.js
```javascript
define(function (require, exports, module) {
  var a = [1, 2, 3, 4, 5];

  return {
    a: a.reverse()
  }
});
```

module_b.js
```javascript
define(function (require, exports, module) {
  var moduleA = require('./module_a'),
      b = [6, 7, 8, 9, 10];

  return {
    b: moduleA.a.concat(b)
  }
});
```

module_c.js
```javascript
define(function (require, exports, module) {
  var moduleB = require('./module_b');

  return {
    c: moduleB.b.join('-')
  }
});
```

index.js
```javascript
seajs.use([
  './module_a.js', 
  './module_b.js',
  './module_c.js'], function (moduleA, moduleB, moduleC) {
  console.log(moduleA.a);
  console.log(moduleB.b);
  console.log(moduleC.c);
});
```

index.html
```html
<script src="https://cdn.bootcdn.net/ajax/libs/seajs/3.0.3/sea.js"></script>
<script src="index.js"></script>
```

## ES6模块化

ES6官方给出了权威方案 - ES6模块化

> import module from '模块化路径';
> export module;