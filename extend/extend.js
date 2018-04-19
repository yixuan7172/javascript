//实例对象的__proto__指向构造函数的prototype，从而实现继承。
//prototype里有个属性constructor指向构造函数本身
// 每个对象都有一个__proto__属性，并且指向它的prototype原型对象
// 每个构造函数都有一个prototype原型对象
// prototype原型对象里的constructor指向构造函数本身