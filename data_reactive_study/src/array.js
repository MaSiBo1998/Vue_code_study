import { def } from "./utils";
// 数组中 在getter中收集依赖,在拦截器中触发依赖


const arrayPrototype = Array.prototype;

// 以array.prototype为原型创建爱arrayMethods(被vue封装之后的array方法) 并暴露出去
export const arrayMethods = Object.create(arrayPrototype)

// vue对数组的七个数组方法进行了封装
const methodsNeedChange = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
]

// 批量对这些方法进行操作
methodsNeedChange.forEach((methodName)=>{
    // 备份与原来的数组方法
    const original = arrayPrototype[methodName]

    // 定义新方法
    def(arrayMethods,methodName,function(){
        console.log('array数组方法已经被劫持')
        // 恢复原来的数组方法
        const result = original.apply(this,arguments)
        // 把类数组对象变成数组
        const args = [...arguments]
        // 把数组身上的__ob__取出来
        // 在拦截器中获取observer的实例
        console.log('__ob__',this.__ob__)
        const ob = this.__ob__
        // 有三种特殊的方法,push,unshift,splice能向数组中插入新的项,所以要对这些插入的新项进行劫持(侦测)
        // 插入的项
        let inserted = []
        switch(methodName){
            case "push":
            case "unshift":
                inserted = args;
                break;
            case "splice":
                inserted = args.slice(2)
        }
        // 查看是否有新的插入项inserted ,有就进行劫持
        if(inserted){
            ob.observeArray(inserted)
        }


        // 发布订阅模式,通知dep
        // 向依赖发布消息
        console.log(ob,'123')
         ob.dep.notify()

        return result
    },
    false
    )
})