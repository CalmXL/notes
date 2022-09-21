// function Test () {}

// Test.prototype.name = '张三';
// Test.prototype.age = 20;

// console.log(Test.prototype);

// var test1 = new Test(),
//     test2 = new Test();

// console.log(test1.name); // '张三'
// console.log(test2.age); // 20

// console.log(Test.prototype.constructor === Test); // true
// console.log(test1.__proto__ === Test.prototype); // true
// console.log(Object.getPrototypeOf(test1) === Test.prototype); // true

// Car.prototype.name = 'Benz';
// function Car () {}

// var car = new Car();

// console.log(car.name); // Benz

// Car.prototype.name = 'BMW';
// console.log(car.name); // BMW
// console.log(Car.prototype); // { name: 'BMW', constructor: f }


// Phone.prototype.name = 'iphone12';
// function Phone () {}; 

// var phone = new Phone();

// console.log(phone.name); // iphone12

// Phone.prototype = {
//   constructor: Phone,
//   name: 'iphoneX'
// }

// console.log(phone.name); // iphone12
// console.log(Phone.prototype); // { name: 'iphoneX', constructor: f }


// var obj = Object.create(null);

// console.log(obj); // { No properties }

// obj.name = 'test';
// console.log(obj);

// Object.setPrototypeOf(obj, Object.prototype);
// console.log(obj);

// console.log(obj.toString); // f toString () { [native code] }
// console.log(obj instanceof Object); // true

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

console.log(student.students); // {alibaba: 10086, tencent: 10010}
console.log(student.number); // 100

// 修改原始值
student.number ++;
console.log(student.number); // 101
console.log(teacher.number); // 100
// 相当于 student.number = student.number + 1;
// 第一个student.number意味着给student对象增加一个number属性
// 而第二个student.number是从原始链上查找到的值 100
// 所以student会变成 { pSkill: 'HTML/CSS', number: 101 }
// 而teacher则不会变
console.log(student); // { pSkill: 'HTML/CSS', number: 101 }

// 修改引用值
student.students.baidu = 10000;
console.log(student.students); // {alibaba: 10086, tencent: 10010, baidu: 10000}
console.log(teacher.students); // {alibaba: 10086, tencent: 10010, baidu: 10000}