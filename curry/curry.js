//函数柯里化

/********************第一版*************************************/
function curry1(fn, ...args) {
    return function() {
        const newArgs = [...args, ...Array.from(arguments)]
        return fn.apply(this, newArgs)
    }
}

function add(a, b) {
    return a + b
}
let addCurry = curry1(add)
console.log(addCurry(2, 3))