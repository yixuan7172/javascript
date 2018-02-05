//获取原生类型的值
const getType = val => val === undefined ? 'undefined' : val === null ? 'null' : val.constructor.name.toLowerCase()
let value = getType('1')
console.log(value);