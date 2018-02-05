//是否为类对象
const isObjectLike = val => val !== null && typeof val === 'object'
let y = isObjectLike([]),
    n = isObjectLike(null)
console.log(y, n);