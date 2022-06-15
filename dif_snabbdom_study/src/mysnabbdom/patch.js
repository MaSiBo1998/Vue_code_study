import vnode from "./vnode";
import createElement from './createElement'
import patchVnode from './patchVnode'
export default function (oldVnode, newVnode) {
    // 首先判断第一个传递的参数失DOM节点,还是虚拟节点
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        // 当第一个节点是DOM节点,需要包装成虚拟节点
        // 获取DOM节点的标签,转化成sel
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    // 然后判断oldVnode和newVnode是不是同一个节点
    // 判断是否是同一个节点的依据是 sel 和key是否相等
    if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
        console.log('是同一个节点,需要进行精细化比较')
        patchVnode(oldVnode,newVnode)
    } else {
        console.log('不是同一个节点,进行暴力拆除')
        patchVnode(oldVnode,newVnode)
        let newVnodeElm = createElement(newVnode)
        if (oldVnode.elm && newVnode.elm) {
            // 插入到老节点之前
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        console.log(oldVnode)
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}