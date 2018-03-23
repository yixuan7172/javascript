//词法作用域

var scope = "global scope";

function checkscope() {
    var scope = "local scope";

    function f() {
        return scope;
    }
    return f()
}
console.log(checkscope()) //local scope

var scope = "global scope";

function checkscope() {
    var scope = "local scope";

    function f() {
        return scope;
    }
    return f;
}
console.log(checkscope()()) //local scope

//因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。
//《JavaScript权威指南》的回答：
//JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。
//嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。

//---------------------------------------------------------------------------------------------------------
var value = 1;
var f = function() {
    console.log(value)
}

function out1(f) {
    var value = 2;
    f();
}
out1(f) //1

function out2() {
    var value = 2

    function f() {
        console.log(value);
    }
    f()
}
out2()