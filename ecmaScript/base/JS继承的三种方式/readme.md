# JS继承的三种方式

## 1. 基于原型链的继承

通过重写原型prototype来实现继承，但是子原型中的属性修改会导致父原型也被更改（同一引用）。
```javascript
Teacher.prototype.name = 'JayZhou';
function Teacher () {}

Student.prototype = Teacher.prototype;
function Student () {}

var student = new Student();

console.log(student.name);
// 弊端: 子原型中的属性修改会导致父原型也被更改。

Student.prototype.name = 'JJ';
Student.prototype.age = 20;

console.log(Teacher.prototype); // { name: 'JJ', age: 20, constructor: f }
```

## 2. 借用构造函数

使用`call/apply`借用的形式来实现继承， 这种形式无法访问到父类原型上的属性。

```javascript
Teacher.prototype.name = 'JayZhou';

function Teacher () {
  this.skill = 'JS/JQ';
}

function Student () {
  console.log(this);
  Teacher.apply(this); // 借用构造函数
  this.age = 20;
} 

var student = new Student();

console.log(student.skill); // 'JS/JQ'
console.log(student.age); // 20
// 弊端: 无法访问父类原型上的方法
console.log(student.name); // undefined
```

## 3. 圣杯模式

为了解决前面俩种方式的弊端，我们采用圣杯模式。

```javascript
Teacher.prototype.name = '张三';
function Teacher () {
  this.skill = 'JS/JQ';
}

function Student () {
  this.age = 20;
}

// 创建一个缓冲层
function Buffer () {}
// 使得Buffer的原型对象与Teacher的原型对象指向同一个引用地址
Buffer.prototype = Teacher.prototype;

var buffer = new Buffer();
// 然后让Student的原型指向Buffer的实例化对象
Student.prototype = buffer;

var student = new Student();

console.log(student); // Student {age: 20}

// 尝试修改原型上的属性
Student.prototype.test = 'test';
console.log(Student.prototype); // Teacher {test: "test"}
console.log(Teacher.prototype); // {name: "张三", constructor: ƒ}
// 父类原型未受到影响

// 获取父类原型上的属性
console.log(student.name); // '张三'
// 能够获取得父类原型上的属性
```

虽然，圣杯模式下无法修改父类原型上的属性， 但是对于引用值来说， 还是会被修改的。

```javascript
function Teacher () {}
Teacher.prototype.students = ['马云', '马化腾'];
Teacher.prototype.age = 88;

function Student () {
  this.name = '张三';
  this.skill = 'HTML/CSS';
}

var Buffer = function () {}
Buffer.prototype = Teacher.prototype;

Student.prototype = new Buffer();

var student = new Student();

console.log(student); // Student {name: "张三", skill: "HTML/CSS"}

student.students.push('马冬梅');

console.log(student.students); // ["马云", "马化腾", "马冬梅"]
console.log(Teacher.prototype.students); // ["马云", "马化腾", "马冬梅"]
```

## 4. 封装圣杯模式

```javascript
var inherit = (function () {
  var Buffer = function () {}

  return function (Target, Origin) {
    Buffer.prototype = Origin.prototype;
    Target.prototype = new Buffer;

    Target.prototype.constructor = Target; // 还原构造器
    Target.prototype.superClass = Origin; // 标识继承源
  }
})();
```
