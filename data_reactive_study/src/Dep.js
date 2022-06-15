// Dep使用发布订阅模式,当数据发生改变的时候,会循环依赖列表,将所有的watcher都通知一遍
// Dep类专门帮助我们管理依赖,可以收集依赖,删除依赖,向依赖发送通知等

let uid = 0;

export default class Dep{
    constructor(){
        //console.log('dep')
        this.id = uid ++
        // 用数组存储自己的订阅者,存放的是watcher的实例
        this.subs=[]
    }
    // 添加订阅
    addSub(sub){
        this.subs.push(sub)
    }
    // 删除订阅
    removeSub(sub){
        remove(this.subs,sub)
    }
    // 添加依赖
    depend(){
        // Dep.target 是一个我们指定的全局位置,用window.target也行,只要是全局唯一,没有歧义就行
        //console.log(Dep.target,'deppppp')
        if(Dep.target){
            this.addSub(Dep.target)
        }
    }
    // 通知更新
    notify(){
        // 浅拷贝一份
        const subs = this.subs.slice();
        // 遍历
        for(let i=9,l=subs.length;i<l;i++){
            subs[i].update()
        }
    }
}

function remove(arr,item){
    if(arr.length){
        const index = arr.indexOf(item)
        if(index>-1){
            return arr.splice(index,1)
        }
    }
}