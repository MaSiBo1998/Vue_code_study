// 此时引入的h是自己手写的简易版h函数
import h from './mysnabbdom/h'
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
} from "snabbdom";

const patch = init([
    // Init patch function with chosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule, // attaches event listeners
]);
const container = document.getElementById("container");
let myNode1 = h('ul', {}, [
    h('li', {}, 'lol'),
    h('li', {}, '云顶'),
    h('li', {}, h('div', {}, h('ul', {}, [
        h('li',{},'喜剧电影'),
        h('li',{},'动作电影'),
        h('li',{},'悬疑电影')
    ]))),
    h('li',{class:{jieshu:true}},'美食')
])

patch(container,myNode1)