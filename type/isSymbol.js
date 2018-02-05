//是否是Symbol
const isSymbol = val => typeof val === 'symbol'
let y = isSymbol(Symbol(1)),
    n = isSymbol(1)
console.log(y, n);