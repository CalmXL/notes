// target 目标对象 你要进行处理的对象
// handler 容器 无数可以处理对象属性的方法

// var target = {
//   a: 1,
//   b: 2
// }

// var handler = {
//   get (target, prop) {
//     // console.log('This is property value ' + target[prop]);
//     return target[prop];
//   },
//   set (target, prop, value) {
//     target[prop] = value;
//     console.log(target[prop]);
//   }
// }

// let proxy = new Proxy(target, handler);

// console.log(proxy.a);
// proxy.b = 3;

// let arr = [
//   { name: 'xiaoming', age: 11 },
//   { name: 'xiaohong', age: 18 },
//   { name: 'xiaoqing', age: 22 },
//   { name: 'xiaohaung', age:33 },
//   { name: 'xiaowang', age: 55 },
//   { name: 'xiaoli', age: 66 },
// ];

// let persons = new Proxy(arr, {
//   get (arr, prop) {
//     return arr[prop];
//   },
//   set (arr, prop, value) {
//     arr[prop] = value;
//   }
// });

// persons[1] = { name: '悟空', age: 5000 };
// console.log(arr);

// let fn = function () {
//   console.log('I am a function');
// }

// fn.a = 123;

// let newFn = new Proxy(fn, {
//   get (fn, prop) {
//     return fn[prop] + ' This is Proxy return';
//   }
// });

// console.log(newFn.a);

// * ## ECMAScript 委员会 对象操作 14种方法

// & 1. 获取原型 [[GetPrototypeOf]]
// JS 很多的命令 关键字类型的， 不是方法式
var obj = {
  a: 1,
  b: 2
}

// var proto = Object.getPrototypeOf(obj);
// console.log(proto);
// console.log(obj.__proto__);
// console.log(Object.prototype);

// & 2. 设置原型 [[SetPrototypeOf]]
// Object.setPrototypeOf(obj, { c: 3, d: 4 });
// console.log(obj);


// & 3. 获取对象的可拓展性 [[IsExtensible]]
// var extensible = Object.isExtensible(obj);
// console.log(extensible); // true

// Object.freeze(obj); // 冻结对象， 不可修改， 不可删除， 不可写
// obj.a = 11;
// delete obj.a;
// obj.c = 12;


// Object.seal(obj); // 封闭对象，不可修改，不可删除， 可写的
// obj.a = 11; // 可写的
// delete obj.a;
// obj.c = 12;
// console.log(obj);


// var extensible2 = Object.isExtensible(obj);
// console.log(extensible2);// false 

// & 4. 获取自有属性 [[GetOwnProperty]]
// Object.setPrototypeOf(obj, { c: 3, d: 4 });
// console.log(Object.getOwnPropertyNames(obj)); // ['a', 'b']

// & 5. 禁止拓展对象 [[PreventExtensions]]
// Object.preventExtensions(obj);
// obj.c = 3;
// delete obj.a; // 可以删除属性
// console.log(obj);

// & 6. 拦截对象操作 [[DefineOwnProperty]]
// Object.defineProperty()

// & 7. 判断是否是自身属性 [[HasProperty]]
// console.log(obj.hasOwnProperty('a')); // true

// & 8. [[GET]]
// console.log('a' in obj); // true
// console.log(obj.a); // 1

// & 9. [[SET]]
// obj.a = 3;
// obj['b'] = 4;
// console.log(obj);

// & 10. [[Delete]]
// delete obj.a;
// console.log(obj); 

// & 11. [[Enumerate]]
// for (var key in obj) {
//   console.log(obj[key]);
// } 

//& 12. 获取键集合 [[OwnPropertyKeys]]
// Object.setPrototypeOf(obj, { c: 4, d: 4 });
// console.log(Object.keys(obj)); // ['a', 'b']


// & 13. [[Call]]
// function test () {} test();
// obj.test = function () {} obj.test();

// function test () {} test.call/apply...

// & 14. [[constructor]]
// function Test () {}
// new Test();



// * 重写 Proxy get set

function MyProxy (target, handler) {

  let _target = deepClone(target);
  Object.keys(_target).forEach((key) => {
    Object.defineProperty(_target, key, {
      get () {
        console.log(target);
        return handler.get && handler.get(target, key);
      },
      set (newVal) {
        handler.set && handler.set(target, key, newVal);
      }
    });
  });

  function deepClone (org, tar) {
    var tar = tar || {},
        toStr = Object.prototype.toString,
        arrType = '[object Array]';
    
    for (var key in org) {
      if (org.hasOwnProperty(key)) {
        if (typeof(org[key]) === 'object' && org[key] !== null) {
          tar[key] = toStr.call(org[key]) === arrType ? [] : {};
          deepClone(org[key], tar[key]);
        } else {
          tar[key] = org[key];
        }
      } 
    }
    return tar;
  }

  return _target;
}

// let target = {
//   a: 1,
//   b: 2
// }

// let proxy = new Proxy(target, {
//   get (target, prop) {
//     return target[prop]
//   },
//   set (target, prop, value) {
//     target[prop] = value;
//   },
//   has (target, prop) {
//     console.log(prop);
//     console.log(target[prop]);
//   },
//   deleteProperty(target, prop) {
//     delete target[prop];
//   }
// });

// console.log(proxy);
// proxy.b = 3;
// console.log(target);
// target.b = 4;
// console.log(proxy);  

// console.log('a' in proxy);

// delete proxy.b;
// console.log(proxy);


// & Reflect
// let tar = {
//   a: 1,
//   b: 2
// }

// let proxy = new Proxy(tar, {
//   get (target, prop) {
//     console.log('GET: ' + prop);
//     return Reflect.get(target, prop);
//   },
//   set (target, prop, value) {
//     console.log('SET: ' + value);
//     Reflect.set(target, prop, value);
//   },
//   has (target, prop) {
//     console.log('Has: ' + prop);
//     return Reflect.has(target, prop);
//   }
// });

// proxy.a;
// proxy.b = 4;
// console.log(proxy);
// console.log('a' in proxy);

// & Proxy 拓展构造函数
function extend (sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype, "constructor"
  );

  base.prototype = Object.create(sup.prototype);
  var handler = {
    construct: function(target, args) {
      var obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function(target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    }
  };
  var proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, "constructor", descriptor);
  return proxy;

}

var Person = function (name) {
  this.name = name;
}

var Boy = extend(Person, function (name, age) {
  this.age = age;
});

Boy.prototype.sex = 'M';

var peter = new Boy('peter', 13);

console.log(peter);