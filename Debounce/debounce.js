//防抖
//防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，
//如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，
// n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行。

//****************第一版**************************
function debounce1(fn, time) {
    let timeout

    return function() {

        clearTimeout(timeout)

        timeout = setTimeout(fn, time);
    }
}

//*******************第二版（解决this问题）*****************
function debounce2(fn, time) {
    let timeout

    return function() {

        const self = this

        clearTimeout(timeout)

        timeout = setTimeout(fn.bind(self), time);
    }
}

//****************第三版（解决this和event问题）******************************
function debounce3(fn, time) {
    let timeout

    return function() {

        const self = this,
            args = arguments

        clearTimeout(timeout)

        timeout = setTimeout(() => {

            fn.apply(self, args)

        }, time);
    }
}

//***************第四版*******************
//立刻执行函数，等停止触发n秒后再重新出发执行
function debounce4(fn, time, immediate) {
    let timeout

    return function() {

        const self = this,
            args = arguments

        timeout && clearTimeout(timeout)

        if (immediate) {
            //若已经执行过，不再执行
            let callnow = !timeout

            timeout = setTimeout(() => {

                timeout = null

            }, time)

            callnow && fn.apply(self, args)

        } else {
            timeout = setTimeout(() => {

                fn.apply(self, args)

            }, time);
        }
    }
}

//*******************第五版***************
//考虑函数fn会有返回值
function debounce5(fn, time, immediate) {
    let timeout, result

    return function() {

        const self = this,
            args = arguments

        timeout && clearTimeout(timeout)

        if (immediate) {

            let callnow = !timeout

            timeout = setTimeout(() => {

                timeout = null

            }, time)

            if (callnow) result = fn.apply(self, args)

        } else {
            timeout = setTimeout(() => {

                result = fn.apply(self, args)

            }, time)
        }
        return result
    }
}

//**********************第六版*************
//加一个清除
function debounce6(fn, time, immediate) {
    let timeout, result

    let debounced = function() {

        const self = this,
            args = arguments

        timeout && clearTimeout(timeout)

        if (immediate) {

            let callnow = !timeout

            timeout = setTimeout(() => {

                timeout = null

            }, time)

            if (callnow) result = fn.apply(self, args)

        } else {

            timeout = setTimeout(() => {

                result = fn.apply(self, args)

            }, time);

        }
        return result
    }

    debounced.cancel = function() {

        clearTimeout(timeout)

        timeout = null
    }
    return debounced
}