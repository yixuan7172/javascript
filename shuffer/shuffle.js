//数组乱序
function shuffle(arr) {
    let i = arr.length;
    while(i) {
        let j = ~~(Math.random() * i--);
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}
let arr=[1,2,3,4,5]
shuffle(arr)
console.log(arr)