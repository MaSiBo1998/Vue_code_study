/* 
功能是可以在dataObj对象中,寻找用连续断点符号的keyName属性
dataObj={
    a:{
        b:{
            c:100
        }
    }
}
那么lookup(dataObj,a.b.c)结果就是100
 */

export default function lookup (dataObj,keyName){
    // 看看keyName里面有没有.符号,但keyname不能是.
    if(keyName.indexOf('.') != -1 && keyName !== '.'){
        // 有.符号,那么将keyName拆开
        var keys = keyName.split('.')
        // 设置中转变量一层层遍历下去
        var temp = dataObj
        for(let i =0;i<keys.length;i++){
            temp = temp(keys[i])
        }
        return temp;
    }
    // 如果没有.符号,那就是本身
    return dataObj[keyName]
}