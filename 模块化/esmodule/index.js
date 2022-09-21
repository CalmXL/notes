import A from './module_a';
import moduleB from './module_b';
import moduleC from './module_c';
import { a as a1, b, c } from './utils'

console.log(A.a);
console.log(moduleB.b);
console.log(moduleC.c);
console.log(a1, b, c);