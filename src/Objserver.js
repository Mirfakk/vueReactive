import { def } from './utils.js'
import defineReactive from './defineReactive.js';
import { arrayMethods } from './array.js';
import { observe } from './observe.js';
import Dep from './Dep';


export default class Observer {
  //首先需要有构造器
  constructor(value) {
    //每一个Observer的实例身上，都有一个dep
    this.dep = new Dep();
    //若存在__ob__就代表数据已经劫持过了
    //__ob__是不可枚举的
    //（构造函数中的this不是类本身，而是指向实例。）添加了__ob__属性，值是这次new的实例。
    //这里的this表示实例本身
    def(value, '__ob__', this, false);
    // console.log('observer构造器', value);
    //Objserver类目的是：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object
    //检查是数组还是对象
    if (Array.isArray(value)) {
      //如果是数组，将该数组原型指向自己定义的方法
      Object.setPrototypeOf(value, arrayMethods);
      //让数组变得observe
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  //遍历value对象的每一个key，将每一个key都设置成defineReactive
  walk(value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }
  //数组的特殊遍历
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      //逐项进行observe
      observe(arr[i]);
    }
  }
};