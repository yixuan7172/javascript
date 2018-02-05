//是否是Number类型
const isNumber = obj => typeof obj === 'number'
let y = isNumber(1),
    n = isNumber(null)
console.log(n, y);