//settimeout 输出四中解决方案
//********** 1 ****************
//闭包
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(() => {
            console.log(j);
        }, 1000)
    }(i))
}

//*********** 2 ************************
//settimeout API 
for (var i = 0; i < 5; i++) {
    setTimeout((j) => {
        console.log(j);
    }, 1000, i)
}

//****************** 3 ***********************
//es6 let
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000)
}

//***************** 4 ***************
// for循环覆盖
const output = i => setTimeout(() => console.log(i), 1000)
for (var i = 0; i < 5; i++) {
    output(i) //传过去的i被复制了
}



//********************* Promise和async 两种方案***********************************
//promise 输出 012345
const tasks = []
const output = i => new Promise(resolve => setTimeout(() => {
    console.log(i)
    resolve()
}, 1000 * i))

for (var i = 0; i < 5; i++) tasks.push(output(i))
Promise.all(tasks).then(() => {
    setTimeout(() => {
        console.log(i);
    }, 1000);
})

//async 输出 012345
const sleep = time => new Promise(resolve => setTimeout(resolve, time));
(async() => {
    for (var i = 0; i < 5; i++) {
        if (i > 0) await sleep(1000)
        console.log(i);
    }
    console.log(i);
})()