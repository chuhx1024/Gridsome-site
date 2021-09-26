## 关于 Promise

- 基本使用
```js
const promise = new Promise((resolve, reject) => {
  resolve(100)
  reject(new Error('失败了'))
})
// 第二个参数 只等捕获本次的异常 如果在第一个参数总有异常就捕获不到了
promise.then(val => {
  console.log(val, 123)
}, val => {
  console.log(val, 888)
})
// 此方法 相当于给 整个链式链条捕获异常  如果在第一个参数总有异常就能捕获到
// 因为 Promise 的异常一直会向后传递 直至被捕获
// 所以第二种更常用
promise.then(val => {
  console.log(val)
}).catch(val => {
  console.log(val, 888)
})

promise.then(undefined, val => {
  console.log('失败了')
  console.log(val)
})
primise.catch(val => {
  console.log('失败了')
  console.log(val)
})
```
- 如何让 promise 异常 走 catch 方法
  - new Promise 时 添加 new Error
```js
const promise0 = new Promise((resolve, reject) => {
  resolve(new Error('失败了'))
})

const promise1 = new Promise((resolve, reject) => {
  reject(new Error('失败了'))
})
```
  - new Promise 时  在 resolve() 前 调用了没有定义的 方法
```js
const promise2 = new Promise((resolve, reject) => {
  foo()
  resolve(100)
  reject(new Error('失败了'))
})
```

  - 封装的 ajax 调用时请求错误

- 给全局注册一个事件  捕获没有被捕获的异常
```js
process.on('unhandleRejection', (reason, promise) => {
  console.log(reason)  // 失败原因 一般是一个对象
  console.log(promise) // 出现异常的 Promise 对象
})
```
- Promise 的静态方法
    - 可以快速创建一个 Promise 对象
```js
// 一下两个是等价的
const promise0 = Promise.resolve('foo')

const promise1 = new Promise((resolve, reject) => {
    resolve('foo')
})

// 把前边的 foo  换成一个 Promise 对象 则返回对象本身
var promise1 = ajax('/api/a.json')
var promise2 = Promise.resolve(prmise)
promise1 === promise2 // true

// 特殊的 如果是一个对象  且这个对象有一个 then 方法也可以链式调用  拿到传递的值
// 其实就是实现了 一个 thenable 的接口  就是说 是一个可以 then 的对象

Promise.resolve({
    then (onFulfilled, onRejected) {
        onFulfilled('foo')
    }
}).then((val) => {
    console.log(var) // 'foo'
})

```

- Promise 并行请求 .all .race

```js
let promise = Promisea.all([
    ajax('/api/a.json'),
    ajax('/api/b.json'),
    ajax('/api/c.json'),  // 顺序一定是  a 的结果, b 的结果 c 的结果  // 数组中可以是 异步API 或者 普通值
])
promise
.then()  // 所有都成功了 才执行
.catch()


const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
        return reject(new Error('timeout'), 500)
    })
})
let promise = Promisea.race([
    ajax('/api/a.json'),
    ajax('/api/b.json'),
    ajax('/api/c.json'),
    timeout,  // 加上这个函数  就实现了 超时报错
])
promise
.then()  // 只要有成功了 才执行
.catch()
```

- Promise 执行时序
     - 即便是Promise中 没有任何的 异步操作  他的回调也要去回调队列里排队 所有的同步代码执行完 才执行

    - 宏任务 和微任务

        - 宏任务: 开启后 回去 任务队列里排队
        ```
        script(整体代码)
        setTimeout
        setInterval
        I/O
        UI交互事件
        postMessage
        MessageChannel
        setImmediate(Node.js 环境)
        ```
        - 微任务: 一般伴随着宏任务  附加到最后执行
        ```js
        Promise.then
        Object.observe
        MutaionObserver
        process.nextTick(Node.js 环境)
        ```

    - 运行机制
        + 执行一个宏任务（栈中没有就从事件队列中获取）
        + 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
        + 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
        + 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
        + 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）
    - 经典案例
    ```js
    // 一般理解  where 会在 1 之前打印
    // 实际却在最后  因为  setTimeout 会开启宏任务  排在 script(整体代码)之后
    // Promise 开启的是微任务 会伴随着 script(整体代码) 执行完 就 顺带执行了
    // 微任务也会排队的  所以有  1 2 3
    console.log('start')
    setTimeout(() => {
        console.log('where')
    }, 0)
    Promise.resolve()
        .then(() => {
            console.log(1)
        })
        .then(() => {
            console.log(2)
        })
        .then(() => {
            console.log(3)
        })
    console.log('end')

    // start
    // end
    // 1
    // 2
    // 3
    // where
    ```

## Generator(生成器函数) 异步方案 (ES2015提供)(ES6是在2015年发布的,所以又称ECMAScript 2015)

------------- 2 12.Generator 函数
需要编写 一个执行器函数 比较的麻烦

## Async/await
    - 就是 Generator 的语法糖 
    - await 只能出现在 Async 函数内部 在外部的使用的功能正在开发中 估计以后就可以用了








