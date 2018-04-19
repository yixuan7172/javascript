//将字符串转换为单词数组
const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);
console.log(words('i love three.js')); //[ 'i', 'love', 'three', 'js' ]