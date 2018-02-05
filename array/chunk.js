//数组分块
const chunk = (arr, size) => Array.from({
    length: Math.ceil(arr.length / size)
}, (v, i) => arr.slice(i * size, i * size + size))
console.log(chunk([0, 1, 2, 3, 4, 5, 6], 1))