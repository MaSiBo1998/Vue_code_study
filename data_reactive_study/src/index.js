
import observe from './observe'
import Watcher from './Watcher';
var obj = {
    a:{
        m:{
            n:100
        }
    },
    b:[11,33,44,55]
}
observe(obj);
obj.b.push(234)
