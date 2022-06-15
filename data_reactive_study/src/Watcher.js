// watcher是一个中介,当数据依赖发生变化时,通知它,它再派发通知下去

import Dep from "./Dep";

let uid = 0;
export default class Watcher{
    constructor(target,expression,callback){
        console.log('watcher中介')
        this.id = uid++
        this.target = target
        // 按点拆分,执行this.getter()就可以读取到data.a.b.c的内容
        this.getter = parsePath(expression)
        this.callback = callback
        this.value = this.getter()
    }
    get(){
        // 进入收集依赖阶段
        // 让全局所有的Dep.target设置为watcher本身
        Dep.target = this;
        console.log(Dep.target,'000000000000')
        const obj = this.target
        var value
        // 只要能找就一直找
        try{
            value = this.getter(obj)
        }finally{
            Dep.target = null
        }
        return value
    }
    // 更新
    update(){
        this.run()
    }
    run(){
        const value = this.get();
        if(value !==this.value || typeof value === "object"){
            const oldValue = this.value
            this.value = value
            callback.call(this.target,value,oldValue)
        }
    }
    
}

/**
 * 将str用.分割成数组segments，然后循环数组，一层一层去读取数据，最后拿到的obj就是str中想要读的数据
 * @param {*} str
 * @returns
 */
 function parsePath(str) {
    let segments = str.split(".");
    return function (obj) {
      for (let key of segments) {
        if (!obj) return;
        obj = obj[key];
      }
      return obj;
    };
  }
  