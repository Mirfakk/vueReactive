import Dep from "./Dep";

/**
 * watcher保存每一次要watch这个东西的回调函数
 */
var uid = 0;

export default class Watcher {
  //类中需要带构造函数
  constructor(target, expression, callback) {
    console.log('Watcher');
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = get();
  }
  update() {
    this.run();
  }
  get() {
    //进入依赖收集阶段，让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
    Dep.target = this;//等于它自己

    const obj = this.target;

    var value;
    //只要能找，就一直找
    try {
      this.getter(obj);
    }
    finally {
      Dep.target = null;
    }
    return value;
  }
  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    const value = this.get();

    if (value !== this.value || typeof value == 'object') {
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target, value, oldValue);
    }
  }
}
//函数声明提升
function parsePath(str) {
  var segments = str.split('.');

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}