//数组去重
//一：双层循环
function unique1(arr) {
    var res = []
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < res.length; j++) {
            if (arr[i] === res[j]) break
        }
        if (j === res.length) res.push(arr[i])
    }
    return res
}

//二：indexOf
function unique2(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i]
        if (res.indexOf(current) === -1) res.push(current)
    }
    return res
}

//三：排序后去重【效率高于indexOf】
function unique3(arr) {
    let res = []
    let sortArr = arr.concat().sort() //concat复制一个新数组出来们不会影响原数组
    let scene
    for (let i = 0; i < sortArr.length; i++) {
        if (!i || scene !== sortArr[i]) { //!i表示第一次的 i=0
            res.push(sortArr[i])
        }
        scene = sortArr[i]
    }
    return res
}

//四：写一个工具函数，加一个参数isSorted表示是否已排序
function unique4(arr, isSorted) {
    let res = []
    let scene
    for (let i = 0; i < arr.length; i++) {
        if (isSorted) {
            if (!i || scene !== arr[i]) res.push(arr[i])
            scene = arr[i]
        } else {
            if (res.indexOf(arr[i]) === -1) res.push(arr[i])
        }
    }
    return res
}

//五：新需求：字母的大小写视为一致，比如'a'和'A'，保留一个就可以了！
//仿照 underscore 的思路写一个 unique 函数
function unique5(array, isSorted, iteratee) {
    var res = []
    var seen = []

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted) {
            if (!i || seen !== computed) {
                res.push(value)
            }
            seen = computed;
        } else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(value);
            }
        } else if (res.indexOf(value) === -1) {
            res.push(value);
        }
    }
    return res;
}

//filter
function unique6(arr) {
    let res = arr.filter((val, index, array) => {
        return array.indexOf(val) === index
    })
    return res
}

//ES6
const unique7 = arr => [...new Set(arr)]
console.log(unique([0, 0, 1, 1, 2, 2, 3]))