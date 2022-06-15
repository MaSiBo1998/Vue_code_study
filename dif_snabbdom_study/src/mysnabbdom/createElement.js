// 创建真正的节点,将Vnode包装的虚拟节点创建为DOM节点
export default function createElement (vnode) {

    // 首先创建一个DOM节点,这个节点现在是孤儿节点
    let domNode = document.createElement(vnode.sel)
    // 然后判断是否有子节点还是只有文本
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        // 此时节点没有子节点,只有文本信息
        domNode.innerText = vnode.text

    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 当内部有子节点,即children里面不为空的时候,需要递归创建节点
        for (let ch of vnode.children) {

            // 将虚拟子节点通过调用createElement创建成DOM节点
            let chDOm = createElement(ch)
            domNode.appendChild(chDOm)
        }

    }
    // 补充elm属性
    vnode.elm = domNode
    // 返回一个elm,纯dom对象
    return vnode.elm
}