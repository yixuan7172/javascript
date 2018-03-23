//创造一个new
function new2(fn) {
    //o.__proto__ = fn.prototype
    let o = Object.create(fn.prototype)

    //(在构造函数中this指向当前实例)让这个类作为普通函数值行 并且里面this为实例对象
    let k = fn.call(o)
    return typeof k === 'object' ? k : o
}