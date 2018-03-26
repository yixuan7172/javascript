//节流（如果你持续触发事件，每隔一段时间，只执行一次事件）

//第二版和第一版区别：
//                 第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
//                 第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件 


//************************第一版（使用时间戳）**********************
function throttle1(fn, wait) {
    let self, args, previous = 0

    return function() {
        let now = +new Date()

        self = this

        args = arguments

        if (now - previous > wait) {

            fn.apply(self, args)

            previous = now
        }
    }
}

//**********************第二版（使用定时器）************************
function throttle2(fn, wait) {
    let timeout,
        self,
        args

    return function() {

        self = this

        args = arguments

        if (!timeout) {

            timeout = setTimeout(() => {

                timeout = null

                fn.apply(self, args)

            }, wait)
        }
    }
}

//***************************第三版******************
//鼠标移入能立刻执行，停止触发的时候还能再执行一次
function throttle3(fn, wait) {

    let self, args, timeout

    let previous = 0

    let later = function() {

        previous = +new Date()

        timeout = null

        fn.apply(self, args)
    }

    let throttle = function() {

        let now = +new Date()

        //下次触发fn的剩余时间
        let remaining = wait - (now - previous)

        self = this

        args = arguments

        //若没有剩余时间或修改了系统时间
        if (remaining <= 0 || remaining > wait) {

            if (timeout) {

                clearTimeout(timeout)

                timeout = null
            }

            previous = now

            fn.apply(self, args)

        } else if (!timeout) {

            timeout = setTimeout(later, remaining)
        }
    }
    return throttle
}

//********************第四版**********************
//优化：有时希望无头有尾，或者有头无尾
//设置个 options 作为第三个参数,约定:
//                                  leading：false 表示禁用第一次执行
//                                  trailing: false 表示禁用停止触发的回调

function throttle4(fn, wait, options = {}) {
    let self, args, timeout, previous = 0

    let later = function() {

        previous = options.leading === false ? 0 : +new Date()

        timeout = null

        fn.apply(self, args)

        if (!timeout) self = args = null
    }

    let throttled = function() {

        let now = +new Date()

        if (!previous && options.leading === false) previous = now //禁用第一次执行

        let remaining = wait - (now - previous)

        self = this

        args = arguments

        //若修改了系统时间，可能会出现  remaining > wait 的情况
        if (remaining <= 0 || remaining > wait) {

            if (timeout) {

                clearTimeout(timeout)

                timeout = null
            }

            previous = now

            fn.apply(self, args)

            if (!timeout) self = args = null

        } else if (!timeout && options.trailing !== false) { // trailing = false就永远不会执行这里，否则为undefined

            timeout = setTimeout(later, remaining)

        }
    }

    throttled.cancel = function() {

        clearTimeout(timeout)

        timeout = null

        previous = 0
    }

    return throttled
}