//遍历工具函数
//最后一个参数是可枚举性
export const def = function (obj, key, value, enumerable) {
  //
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true,
  })
}