import { observe } from "./observe";
import Dep from "./Dep";

//val可以当中是set和get闭包中的环境，闭包一定要有内外两层函数嵌套
export default function defineReactive(data, key, val) {
  const dep = new Dep();
  console.log('我是defineReactive', key);
  //判断参数个数，若为2，则等于本身
  if (arguments.length == 2) {
    val = data[key];
  }

  //子元素要进行observe,至此形成递归
  //这个递归不是函数自己调用自己，而是多个函数循环调用
  let childOb = observe(val);

  Object.defineProperty(data, key, {
    //可枚举
    enumerable: true,
    //可以被配置（delete）
    configurable: true,
    //只要访问a属性，就会调用get函数，读取该值，注意：若get和value同时使用会报错
    get() {
      console.log('访问了obj.' + key + '属性');
      //如果现在处于依赖收集截断
      if (Dep.target) {
        dep.depend();
        //判断子元素是否存在
        if (childOb) {
          //如果存在
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(newValue) {
      console.log('改变的obj.' + key + '的值', newValue);
      //若新值和旧值相等，则不做任何操作
      if (val == newValue) {
        return;
      }
      val = newValue;
      //当设置了新值，这个新值也要被observe
      childOb = observe(newValue);
      //发布订阅模式
      dep.notify();
    }
  });
};