import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
/* 
处理数组,结合renderTemplate实现递归
注意:这里函数接收到参数是token,不是tokens
token 就是['#','students',[]]

这个函数调用renderTemplate 就是为了将['#','students',[]] 中[]的项转换成dom字符,所以[]中有data多少项数据,就调用多少次
data:
    {
        students: [
            { 'name': '小明', 'hobbies': ['游泳', '健身'] },
            { 'name': '小红', 'hobbies': ['足球', '蓝球', '羽毛球'] },
            { 'name': '小强', 'hobbies': ['吃饭', '睡觉'] },
        ]
    };
    也就是说[]中有三项,那么renderTemplate就要调用三次
*/



export default function parseArray(token, data) {
    // 得到需要用到的数据
    var v = lookup(data, token[1])
    // 返回的结果字符串
    var resultStr = ''
    // 循环遍历需要的数据v,有几条数据就遍历多少次
    for (let i=0;i<v.length;i++){
        resultStr += renderTemplate(token[2],{
            ...v[i],
            '.':v[i]
        })
    }
    return resultStr
}