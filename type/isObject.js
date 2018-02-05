//使用 Object 构造函数为给定值创建对象包装。 如果该值为 null 或 undefined ，则创建并返回一个空对象{}。 
//否则，返回一个对应于给定值的类型的对象。

//是否为对象
const isObject = obj => obj === Object(obj)
let y = isObject(['1']),
    n = isObject()
console.log(y, n);