//数组去重
const distinctValuesOfArray = arr => [...new Set(arr)]
console.log(distinctValuesOfArray([0, 0, 1, 1, 2, 2, 3]));