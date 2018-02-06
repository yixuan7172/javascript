//计算数组中某个数重复出现次数

//callback四个参数：
// prev：第一项的值或者上一次叠加的结果值
// cur: 当前会参与叠加的项
// index: 当前索引
// arr： 数组本身

const countOccurrences = (arr, val) => arr.reduce((a, v) => v === val ? a + 1 : a, 0)
console.log(countOccurrences([0, 0, 0, 1, 2], 2));