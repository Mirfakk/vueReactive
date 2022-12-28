/**
 * Object.defineProperty:定义某一个对象的属性的值
 *  该方法可以设置一些额外的隐藏的属性
 */

import defineReactive from "./defineReactive";
import Observer from "./Objserver.js";
import { observe } from "./observe.js";
import Watcher from "./Watcher";
var obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 10,
  c: {
    d: {
      e: {
        f: 999
      }
    }
  },
  g: [22, 33, 44, 55],
};

//这里回去看ob身上有没有__ob__
observe(obj);
new Watcher(obj, 'a.m.n', function (val) {
  console.log("***", val);
});

obj.a.m.n = 99;
console.log(obj);


/*
var obj = {};
//定义obj对象的a属性的值
Object.defineProperty(obj, 'a', {
  //a的值设置为3
  value: 3,
  //是否可修改 true为可修改，false不能修改（只读）
  writable: true,
  //是否可以被枚举
  enumerable: true,
});

Object.defineProperty(obj, 'b', {
  //b的值设置为5
  value: 5,
  //是否可以被枚举
  enumerable: false,
});

Object.defineProperty(obj, 'c', {
  //b的值设置为5
  value: 7,
  //是否可以被枚举
  enumerable: false,
});

console.log(obj.a, obj.b, obj.c);

//若不能被枚举，那么循环则会跳过
for (var k in obj) {
  console.log(k);
}
*/