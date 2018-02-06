//求两个数组中的不同
const difference = (arr1, arr2) => {
    const res = new Set(arr2)
    return arr1.filter(x => !res.has(x))
}
console.log(difference([0, 1, 2, '3', '4', '5'], ['0', 1, 2, 3, '4', '4']));