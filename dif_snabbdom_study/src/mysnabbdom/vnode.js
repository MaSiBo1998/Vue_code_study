// vnode函数功能非常简单,就是将传出的参数组合成对象并返回,生成的是虚拟节点
export default function(sel,data,children,text,elm){
    return {
        sel,data,children,text,elm
    }
}