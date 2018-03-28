//数组扁平化

//**********************************递归*************************************
function flatten1(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flatten1(arr[i]))
        } else {
            res.push(arr[i])
        }
    }
    return res
}
let arr = [1, 2, 3, [1, 2, [1, 2, [6, 7], 3], 3]]
console.log(flatten1(arr));

//**********************************reduce*************************************
function flatten2(arr) {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten2(next) : next)
    }, [])
}
console.log(flatten2(arr))

//**********************************some + ...*************************************
function flatten3(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
console.log(flatten3(arr))