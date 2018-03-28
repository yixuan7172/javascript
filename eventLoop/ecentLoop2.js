console.log('1');
console.log('2');

setTimeout(() => {
    console.log('3');
    setTimeout(() => {
        console.log('4');
    });
});
setTimeout(() => {
    console.log('5');
    setTimeout(() => {
        console.log('6 ');
    });
}); //输出：1  2  3  5  4  6

//执行栈先执行两个setTimeout把他的回调方法放到宏任务队列中。
//遇见Promise.then方法就把他的回调放到微任务队列中。
//然后执行栈执行完第一个setTimeout的回调之后会判断微任务的执行队列中有没有需要执行的回调函数，
//当然这时我们的微任务队列中有刚才Promise.then的回调方法等待执行，然后我们的执行栈就会先执行微任务中的方法。
//当微任务执行完毕后才会回到宏任务队列中继续执行。