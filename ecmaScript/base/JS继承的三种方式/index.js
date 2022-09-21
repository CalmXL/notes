// & 1. 基于原型链继承
// Teacher.prototype.name = 'JayZhou';
// function Teacher () {}

// Student.prototype = Teacher.prototype;
// function Student () {}

// var student = new Student();

// console.log(student.name);
// // 弊端: 子原型中的属性修改会导致父原型也被更改。

// Student.prototype.name = 'JJ';
// Student.prototype.age = 20;

// console.log(Teacher.prototype); // { name: 'JJ', age: 20, constructor: f }

// & 2. 借用构造函数
// Teacher.prototype.name = 'JayZhou';

// function Teacher () {
//   this.skill = 'JS/JQ';
// }

// function Student () {
//   //var this =  {
//   //  __proto__: Student,
//   // skill: JS/JQ
//   // age: 20
//   //}
//   Teacher.apply(this); // 借用构造函数
//   this.age = 20;
// } 

// var student = new Student();

// console.log(student.skill); // 'JS/JQ'
// console.log(student.age); // 20
// // 弊端: 无法访问父类原型上的方法
// console.log(student);

// & 3. 圣杯模式
// Teacher.prototype.name = 'JayZhou';
// function Teacher () {
//   this.skill = 'JS/JQ';
// }

// function Student () {
//   this.age = 20;
// }
// // 创建一个缓冲层
// function Buffer () {}
// // 使Buffer的原型对象与Teacher原型对象指向同一个引用地址。
// Buffer.prototype = Teacher.prototype;

// var buffer = new Buffer();
// // 然后让Student的原型指向Buffer的实例化对象
// Student.prototype = buffer;

// var student = new Student();
// console.log(student);
// // console.log(student.__proto__  === buffer);

// // 尝试修改原型上的属性
// Student.prototype.test = 'test';
// Student.prototype.name = 'JJ';

// console.log(Student.prototype); // Teacher { test: 'test'}
// console.log(Teacher.prototype); // { name: 'JayZhou', constructor: f }
// // 父类原型未受到影响

// // 获取父类原型上的属性
// console.log(student.name); // 'JayZhou'
// // 能够获得父类原型上的属性

// ------------------------------
// function Teacher () {}
// Teacher.prototype.students = ['马云', '马化腾'];
// Teacher.prototype.age = 88;

// function Student () {
//   this.name = '张三';
//   this.skill = 'HTML/CSS';
// }

// var Buffer = function () {}
// Buffer.prototype = Teacher.prototype;

// Student.prototype = new Buffer();

// var student = new Student();

// console.log(student); // Student {name: "张三", skill: "HTML/CSS"}

// student.students.push('马冬梅');

// console.log(student.students); // ["马云", "马化腾", "马冬梅"]
// console.log(Teacher.prototype.students); // ["马云", "马化腾", "马冬梅"]

// function Father () {}

// Father.prototype = {
//   name: 'zhangsan',
//   age:28,
//   skill: 'JS/JQ',
//   colors: ['red', 'green']
// }

// var father = new Father();

// function Buffer () {}
// Buffer.prototype = Father.prototype;

// var buffer = new Buffer();

// Son.prototype = buffer;
// function Son () {}

// Son.prototype.colors = ['blue'];
// Son.prototype.age = 5;

// var son = new Son();


// console.log(son);

// console.log(Son.prototype.colors === Father.prototype.colors);// true
// console.log(Son.prototype.age === Father.prototype.age); // fasle

// console.log(son.__proto__ === Son.prototype);
// console.log(son.__proto__ === buffer);
// console.log(buffer.__proto__ === Buffer.prototype);
// console.log(buffer.__proto__ === Father.prototype  );


var inherit = (function () {
  var Buffer = function () {}
  
  return function (Target, Origin) {
    Buffer.prototype = Target.prototype;
    Origin.prototype = new Buffer();
    
    Target.prototype.constructor = Target;
    Target.prototype.superClass = Origin;
  }
})() 

Teacher.prototype = {
  age: 11,
  name: 'zhangsan'
}
function Teacher () {}


function Student () {}

inherit(Teacher, Student);
Student.prototype.age = 11;


var s = new Student();
console.log(s);