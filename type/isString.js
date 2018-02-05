//是否为string
const isString = val => typeof val === 'string'
let y = isString('1'),
    n = isString(1)
console.log(y, n);