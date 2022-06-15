import Observer from "./Observer";

export default function (value) {
    // 判断value是否是对象,不是就不考虑
    if (typeof value !== 'object') {
        //console.log('observe传入的不是对象',value)
        return
    }
    let ob;
    if (typeof value.__ob__ !== 'undefined') {
        ob = value.__ob__;
    } else {
        ob = new Observer(value)
    }
    //console.log('observe返回',ob)
    return ob
    
}