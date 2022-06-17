// 引入scanner扫描器
import Scanner from "./Scanner";
// 引入嵌套tokens方法
import nestTokens from './nestTokens'
export default function parseTemplateToTokens(templateStr) {
    // 存储tokens数组
    var tokens = []
    // 实例化扫描器
    var scanner = new Scanner(templateStr)
    var words
    // 让扫描器开始工作
    while (!scanner.eos()) {
        // 收集{{(开始标记)出现之前的文字
        words = scanner.scanUtil('{{')
        if (words != '') {
            // 尝试写一下去掉空格，智能判断是普通文字的空格，还是标签中的空格
            // 标签中的空格不能去掉，比如<div class="box">不能去掉class前面的空格
            let isInJJH = false;
            // 空白字符串
            var _words = '';
            for (let i = 0; i < words.length; i++) {
                // 判断是否在标签里
                if (words[i] == '<') {
                    isInJJH = true;
                } else if (words[i] == '>') {
                    isInJJH = false;
                }
                // 如果这项不是空格，拼接上
                if (!/\s/.test(words[i])) {
                    _words += words[i];
                } else {
                    // 如果这项是空格，只有当它在标签内的时候，才拼接上
                    if (isInJJH) {
                        _words += ' ';
                    }
                }
            }
            tokens.push(['text', _words])
        }
        // 跳过{{
        scanner.scan('{{')
        // 收集{{}}中间的信息
        words = scanner.scanUtil('}}')
        if (words != '') {
            if (words[0] == '#') {
                tokens.push(['#', words.substring(1)])

            } else if (words[0] == '/') {
                tokens.push(['/', words.substring(1)])

            } else {
                tokens.push(['name', words])
            }
        }
        // 跳过}}
        scanner.scan('}}')

    }
    // 返回收集的tokens

    return nestTokens(tokens)
}