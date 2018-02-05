//是否为原始值
const isPrimitive = val => !['object', 'function'].includes(typeof val) || val === null
let y = isPrimitive(null)
let n = isPrimitive([])
console.log(y, n);