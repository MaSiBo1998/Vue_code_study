import createElement from "./createElement";
import updateChildren from './updateChildren'
// 精细化比较两个节点
export default function (oldVnode,newVnode){
    // 1.判断新旧节点是否是同一个对象,是同一个节点就返回
    if(oldVnode == newVnode) return ;
    // 2.判断newVnode有没有text属性
    if(newVnode.text !== undefined && (newVnode.children == undefined || newVnode.children.length ==0)){
        // newVnode有text属性
        // 2.1判断newVnode与oldVnode的text属性是否相同
        if(newVnode.text !== oldVnode.text){
            // newVnode和oldVnode的text属性不相同,直接将newVnode中的新text写入老elm中,及时oldVnode中是children,也直接覆盖替换
            oldVnode.elm.innerText = newVnode.text
        }
    }else{
        // newVnode 没有text属性,有children属性
        // 2.2判断oldVnode有无children属性
        if(oldVnode.children !== undefined && oldVnode.children.length>  0){
            // 最复杂的情况,diff算法的精髓之处
            // 新老节点都有childre
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
        }else{
            // oldVnode没有children,说明有text,newVnode有children
            // 所以将oldVnode清空,然后遍历newVnode的children属性,创建子节点,并上树
            oldVnode.elm.innerHTML = ''
            // 遍历newVnode的children
            for(let ch of newVnode.children){
                let chDom = createElement(ch)
                oldVnode.elm.appendChild(chDom)
            }
        }
    }
}