const mainFun = require('./task1.js');
function callback1(){
    setTimeout(() => console.log('callBack1'), 2000);
}
function callback2(){
    let timerId = setInterval(() => console.log('callBack2'), 3000);

// зупинити через 5 секунд
    setTimeout(() => { clearInterval(timerId); }, 10000);
}
mainFun(callback1,callback2);