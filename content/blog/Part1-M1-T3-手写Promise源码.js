// 为了代码有提示  不容易出错
const PENDING = 'pending'
const FULFILLEN = 'fulfilled'
const REJECTED = 'rejected'

const resolvePromise = (x, resolve, reject) => {
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

class MyPromise {
    // 定一个执行器 new Promise 时 立即执行
    constructor (executor) {
        executor(this.resolve, this.reject)
    }
    // Promise 的内部状态 
    status = PENDING

    // then方法第一参数传来的成功的值
    value = undefined
    // then方法第二参数传来的失败的原因
    reason = undefined

    // 先存储 then传递的第一个方法  为了异步调用
    successCb = []
    // 先存储 then传递的第二个方法  为了异步调用
    failCb = []

    resolve =(val) => {
        // 内部状态只有是 padding 时才可以改
        if (this.status !== PENDING) return
        this.status = FULFILLEN
        this.value = val
        // 使用 while 加 .shift() 的弹出模式 很方便
        while (this.successCb.length) {
            this.successCb.shift()(this.value)
        }
        
    }
    reject = (val) => {
        // 内部状态只有是 padding 时 才可以改 
        if (this.status !== PENDING) return
        this.status = REJECTED
        this.reason = val
        while (this.failCb.length) {
            this.failCb.shift()(this.reason)
        }
    }
    then (successCb, failCb) {
        return new MyPromise((resolve, reject) => {
            switch (this.status) {
                case FULFILLEN:
                    var x = successCb(this.value)
                    resolvePromise(x, resolve, reject)
                    break
                case REJECTED: 
                    failCb(this.reason)
                    break
                default: 
                    this.successCb.push(successCb)
                    this.failCb.push(failCb)
            }
            
        })
    }

    static all (arr) {
        let res = []
        // index 这个思路 可以先占个位置 等最后执行完了  赋值操作都完成了 再返回 res
        let index = 0
        return new MyPromise((resolve, reject) => {
            arr.forEach((item, index) => {
                if (item instanceof MyPromise) {
                    item.then(val => {
                        res[index] = val
                        index ++ 
                        if (index === arr.length) {
                            resolve(res)
                            console.log(res,2)
                        }
                    }, (val) => {
                        reject(val)
                    })
                } else {
                    res[index] = item
                    index ++ 
                    if (index === arr.length) {
                        resolve(res)
                        console.log(res,1)
                    }
                }
            })
        }) 
    }

    static resolve (val) {
        if ( val instanceof MyPromise) {
            return val
        } else {
            return new MyPromise((resolve, reject) => {
                resolve(val)
                reject()
            })
        }

    }



}

// const ccc = new Promise((resolve, reject) => {
//     resolve()
//     reject()
// })
// console.log(ccc)
const bbb = new MyPromise((resolve, reject) => {
    // setTimeout(() => {
        resolve('成功时传入')
    // }, 1000)
    // setTimeout(() => {
        reject("失败了传入")
    // }, 2000)
})

function other () {
    return new MyPromise((resolve, reject) => {
        resolve('other传入的值')
    })
}

console.log(bbb)
bbb.then((val) => {
    console.log(val, "这里可以获取成功时传入的值")
    return bbb
}, (val) => {
    console.log(val)
}).then((val) => {
    console.log(val, '我是上个 return的值')
}, (val) => {
    console.log(val)
})

const p1 = new MyPromise((resolve, reject) => {
    resolve('p1成功的值')
    reject()
})
const p2 = new MyPromise((resolve, reject) => {
    resolve('p2成功的值')
    reject()
})
console.log(p1, 'p1')
MyPromise.all(['a', 'b', p1, p2, 'c']).then(res => {
    console.log(res, 'all')
})

MyPromise.resolve("resolve").then((val) => {
    console.log(val)
})
MyPromise.resolve(p1).then((val) => {
    console.log(val)
})