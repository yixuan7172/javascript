//惰性函数，重写函数
function foo() {
    let t = new Date()
    foo = function() {
        return t
    }
    return foo()
}
console.log(foo());
console.log(foo); //function(){ return t }