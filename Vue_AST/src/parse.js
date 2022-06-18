import parseAttrsString from './parseAttrsString'
// parse函数,主函数
export default function (templateStr) {
    // 指针
    let index = 0
    // 剩余部分
    let rest = ''
    // 准备两个栈
    // 存放标签
    let stack1 = []
    // 存放具体内容
    let stack2 = [{ 'children': [] }]
    // 判断开始标记的正则
    let startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
    // 判断开始和结束标签中间的内容正则
    let wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
    // 结束标记的正则
    let endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
    while (index < templateStr.length - 1) {
        rest = templateStr.substring(index)
        // 首先开始遍历是不是开始标签  <div>
        if (startRegExp.test(rest)) {
            // 标签的名称  h3
            let tag = rest.match(startRegExp)[1]
            // 标签里面的其他属性 class="aa bb cc" data-n="7" id="mybox"
            let tagAttrstring = rest.match(startRegExp)[2]
            // tagAttrstring的长度
            const tagAttrstringLength = tagAttrstring != null ? tagAttrstring.length : 0
            // 将标签推入stack1
            stack1.push(tag)
            // 将空数组推入stack2
            stack2.push({ 'tag': tag, 'children': [], 'attrs': parseAttrsString(tagAttrstring) })
            // 开始移动指针 移动的位数应该是 tag标签的长度,加上<>两个字符的长度,如果有其他属性,也应该加上tagAttrstring的长度
            index += tag.length + 2 + tagAttrstringLength
        } else if (wordRegExp.test(rest)) {
            // 开始标签和结束标签中间的内容部分
            let word = rest.match(wordRegExp)[1]
            // 然后将中间的内容,推送到stack2中的空数组中
            // 判断是否为空
            if (!/^\s+$/.test(word)) {
                stack2[stack2.length - 1].children.push({ 'text': word, 'type': 3 })
            }
            // 指针移动位置,移动的长度是word的长度
            index += word.length

        } else if (endRegExp.test(rest)) {
            // 遍历识别是不是结束标签  </h3>
            let tag = rest.match(endRegExp)[1]
            // stack1出栈,也就是存放标签的栈出栈
            let pop_tag = stack1.pop()
            if (tag == pop_tag) {
                // stack2 也要出栈
                let poparr = stack2.pop()
                if (stack2.length > 0) {
                    stack2[stack2.length - 1].children.push(poparr)
                } else {
                    console.log('没有封闭标签')
                }
            }
            // 指针移动标签的长度加3，为什么要加2呢？因为</>也占3位
            index += tag.length + 3;
        }else{
            index++
        }       
    }
    console.log(stack2)
    return stack2[0].children[0]
}