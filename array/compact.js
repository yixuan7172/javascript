//过滤掉数组中的假值元素
const compact = arr => arr.filter(Boolean)
console.log(compact([0, 1, 2, '1', null, undefined, false, NaN, [], {}]));