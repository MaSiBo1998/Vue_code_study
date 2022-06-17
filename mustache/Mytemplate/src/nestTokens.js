// nestTokens函数将#/之间的tokens折叠起来,作为第当前数组的第三项

export default function nestTokens(tokens) {
    console.log(tokens,111)
    //return tokens
    // 结果返回数组
    var nestedTokens = []
    // 栈结构,存放小tokens,栈顶(靠近端口的是最新进入的),tokens数组中操作的也是这个tokens小数组
    var sections = []
    // 收集器,最开始指向nestedTokens结果数组,引用类型值,所以指向同一个数组
    // 收集器的指向会发生变化,当遇见#的时候,说明有需要折叠嵌套的数组,这个时候收集器就会指向这个token下标为2的新数组
    // 最开始指向返回的整体数组,然后遇见#指向,student,然后又遇见#指向hobbies,然后遇见/,就返回指向上一级
    var collector = nestedTokens
    // 循环tokens的每一项
    for (let i = 0; i < tokens.length; i++) {
        // token 是tokens中的每一项
        let token = tokens[i]
        switch (token[0]) {
            // 当发现#时,给此项token添加下标为2的新[]来存放嵌套数组(#/中间的内容)
            case '#':
                // #收集器放入这个token
                collector.push(token)
                // 入栈 #/中间的都要推入小toekns中
                console.log(token)

                sections.push(token)
                // 收集器改变引用地址,给token添加下标为2的项,并且让收集器指向它
                // 收集器指向变化   nestedTokens=> #student[2] => #hobbies[2]
                collector = token[2] = []
                console.log(token)
                break;
            case '/':
                // /时说明#/中间的内容已经遍历添加(都存到栈收集器中了)结束了
                // 出栈
                console.log(sections,1111)
                sections.pop()
                // 改变收集器为栈结构队尾(队尾是栈顶,也就是最后添加进去的),也就是说收集器指向上一级
                // 收集器指向变化  #hobbies => #student => nesteTokens
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
                break;
            default:
                // 不管当前的collector是谁,可能是结果nestedTokens,也可能是某个token的下标为2的数组,直接推入collctor中就可以
                collector.push(token);
                //console.log(token,123455)
        }
    }
    console.log(nestedTokens,999)

    return nestedTokens
}