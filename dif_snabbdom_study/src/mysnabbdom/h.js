import vnode from "./vnode";
// 手动实现snabbdom中生成虚拟dom的h函数,简配版\
// 简配版必须传递三个参数,缺一不可
// 因此函数的重载能力很弱,限定传递的参数只能是下列三种情况之一
// 1.h('div',{},'牛奶')
// 2.h('div',{},[])
// 3.h('div',{},h())

export default function(sel,data,c){
// 首先判断传入的是否是三个参数
if(arguments.length!== 3)throw new Error('对不起,简配版h函数必须传递三个参数')
// 然后检查传入的第三个参数的类型
// 第一种情况,c的类型时字符或者数字
if(typeof c =='string' || typeof c == 'number'){
    return vnode(sel,data,undefined,c,undefined)
}else if( Array.isArray(c)){
    // 第二种情况c是数组,
    let children = []
    for(let i = 0;i<c.length;i++){
        
        // c数组中的每一项必须是h函数,将数组中的h函数放入children中
        if(!(typeof c[i] == 'object'&& c[i].hasOwnProperty('sel'))){
            throw new Error('传入的数组项中有的不是h函数')
        }
        children.push(c[i])
    }
    return vnode(sel,data,children,undefined,undefined)
}else if(typeof c == 'object'&& c.hasOwnProperty('sel')){
// 第三种情况,传入的c是h()函数,也就是c是唯一的childre值
    let children = [c]
    return vnode(sel,data,children,undefined,undefined)
}else{
    // 如果不满足以上任意一中情况,说明传递的第三个参数c类型不对
    throw new Error('传入的第三个参数不对')
}

}