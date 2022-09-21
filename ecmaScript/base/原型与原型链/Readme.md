# 原型与原型链

## JavaScript中的原型

在JavaScript中，函数可以有属性。每个函数都有一个特殊的属性叫作 `原型(prototype)`,如下面的代码显示：

```javascript
function Test () {}
console.log(Test.prototype);
// {
//   constructor: f Test ()
//   [[prototype]]: Object
// }
```
如上所示，`函数Test`拥有一个默认的`原型prototype`属性。现在我们可以添加一些属性到Test的原型上面:

```javascript
Test.prototype.name = '张三';
Test.prototype.age = 20;

console.log(Test.prototype);
// {
//   age: 20
//   name: '张三'
//   constructor: f Test ()
//   [[prototype]]: Object
// }
```
并且，我们可以通过Test实例化对象来访问到Test的原型属性:

```javascript
var test1 = new Test(),
    test2 = new Test();

console.log(test1.name); // '张三'
console.log(test2.age); // 20
```
那么，原型到底是什么呢？ 
- `原型prototype` 其实是 `function对象`的一个属性。
- 它也是一个对象。
- 它是构造函数构造出来的对象的公共祖先。
- 所有被构造函数构造出来的对象都可以继承原型上的属性和方法。

**constructor**

原型上的`构造器constructor`指向构造函数本身。

```javascript
function Test () {}
console.log(Test.prototype.constructor === Test); // true
```

**__proto__**

实例化对象的 `__proto__` 中存储的是构造函数的原型，它拿的是构造函数的原型的引用。

```javascript
console.log(test.__proto__ === Test.prototype); // true
```

当然，我们并不推荐直接访问对象的 `__proto__属性` 来获取原型，ES6推荐我们使用 `Object.getPrototypeOf`来获取原型。

```javascript
console.log(Object.prototypeOf(test) === Test.prototype); // true
```
那么，这个`__proto__`是如何来的呢？

众所周知，当构造函数被实例化时，会在该构造函数内部生成隐式的`this`, 并且在 this 里面会添加一个`__proto__属性`，它的值就是该构造函数的原型，最后把`this`返回给实例化对象。

```javascript
function Test () {
  // 实例化的隐式操作
  var this = {
    __proto__: Test.prototype
  }
  return this
}
```

如上所示，在 `__proto__` 里面存储的是 `Test` 的 `原型prototype` 的引用。

```javascript
Car.prototype.name = 'Benz';
function Car () {}

var car = new Car();

console.log(car.name); // Benz

Car.prototype.name = 'BMW';
console.log(car.name); // BMW
console.log(Car.prototype); // { name: 'BMW', constructor: f }


Phone.prototype.name = 'iphone12';
function Phone () {}; 

var phone = new Phone();

console.log(phone.name); // iphone12

Phone.prototype = {
  constructor: Phone,
  name: 'iphoneX'
}

console.log(phone.name); // iphone12
console.log(Phone.prototype); // { name: 'iphoneX', constructor: f }
```

从上面例子可以看出，实例化对象`__proto__属性`存储的仅是构造函数的`原型prototype`的引用，它们并不是一个东西。相当于下面的情况:

```javascript
var prototype = {
  name: 'Benz'
}

var __proto__ = prototype;
console.log(__proto__.name); // 'Benz'

prototype.name = 'BMW';
console.log(__proto__.name); // BMW


var prototype = {
  name: iphone12
}

var __proto__ = prototype;

console.log(__proto__.name); // 'iphone12'

prototype = {
  name: 'iphoneX'
}

console.log(__proto__.name); // iphoneX
```

## 原型链

在JavaScript中，每个对象都拥有一个`原型对象prototype`，对象以其原型为模板、从原型中继承方法和属性。而`原型对象prototype`也可能拥有原型， 并从中继承方法和属性， 一层一层、以此类推，这种关系被称为**原型链(prototype chain)。**

原型链的特点: 
- 沿着 `__proto__` 一层一层的查找 `__proto__`。
- 终点是 `Object.prototype`。
- 原型链上的增删改只能是自身的增删改。

当我们访问一个对象中的某个属性（name）时，浏览器首先查找obj中是否存在这个属性，如果obj中没有，浏览器就会在`obj.__proto__`中查找这个属性，如果`obj.__proto__`中也没有，则会继续查找`obj.__proto__.__proto__`... 当所有的`__proto__`中都无法找到`name属性`， 这个属性就是undefined。

```javascript
Professor.prototype.tSkill = 'Java';
function Professor () {}

var professor = new Professor();

Teacher.prototype = professor;
function Teacher () {
  this.mSkill = 'JS/JQ';
}

var teacher = new Teacher();

Student.prototype = teacher;
function Student () {
  this.pSkill = 'HTML/CSS';
}

var student = new Student();

console.log(student.pSkill); // 'HTML/CSS'
console.log(student.mSkill); // 'JS/JQ'
console.log(student.tSkill); // 'Javs'
console.log(student.skill); // undefined
```

**注意：并非所有对象都继承于`Object.prototype`， 继承自`Object.prototype`的对象都会有一个`toString()方法。看下面的例子:`**

```javascript
// Object.create(null) 生成的对象不会有任何属性， 包括__proto__
// 所以它并没继承于 Object.prototype
var obj = Object.create(null);

console.log(obj); // { No properties }

// 可以为其添加任意属性
obj.name = 'test';
console.log(obj);

// 也可以指定一个原型
Object.setPrototypeOf(obj, Object.prototype);
console.log(obj);

console.log(obj.toString); // f toString () { [native code] }
console.log(obj instanceof Object); // true
```

## 修改原型上的属性

```javascript
function Teacher () {
  this.mSkill = 'JS/JQ';
  this.students = {
    alibaba: 10086,
    tencent: 10010
  }
  this.number = 100;
}

var teacher = new Teacher();

Student.prototype = teacher;
function Student () {
  this.pSkill = 'HTML/CSS';
}

var student = new Student();

console.log(studnet.students);
console.log(studnet.number);

// 修改原始值
student.number ++;
console.log(student.number);
console.log(teacher.number);

console.log(student); // { pSkill: 'HTML/CSS', number: 101 }

// 修改引用值
student.students.baidu = 10000;
console.log(student.students); // {alibaba: 10086, tencent: 10010, baidu: 10000}
console.log(teacher.students); // {alibaba: 10086, tencent: 10010, baidu: 10000}

```