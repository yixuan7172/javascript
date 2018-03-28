let Promise = require('./promise')
let p = new Promise(function(resolve, reject) {
    resolve('test')
})
p.then((data) => {
    console.log('success--' + data);
}, (err) => {
    console.log('fail--' + err);
})