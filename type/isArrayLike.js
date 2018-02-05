//是否为类数组
const isArrayLike = val => {
    try {
        return [...val], true
    } catch (e) {
        return false
    }
}
let y = isArrayLike('abc'),
    n = isArrayLike({
        "a": 1,
        "b": 2
    })
console.log(y, n)