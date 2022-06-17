// 将模板字符串转换成tokens
import parseTemplateToTokens from './parseTmeplateToTokens'
import renderTemplate from './renderTemplate'

// 全局提供My_Template对象
window.My_Template = {
    // 渲染方法
    render(templateStr, data) {
        // 调用parseTemplateToTokens方法将模板字符串转换成tokens数组
        var tokens = parseTemplateToTokens(templateStr)
        var doms = renderTemplate(tokens, data)
        
        console.log(doms)
return doms
        // 单元测试
        // // 实例化一个扫描器,构造时提供一个参数,参数是模板字符串 
        // // 扫描器扫描的对象是模板字符串
        // var scanner = new Scanner(templateStr)
        // var word
        // // pos没有到头就一直扫描
        // while(!scanner.eos()){
        //     // 遇见{{指针停止,word是指针扫描走过的内容
        //     word = scanner.scanUtil('{{')
        //     console.log(word,'☆')
        //     // 遇见{{,scan跳过{{,指针跳过{{
        //         scanner.scan('{{')
        //     // 指针开始从{{之后开始扫描到}}停止,word是{{}}里面的内容
        //     word = scanner.scanUtil('}}')
        //     console.log(word,'△')
        //     // scan使指针跳过}}继续向后扫描
        //     scanner.scan('}}')
        // }
    }
}