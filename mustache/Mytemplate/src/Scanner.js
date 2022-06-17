// 扫描器

export default class Scanner {
    constructor(templateStr){
        this.templateStr = templateStr
        // 指针
        this.pos = 0;
        // 当前指针到最后的字符串,一开始是模板字符串原文(因为指针还未移动)
        this.tail = templateStr
    }
    // 扫描走过的指定内容,{{或}},也就是遇见{{或}}时跳过,没有返回值
    scan(tag){
        if(this.tail.indexOf(tag) == 0){
        // tag有多长,比如{{或}}长度是2,那就向后移动2位,跳过{{或}}
        this.pos += tag.length
        // 尾字符串也要从新的指针位置开始
        this.tail = this.templateStr.substr(this.pos)
        }

    }
    // 让指针进行扫描,直到遇见指定的{{或}}结束,返回之前扫描过的内容
    scanUtil(stopTag){
        // 记录每次开始扫描的指针位置
        const post_backup = this.pos;
        // 当尾字符串的开头不是stopTag时,说明还没有扫描到stopTag &&寻找到最后也找不到
        //console.log(this.eos())
        while(!this.eos() &&this.tail.indexOf(stopTag) !=0){
            this.pos++;
            // 尾字符串重新为从指针到字符串最后
            this.tail = this.templateStr.substr(this.pos)
        }
        //console.log(post_backup,this.pos)
        return this.templateStr.substring(post_backup,this.pos)
    }
    // 判断指针是否扫描到模板字符串的尽头
    eos(){
        return this.pos >= this.templateStr.length
    }
}