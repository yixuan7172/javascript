//如果一个对象看起来像一个Promise,则返回 true，否则返回 false。
const isPromiseLike = obj => obj !== null &&
    (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
let n = isPromiseLike(null)
let y = isPromiseLike({
    then: function() {
        return ''
    }
})
console.log(y);