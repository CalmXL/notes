# js - 小坑

## 1. ParseInt 遇上 map

```javascript
const result = ['1', '2', '3'].map(parseInt);

console.log(result); // [1, NaN, NaN] 
```

分析: 
1. parseInt 需要俩个参数，(value, radix), map回调函数存在三个参数(item, index, arr)。
2. parseInt 中radix 参数的合理范围值为(2 - 36)之间嗯整数， 用于转换中采用的基数。 如果省略该参数或者其值为0, 数字将以10为基础值进行解析。
3. 如果参数 < 2 或者 > 36，这parseInt 返回 NaN

- parseInt('1', 0) -> 10进制解析 -> return 1
- parseInt('2', 1) -> 参数1非法 -> return NaN
- parseInt('3', 2) -> 在2进制中， 3是非法字符串， 转换失败， -> return NaN


## 2. 神奇的null

```javascript
console.log(typeof null); // 'object'
console.log(null instanceof Object); // false
```
解析： 
1. typeof null 结果为 'object'， 这是 Ecma的bug, 这个bug存在已久， 也许永远不会被修复， 因为它牵扯到了太多的 web 系统， 修复它了能会产生更多的bug， 令之前的很多结果出现错误。

2. instanceof 运算符用来测试一个对象在其原型链构造函数上是否具有 prototype 属性，null 值并不以 Object 为原型创建出来，所以 null instance Object 返回 false。


## 3. 愤怒的reduce

```javascript
const res = [3, 2, 1].reduce(Math.pow); // -> 3 ^ 2 = 9
console.log(res); // 9

const res1 = [].reduce(Math.pow);
console.log(res1); // Reduce of empty array with no initial value
```

解析: 
1. 如果数组为空没有提供 initialValue， 会抛出 `TypeError`。
2. 如果数组只有一个元素(无论位置如何)且没有提供 `initialValue`, 或者有提供initialValue但是数组为空，那么唯一值将被返回并且callback不会被执行。


## 4. 该死的优先级

```javascript
const val = 'hero';
console.log('he is ' + val === 'hero' ? 'good' : 'bad'); // no

console.log(`he is ${ val === 'hero' ? 'good' : 'bad'}`); // he is good
```
