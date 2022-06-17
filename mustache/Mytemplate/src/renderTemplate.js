import parseArray from './parseArray'
import lookup from './lookup'
// 功能是将tokens数组转换成dom字符串
export default function renderTemplate(tokens, data) {
    // 返回的结果字符串
    var resultStr = ''
    // 遍历tokens
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        // ['text',''] 直接拼到结果字符串中
        if (token[0] == 'text') {
            resultStr += token[1]

        } else if (token[0] == 'name') {
            // 如果是['name','a.b.c'],要使用lookup进行处理
            // 防止这里a.b.c这种形式获取不到
            resultStr += lookup(data,token[1])
        }else if(token[0] == '#'){
            resultStr += parseArray(token,data)
        }
    }
    return resultStr
}