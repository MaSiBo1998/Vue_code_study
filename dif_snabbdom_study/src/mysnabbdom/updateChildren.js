import createElement from "./createElement";
import patchVnode from "./patchVnode";
// 判断两个节点是否同意节点  通过sel和key,只有当sel,key完全相同是才被看做是同一节点
function checkSameVnode(a, b) {
    return a.sel == b.sel && a.data.key == b.data.key
}
// parentElm dom节点,oldCh oldVnode的子节点数组,newCh newVnode的子节点数组
export default function updateChildren(parentElm, oldCh, newCh) {
    // 四个指针(新前后旧前指针只能向下即++,新后和旧后指针只能向上即--)
    // 新前
    let newStartIdx = 0
    // 旧前
    let oldStartIdx = 0
    // 新后
    let newEndIdx = newCh.length - 1
    // 旧后
    let oldEndIdx = oldCh.length - 1
    //四个指针指向的四个节点
    // 新前节点
    let newStartVnode = newCh[0]
    // 旧前节点
    let oldStartVnode = oldCh[0]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 四种方式都没命中,将老节点的key存进map对象中
    let keyMap = null
    // 当新前小于等于新后,旧前小于等于旧后时,说明没有遍历完
    while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
        // 新前与旧前进行比较
        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 此时①命中,即新前指针和旧前指针两个节点一样
            console.log('①命中,新前与旧前命中')
            // 精细化比较两个节点
            patchVnode(oldStartVnode, newStartVnode)
            // 然后移动指针,改变指针指向的节点,表示这两个节点已经处理过了
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // 新后与旧后进行比较
            console.log('②命中,新后与旧后命中')
            // 精细化比较两个节点
            patchVnode(oldEndVnode, newEndVnode)
            // 移动指针,改变指针指向的节点,表示已经处理过
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 新后与旧前进行比较
            console.log('③命中,新后与旧前命中')
            patchVnode(oldStartVnode, newEndVnode)
            // 新后与旧前命中时,此时要移动节点,移动新后(旧前)只想的节点到旧后的后面
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--oldEndIdx]
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 新前与旧后进行比较
            console.log('④命中,新前与旧后命中')
            patchVnode(oldEndVnode, newStartVnode)
            // 当新前与旧后命中时,此时要移动节点,将节点移动到旧前的前面
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 以上四种命中方式都没有命中
            console.log('四种方式都没有命中')
            // 通过映射对象,避免每次都遍历old对象
            if (!keyMap) {
                keyMap = {}
                // 记录oldVnode中出现的key
                // 从oldStartIdx开始到oldEndIdx结束
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key
                    if (key !== undefined) {
                        keyMap[key] = i
                        console.log(keyMap)
                    }
                    
                }
                
            }
            
            // 寻找当前项(newStartIdx)在keyMap中映射的位置
            const idxInOld = keyMap[newStartVnode.key]
            if (idxInOld === undefined) {
                // 如果 idxInOld 是 undefined 说明是全新的项，要插入
                // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
            } else {
                // 说明不是全新的项，要移动
                const elmToMove = oldCh[idxInOld];
                patchVnode(elmToMove, newStartVnode);
                // 把这项设置为undefined，表示我已经处理完这项了
                oldCh[idxInOld] = undefined;
                // 移动，调用insertBefore也可以实现移动。
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
            }
            // newStartIdx++;
            newStartVnode = newCh[++newStartIdx];
        }
    }

      // 循环结束
  if (newStartIdx <= newEndIdx) {
    // 说明newVndoe还有剩余节点没有处理，所以要添加这些节点
    // // 插入的标杆
    // const before =
    //   newCh[newEndIdx + 1] === null ? null : newCh[newEndIdx + 1].elm;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 说明oldVnode还有剩余节点没有处理，所以要删除这些节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }

}