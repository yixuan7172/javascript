//浏览器中任务的执行方式大约是这样。执行栈先按执行队列的顺序执行，然后如果有微任务就执行微任务。
//如果没有微任务就执行宏任务。当宏任务执行队列中的一个方法执行完毕之后，执行栈会判断微任务队列中有没有需要执行的微任务，
//如果有则执行微任务。如果没有就执行当前执行栈中的任务。

//微任务：Promise.then、（MutationObserve、MessageChannel）

//宏任务：setTimeout setInterval (setImmediate)

console.log('1');
setTimeout(() => {
    console.log('2');
    Promise.resolve(1).then(() => {
        console.log('promise');
    })
});
setTimeout(() => {
    console.log('3');
}); //输出：1  2  3  promise