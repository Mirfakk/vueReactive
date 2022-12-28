var uid = 0;
export default class Dep {
  //类中需要带构造函数
  constructor() {
    console.log('dep');
    this.id = uid++;

    //用数组存储自己的订阅者。subs是英语subscribes订阅者的意思。
    //subs是watcher的实例，这里放的就是watcher的实例
    this.subs = [];
  }
  //添加订阅
  addSub(sub) {
    this.subs.push(sub);
  }
  //添加依赖
  depend() {
    //Dep.target就是我们自己指定的全局的位置

    if (Dep.target) {
      //如果存在,就推入到订阅中
      this.addSub(Dep.target);
    }
  }
  //通知更新
  //这里是所有监听的属性发生改变时都要触发一次notify
  notify() {
    console.log('调用了Notify');

    //浅克隆一份
    const subs = this.subs.slice();
    //遍历
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
};