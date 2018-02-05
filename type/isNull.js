//是否为Null
const isNull = val => val === null
let n = isNull(1),
    y = isNull(null)
console.log(y, n);

//是否为undefined
const isUndefined = val => val === undefined
let un = isUndefined(null)
console.log(un);