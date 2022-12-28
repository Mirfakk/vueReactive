import Observer from "./Objserver";

//创建observe函数，注意函数名字没有r，起到判别作用
export const observe = function (value) {
  //判断传递进来的参数，如果不是对象，则不做操作
  if (typeof value != 'object') return;
  //定义ob，用于存储objserver实例
  var ob;
  //如果value身上不是undefined，那么就从这个对象身上取值
  if (typeof value.__ob__ !== 'undefined') {
    //__ob__是存储Observer的实例
    ob = value.__ob__;
  } else {
    //否则就new出实例
    ob = new Observer(value);
  }
  return ob;
}