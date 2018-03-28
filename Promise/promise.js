//手动实现一个promise
function Promise(executor) { //executor：执行器
    const _this = this
    _this.status = 'pending' //默认状态为等待状态
    _this.value = undefined //成功时传给回调的数据，默认为undefined
    _this.reason = undefined //失败时传给回调的数据，默认为undefined
    _this.onResolvedCallbacks = [] //存放then成功的回调
    _this.onRejectedCallbacks = [] //存放then失败的回调

    function resolve(value) {
        if (_this.status === 'pending') {
            _this.status = 'resolved' //改为成功状态
            _this.value = value //保存成功进来时的数据
            _this.onResolvedCallbacks.forEach(fn => fn()) //当成功的函数调用时，之前缓存的回调会被一一调用
        }
    }

    function rejecte(reason) {
        if (_this.status === 'pending') {
            _this.status = 'rejected' //改为失败状态
            _this.reason = reason //保存失败原因
            _this.onRejectedCallbacks.forEach(fn => fn()) //当失败的函数调用时，之前缓存的回调会被一一调用
        }
    }
    try {
        executor(resolve, rejecte) //执行执行器函数，并将两个方法传入
    } catch (err) {
        rejecte(err)
    }
}
Promise.prototype.then = function(onFulfilled, onRejected) {
    const _this = this
    let promise2

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) {
        return value
    }
    onRejected = typeof onRejected === 'function' ? onRejected : function(err) {
        throw err
    }

    if (_this.status === 'pending') { //每一次then的时候，如果是'pending'状态，就把回调push进数组
        promise2 = new Promise((resolve, reject) => {
            _this.onResolvedCallbacks.push(() => { //用函数包起来是为了后面加入新的逻辑
                setTimeout(() => {
                    try {
                        let x = onFulfilled(_this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            })
        })
        _this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
                try {
                    let x = onRejected(_this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
    if (_this.status === 'resolved') { //判断当前Promise的状态
        promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(_this.value) //若是成功状态，执行用户传递的成功回调，并把数据传进去
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
    if (_this.status === 'rejected') {
        promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(_this.reason) //若是失败状态，执行用户传递的失败回调，并把原因传进去
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
    return promise2
}

Promise.prototype.catch = function(callback) {
    return this.then(null, callback)
}

//接收一个promise数组，返回新的promise，遍历数组，都完成再resolve
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let arr = [] //最终返回值的结果
        let i = 0 //表示成功了多少次
        function processData(index, y) {
            arr[index] = y
            if (++i === promises.length) {
                resolve(arr)
            }
        }
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(y => {
                processData(i, y)
            }, reject)
        }
    })
}

//四个参数，promise,返回值,成功和失败的回调
function resolvePromise(promise2, x, resolve, reject) {
    //有可能x是别人写的promise
    if (promise2 === x) { //报一个类型错误
        return reject(new TypeError('循环引用了'))
    }
    //看x是不是一个promise，promise应该是一个对象
    let called //表示是否调用成功或失败

    //判断上一次then返回的是普通值还是函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        //可能是promise，就看这个对象是否有then方法，如果有，则认为它是promise
        try {
            let then = x.then //保存一下x的then方法
            if (typeof then === 'function') {
                //成功
                //这里的y也是官方规范，如果还是promise，可以当下一次的x使用
                //用call方法修改修改指针为x，否则this指向window
                then.call(x, y => {
                    if (called) return //如果调用过，return掉
                    called = true;
                    //y还可能是一个promise，再去解析直到返回的是一个普通值
                    resolvePromise(promise2, y, resolve, reject)
                }, err => { //失败
                    if (called) return
                    called = true
                    reject(err)
                })
            } else {
                resolve(x)
            }

        } catch (err) {
            if (called) return
            called = true
            reject(err)
        }
    } else { //说明是普通值
        resolve(x)
    }

}
module.exports = Promise;