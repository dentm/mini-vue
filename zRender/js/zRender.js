
const zrender = require('zrender');

window.zr = zrender.init(document.getElementById('main'));
var circle = new zrender.Circle({
    shape: {
        cx: 150,
        cy: 50,
        r: 40
    },
    style: {
        fill: 'blue',
        stroke: '#000',
    }
});
zr.add(circle);

// console.log(circle.shape.r); // 40
// circle.attr('shape', {
//     r: 50 // 只更新 r。cx、cy 将保持不变。
// });