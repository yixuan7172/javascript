//是否为Function
const isFunction = obj => typeof obj === 'function'
let y = isFunction(function() {})
let n = isFunction(null)
console.log(y, n);