import patch from './mysnabbdom/patch'
import h from './mysnabbdom/h'

const container = document.getElementById('container')
const btn = document.getElementById('btn')
// 第一种命中,新前与旧前命中
// const myNode = h('ul', {}, [
//     h('li',{key:'A'},'123'),
//     h('li',{key:'B'},'B'),
//     h('li',{key:'C'},'C'),
//     h('li',{key:'D'},'C'),
// ])
// // patch传递两个参数,第一个是old节点,第二个是新的虚拟节点
// patch(container, myNode)
// const myVnode2 =
// h('ul', {}, [
//     h('li',{key:'A'},'A'),
//     h('li',{key:'B'},'B'),
//     h('li',{key:'C'},'C'),
//     h('li',{key:'D'},'C'),
// ])
// 第二种命中,新后与旧后命中
// const myNode = h('ul', {}, [
//     h('li',{key:'A'},'A'),
//     h('li',{key:'B'},'B'),
//     h('li',{key:'C'},'C'),

// ])
// // patch传递两个参数,第一个是old节点,第二个是新的虚拟节点
// patch(container, myNode)
// const myVnode2 =
// h('ul', {}, [
//     h('li',{key:'D'},'D'),
//     h('li',{key:'A'},'A'),
//     h('li',{key:'B'},'B'),
//     h('li',{key:'C'},'C'),

// ])
// 第三种命中,新后与旧前命中
// const myNode = h('ul', {}, [
//     h('li', { key: 'A' }, 'A'),
//     h('li', { key: 'B' }, 'B'),
//     h('li', { key: 'C' }, 'C'),

// ])
// // patch传递两个参数,第一个是old节点,第二个是新的虚拟节点
// patch(container, myNode)
// const myVnode2 =
//     h('ul', {}, [
//         h('li', { key: 'C' }, 'C'),
//         h('li', { key: 'B' }, 'B'),
//         h('li', { key: 'A' }, 'A'),
//     ])
// 第四种命中,新前与旧后命中
// const myNode = h('ul', {}, [
    
//     h('li', { key: 'A' }, 'A'),
//     h('li', { key: 'B' }, 'B'),
//     h('li', { key: 'C' }, 'C'),
//     h('li', { key: 'D' }, 'D'),

// ])
// // patch传递两个参数,第一个是old节点,第二个是新的虚拟节点
// patch(container, myNode)
// const myVnode2 =
//     h('ul', {}, [
//         h('li', { key: 'D' }, 'D'),
//         h('li', { key: 'C' }, 'C'),
//         h('li', { key: 'A' }, 'A'),
//         h('li', { key: 'B' }, 'B'),
        
//     ])

// 四种都未命中
const myNode = h('ul', {}, [
    
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'C' }, 'C'),

])
// patch传递两个参数,第一个是old节点,第二个是新的虚拟节点
patch(container, myNode)
const myVnode2 =
    h('ul', {}, [
        h('li', { key: 'D' }, 'D'),
        h('li', { key: 'C' }, 'C'),
        h('li', { key: 'E' }, 'E'),
        h('li', { key: 'F' }, 'F'),
        h('li', { key: 'A' }, 'A'),
        h('li', { key: 'B' }, 'B'),
        
    ])





    btn.onclick = function () {
    console.log('点击按钮')
    patch(myNode, myVnode2)
}
