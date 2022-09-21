# Proxy 与 Reflect

## Proxy
defineProperty 劫持数据 -> 给对象进行拓展 -> 属性进行设置

Proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义(如属性查找、赋值、枚举、函数调用等)。

>语法:
>const p = new Proxy(target, handler);
>
>术语:
>handler: 包含捕捉器(trap)的占位符对象， 可译为处理器对象。
>traps: 提供属性访问的方法。这类似于操作系统中的捕获器的概念。
>target: 被`Proxy`代理虚拟化的对象。它常被作为代理的存储后端。根据目标验证关于对象不可扩展性或不可配置属性的不变量(保持不变的语义)。

## ECMAScript 委员会 对象操作 14种方法

1. 获取原型 [[GetPrototypeOf]]  
2. 设置原型 [[SetPrototypeOf]]
3. 获取对象的可拓展性 [[IsExtensible]]
  - Object.freeze 冻结对象
  ```JavaScript
  var obj = {
    a: 1,
    b: 2
  }
  // 不可修改、不可删除、 不可写
  Object.freeze(obj); 
  obj.a = 11;
  delete obj.a;
  obj.c = 12;
  ```
  - Object.seal 封闭对象
  ```JavaScript
  var obj = {
    a: 1,
    b: 2
  }

  // 封闭对象 可写的、不可添加、不可删除
  Object.seal(obj);
  obj.a = 11; // 可以写
  delete obj.a;
  obj.c = 12;
  ```

4. 禁止拓展对象 [[PreventExtensions]]
5. 获取自有属性 [[GetOwnProperty]]
6. 拦截对象操作 [[DefineOwnProperty]]
7. 判断是否自身属性 [[HasProperty]]
8. 读取 [[GET]]
9. 设置 [[SET]]
10. 删除 [[Delete]]
11. 获取键集合 [[OwnPropertyKeys]]
12. 调用 [[Call]]
13. 构造 [[Constructor]]

## handler 对象的方法

`handler` 对象是一个容纳一批特定属性的占位符对象。 它包含有 `Proxy` 的各个捕获器(trap)。

所有捕捉器是可选的。 如果没有定义某个捕捉器，那么就会保留源对象的默认行为。

1. handler.getPrototypeOf() 
    -> Object.getPrototypeOf()方法的捕捉器。

2.handler.setPrototypeOf()
    -> Object.setPrototypeOf()方法的捕捉器。

3. handler.isExtensible()
    -> Object.isExtensible()方法的捕捉器。

4. handler.preventExtensions()
    -> Object.preventExtensions()方法的捕捉器。

5. handler.getOwnPropertyDescriptors()
    -> Object.getOwnPropertyDescriptors()方法的捕捉器。

6. handler.defineProperty()
    -> Object.defineProperty()方法的捕捉器

7. handler.has()
    -> in 操作符的捕捉器。

8. handler.get()
    -> 属性读取操作的捕捉器。

9. handler.set()
    -> 属性设置操作的捕捉器

10. handler.delete()
    -> delete 操作符的捕捉器。

11. handler.ownKeys()
    -> Object.getOwnPropertyNames方法 和 Object.getOwnPropertySymbols方法的捕捉器

12.handler.apply()
    -> 函数调用操作的捕捉器

13.handler.constructor()
    -> new 操作符的捕捉器。


## Reflect 反射
Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与`proxy handlers` (en-US)的方法相同。
Reflect不是一个函数对象，因此它是不可构造的。

所以不能通过操作 `new操作符`对其进行调用，或者将 `Reflect`对象作为一个函数来调用。
Reflect 的所有属性和方法都是静态的(就像Math)。

Reflect 对象提供了以下静态方法，这些方法与proxy handler methods (en-US)的命名相同。

1. Reflect.apply(target, thisArgument, argumentsList)
    对一个函数进行调用操作， 同时传入一个数组作为调用参数。 和Function.prototype.apply()功能类似

2. Reflect.constructor(target, argumentsList[, new Target])
    对构造函数进行 new 操作，相当于执行 new target(...args)。

3. Reflect.defineProperty(target, propertyKey, attributes)
    和 Object.defineProperty() 类似。如果设置成功就会返回 true

4. Reflect.deleteProperty(target, propertyKey)
    作为函数的 delete 操作符， 相当于执行 `delete target[name]`

5. Reflect.get(target, propertyKey[, receiver])
    获取对象上身上的某个属性值， 类似于target[name]

6. Reflect.getOwnPropertyDescriptors(target, propertyKey)
    类似于Object.getOwnPropertyDescriptors()。 如果对象中存在该属性，则返回对应的属性描述符， 否则返回 undefined。

7. Reflect.getPrototypeOf(target)
    类似于 Object.getPrototypeOf()。

8. Reflect.has(target, propertyKey)
    判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。

9. Reflect.isExtensible(target)
    类似于 Object.isExtensible().

10. Reflect.ownKeys(target)
    返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable 影响).

11. Reflect.preventExtensions(target)
    类似于 Object.preventExtensions()。返回一个Boolean。  

12. Reflect.set(target, propertyKey, value[, receiver])
    将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。

13. Reflect.setPrototypeOf(target, prototype)
    设置对象原型的函数。返回一个 Boolean， 如果更新成功，则返回 true。
