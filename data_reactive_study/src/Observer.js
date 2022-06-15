import {def} from './utils'
import defineReactive from './defineReactive'
import observe from './observe'
import { arrayMethods } from './array'
import Dep from './Dep.js';
// 将一个正常的object转换为每个层级的属性都是响应式(可以被侦测)的object
// Observer类会附加到每一个被侦测的object上,一旦被附加,Observer会将object所有属性都转换成getter/setter监测的形式
// __ob__的作用可以用来标记当前value是否已经被Observer转换成了响应式数据,而且可以通过value.__ob__来访问Observer的实例
export default class Observer {
    constructor(value){
        console.log('observer构造器',value)
              // 每一个Observer的实例身上，都有一个dep
              this.dep = new Dep();
        // 给实例添加__ob__属性,值时这次的new的实例(this,一定要注意,构造函数中的this不是表示类本身,而是表示实例)
        // __ob__的作用可以用来标记当前value是否已经被observer转换成了响应式数据,而且可以通过value.__ob__来访问observer的实例
        def(value,'__ob__',this,false)
        // 将一个正常的object转换成每个层级的属性都是响应式的object

        // 判读是数组还是对象
        if(Array.isArray(value)){
            // 是数组,就将这个数组的原型指向array.js里面暴露出来的arrayMethods
            Object.setPrototypeOf(value,arrayMethods)
            // 早期是通过下面实现的
            // value.__proto__ = arrayMethods
            // 然后监测数组
            this.observeArray(value)
        }else{
            // 不是数组就遍历每一个key
            this.walk(value)
        }

    }
    // 对象的遍历方式,遍历value的每一个key
    walk(value){
        for(let key in value){
            console.log('walk遍历',key,value)
            defineReactive(value,key)
        }
    }
    // 数组的遍历方式
    observeArray(arr){
        for(let i= 0, l =arr.length; i < l; i++){
            // 逐项尽心observe
            observe(arr[i])
        }
    }
}