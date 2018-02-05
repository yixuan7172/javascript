//检测val是否是type的实例
const isInstanceof = (val, type) => val instanceof type

console.log(isInstanceof(new Number(1), Number))