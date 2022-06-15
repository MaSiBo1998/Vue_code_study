import observe from "./observe"
// 对象在getter中收集依赖,在setter中触发依赖
// 数组在getter中收集依赖,在拦截器中触发依赖
import Dep from "./Dep"
// 给对象data的属性key定义监听
// data 传入的数据   key监听的属性   value闭包环境提供的周转变量
export default function defineReactive(data,key,value){

    // 每个数据都要维护一个自己的数组(dep中的subs),来存放依赖自己的watcher
    const dep = new Dep()
    observe(value)
console.log('1111111111111111111',dep)
    //console.log('defineProperty')
    if(arguments.length ==2){
        value = data[key]
        //console.log(key)
    }

    // 子元素要进行observe,形成递归
    let childOb = observe(value)

    Object.defineProperty(data,key,{
        // 是否可枚举
        enumerable:true,
        // 是否可配置
        configurable:true,
        // getter中收集依赖
        get(){
            console.log(`getter,你试图访问${key}属性`)
            dep.depend()
            // 收集依赖
            if(Dep.target){
                // 添加依赖
                dep.depend()
                // 判断有没有子元素,子元素也要添加依赖
                if(childOb){
                    childOb.dep.depend()
                }
            }
            return value
        },
        set(newVal){
            console.log(`setter试图修改${key}的属性`,newVal)
            if(value== newVal)return
            value = newVal
            // 当设置新值,新值也要被observe,(设置的新值可能也是object对象)
            childOb = observe(newVal)

            // 触发依赖
            // 发布订阅者模式,通知dep
            console.log('通知更新',dep)
            dep.notify()
        }
    })
}