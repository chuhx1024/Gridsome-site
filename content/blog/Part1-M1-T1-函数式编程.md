// 需要回顾补充笔记的 
- 08. 常用的高阶函数
- 13. 纯函数的好处
- 17. 柯里化案例
## 为什么要函数式编程
- React 就是
- vue 3 使用
- 可以抛弃 this
- 打包过程可以更好的利用 tree shaking 过滤无用的代码
- 方便测试 方便并行处理
- 有很多库可以帮助我们进行函数式编程 : lodash underscore ramda

## 概念
- Functional Programming , FP 是编程范式(面向过程, 面向对象)之一
- 用来描述数据之间的映射
```js
// 非函数式编程(面向过程)
let num1 = 1
let num2 = 2
let sum = num1 + num2 
console.log(sum)

// 函数式编程
function add (n1, n2) {
    return n1 + n2
}
let sum = add (1, 2)
console.log(sum)
```
- 函数式一等公民
    - 函数可以存储在变量中(数组中也可以)
    - 函数可以作为参数(就是高阶函数) Higher-order-function
    - 函数可以作为返回值(也是高阶函数)

### 高阶函数
- 函数作为参数
```js
// 模拟forEach 
function (arr, fn) {
    for (let i = 0; i < arr.length; i++>) {
        fn(arr[i])
    }
}
// 模拟 filter
function (arr, fn) {
    let results = []
    for (let i = 0; i< arr.lentht; i++) {
        if (fn(arr[i])) {
            res.push(arr[i])
        }
    }
    return results
}
```
- 函数作为返回值
```js
// 高阶函数作为返回值

// 基本语法
function makeFn () {
    let msg = "hello world"
    return function () {
        console.log(msg)
    }
}

// 调用
makeFn()()   // hello world

// 实现 once 函数 就是轮播图里的 锁 lodash中的 once 函数 
// 使用场景 支付 

function once (fn) {
    let done = false
    return function () {
        if (!done) {
            done = true
            fn(...arguments)
        }
    }
}

let pay = once(function(money){
    console.log(money)
})
pay(4)   // 4 // 只会执行一次
pay(4)   // 核心代码不执行
```
- 常用的高阶函数 
    - forEach map filter every some find/findIndex reduce sort ....
- 高阶函数的意义
    - 让代码更灵活
    - 实际是对通用性的一些抽象 让我们只关注自己逻辑
    - 使代码更简洁
- 常用的高阶函数
----------------------------------------------------------------------------------------08

### 闭包
- 概念 在一个函数1中定义一个变量2和函数3 在3总引用了2  就形成了闭包
```
function makeFn () {
    let msg = "hello world"
    return function () {
        console.log(msg)
    }
}
```

```js
// 简单的应用场景
var elements = [{}, {}, {}]
for (var i = 0; i< elements.length; i ++) {
    elements[i].onclick = function() {
        console.log(i)
    }
}
elements[0].onclick() // 3
elements[1].onclick() // 3
elements[2].onclick() // 3

for (var i =0; i < elements.length; i++) {
    // 此处形成闭包 每次循环都存储了i的值
    elements[i].onclick = (function (i) {
        return function () {
            console.log(i)
        }
    })(i)
}
elements[0].onclick() // 0
elements[1].onclick() // 1
elements[2].onclick() // 2
```
- 意义
    - 延长了 函数的作用范围(使用的本函数外部的变量)
    - 做的了缓存  比如上边的 once 函数 就缓存了 done 这个变量
- 本质
    - 函数在执行的时候 会放在一个执行栈上 当函数执行完毕就会从执行栈上移除
    - 但是 堆上的作用域成员(done 这个变量) 因为被外部引用不能被释放, 因此 内部函数依然可以访问外部函数的成员(done)

### 纯函数

- 概念: 相同的输入永远会得到相同的输出
- 举例
    - lodash 是一个纯函数的功能库
    - 数组的 slice(纯函数) splice(非纯函数 因为他改变了原数组 导出 多次相同的输入得到不同输出)
- 好处

----------------------------------------------------------------------------------------13

- 副作用
    - 当一个纯函数 依赖外部变量(配置文件, 数据库, 获取用户的输入)时 就会变得不纯
    - 所有的外部交互都可能带来副作用 副作用是方法的通用性下降 带来安全隐患
    - 不能完全禁止 尽量控制他们在可控范围内发生

# 函数柯里化 (curry)
- 当一个函数有多个参数的时候先传递一部分参数调用它(传进去的参数以后永远不变)
- 然后返回一个新的函数接收剩余参数 返回结果
> 简单理解 一个函数有两个参数  一个参数总是固定的 另一个不固定  此时可以 封一个新函数 return 出 只有一个变量的函数  就是函数柯里化
```js
// 简单的柯里化
// 场景
function checkAge(min, age) {
    return age >= min
}
console.log(checkAge(18, 22)) // true
console.log(checkAge(18, 30)) // true
console.log(checkAge(18, 16)) // false
// 函数柯里化改造
function checkAgeCurry (min) {
    return function (age) {
        return age >= age
    }
}
let checkAge18 = checkAgeCurry(18)
console.log(checkAge18(20)) // true

```
> lodash 中的 curry 使用
```js
const _ = require('lodash')
function getSum (a, b, c) {
    return a + b + c
} 
const curried = _.curry(getSum)
console.log(curried(1,2,3)) // 6 此时其实没有意义
console.log(curried(1,2)(3))
console.log(curried(1)(2,3))
```
> 柯里化案例
```js
-----------------------------------------------------------------17
```

> 模拟 lodash 中的 curry 方法
```js
function curry (fn) {
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function () {
                return curriedFn(...[...args, ...Array.from(arguments)])
                // return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return fn(...args)
    }
}

function getSum (a, b, c) {
    // console.log(getSum.length, 10)
    return a + b + c
} 
const curried = curry(getSum)
console.log(curried(1,2,3)) // 6 此时其实没有意义
console.log(curried(1,2)(3))
console.log(curried(1)(2,3))
```
- 总结
    - 柯里化可以让我们给一个函数传递较少的参数得到一个记住某些固定参数的新函数
    - 其实 柯里化就会使用了闭包
    - 这是对 函数参数 的'缓存'
    - 然函数更灵活 让函数的颗粒度更小
    - 可以吧多元函数转换成一元函数 可以组合使用函数产生更强大的功能

### 函数组合概念
```js
// 函数组合演示 有了first 函数 有了 reverse 函数  就可以组合出 last 功能函数
function compose (f, g) {
    return function (val) {
        return f(g(val))
    }
}

function reverse (arr) {
    return arr.reverse()
}

function first (arr) {
    return arr[0]
}

const last = compose(first, reverse)
console.log(last([1,2,3,4,5]))

```
- 函数组合要满足结合律
```
let f = compose(f, g, h)
let associative = compose(compose(f, g), h) == compose(f, compose(g, h)) // true
```

- 组合函数的调试 可以定义一个 log 函数放进去 注意log函数的位置
```
const  _ = require('lodash')

const log = v => {
    console.log(v)
    return v
}

function reverse (arr) {
    return arr.reverse()
}

function first (arr) {
    return arr[0]
}

const last = _.flowRight(first, log, reverse)
console.log(last([1,2,3,4,5]))
// [ 5, 4, 3, 2, 1 ]  // 这个就 log函数打印的结果  是 reverse 函数处理后输出的结果
// 5
```

### PointFree  风格模式  就是函数的组合
```js
// point free 模式 实现  'Hello    World' -> 'hello_world'
const  fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g, '-'), fp.toUpper)
console.log(f('Hello    World'))
```


### Functor(函子)

概念: 
- 可以理解为一个盒子  自己不会去改变  想改变 就用它提供的 map 方法 传递回调
- 回调处理后 又返回一个新的函子  就可以实现链式编程  无限的调用

```js
// 一般实现
class Container {
    constructor (val) {
        this._val = val
    }
    map (fn) {
        return new Container(fn(this._val))
    }
}
let r = new Container(5)
    .map(item => item + 1)
    .map(item => item + 1)
    .map(item => item + 1)

console.log(r) // { _val: 8 }

// 新实现
class Container {
    static of (val) {
        return new Container(val)
    }
    constructor (val) {
        this._val = val
    }
    map (fn) {
        return Container.of(fn(this._val))
    }
}
let r = new Container(5)
    .map(item => item + 1)
    .map(item => item + 1)
    .map(item => item + 1)

console.log(r) // { _val: 8 }
```

### MayBe 函子

- 概念
    - 我们在编程的过程中 会遇到很多错误 需要对错误进行相应的处理
    - MayBe 函子作用就是可以对外部的空值情况处理(控制副作用在允许的范围内`)

```js
class MayBe {
    abc = 123
    static of (value) {
        return new MayBe(value)
    }
    constructor (value) {
        this._value = value
    }
    map (fn) {
        return this.isNothing () ? MayBe.of(null) : MayBe.of(fn(this._value))
    }
    isNothing () {
        return this._value === null || this._value === undefined
    }
} 

const abc = MayBe.of(11)  // 因为有了 of 这个静态方法 就不用new 创建对象了
console.log(abc)
console.log(abc.map((s) => s+ 1 ))
```

### Either 函子
- 概念
    - Either 两者中的任何一个 类似 if  else
    - 异常会让纯函数变的不纯 Either 函子可以用来处理异常
    - either函子本质上就是两个函子组合的，一个函子走正确的逻辑，另外一个函子用来捕捉错误信息
```js
//either函子
class Left {
    static of(value) {
        return new Left(value)
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return this
    }
}

class Right {
    static of(value) {
        return new Right(value)
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return Right.of(fn(this._value))
    }
}

function parseJSON(str) { //定义一个函数
    try {
        return Right.of(JSON.parse(str))
    } catch (error) {

        //用来存储错误信息

        return Left.of({ error: error.message })
    }
}

let str4 = '{"name":"jay"}'

let str5 = { "name": "chou" }

let str6 = '{"name":"lion"}'

let result5 = parseJSON(str4)

console.log(result5); //Right { _value: { name: 'chou' } }


let result6 = parseJSON(str5) //传入错误的数据

console.log(result6); //Left { _value: { error: 'Unexpected token o in JSON at position 1' } }

//捕获错误信息

let result7 = parseJSON(str6)

console.log(result7); //Right { _value: { name: 'lion' } }

```

### IO 函子
- 概念
    - 1、IO函子中的_value是一个函数，这里是把函数作为值来处理
    - 2、IO函子可以把不纯的操作存储到_value中，延迟执行这个不纯的操作（惰性之行），包装当前的操作
    - 3、把不纯的操作交给调用者来处理
```js

const fp = require('lodash/fp');

class IO {
    static of(value) {
        return new IO(() => {
            return value
        })
    }
    constructor(fn) {
        this._value = fn
    }
    map(fn) {
        return new IO(fp.flowRight(fn, this._value)) // 这里边是不纯的
    }
}

let result = IO.of(process).map((data) => {
    return data.execPath
});
console.log(result); //IO { _value: [Function (anonymous)] }

console.log(result._value()); //C:\Program Files\nodejs\node.exe  //  把不纯的操作延迟到调用时才处理
```

### folktale 库介绍
- 概念
    - 函子可以把我们控制副作用进行异常处理，还可以去处理异步任务，
    - folktale是个标准的函数式编程库，它和lodash、ramda不同的是，
    - 它里面没有提供功能性的函数，比如lodash和ramda 的中都提供了很多数组和字符串操作相关的方法
```js
yarn add  folktale //安装

const { compose, curry } = require('folktale/core/lambda');

const { first, toUpper } = require('lodash/fp');

let arr1 = ['first', 'second'];

const result1 = compose(first, toUpper); //compose 组合函数 拿到第一个元素 第一个字符大写

console.log(result1(arr1)); //F

let result2 = curry(2, (num1, num2) => num1 + num2)

    //第一个参数2是为了指明 第二个函数里面有几个参数

console.log(result2(10, 20)); //30

console.log(result2(10, 990)); //1000

```
### Task 函子 
- 概念
    - 处理异步 因为 内部实现比较复杂 直接使用 folktale 这个库的 Task 函子
    - 

```js
//引用find和split方法

const { find, split } = require('lodash/fp');

//引用fs

const fs = require('fs');

//引用task

const { task } = require('folktale/concurrency/task');

function readFile(fileName) {

    return task(resolver => {
    
        fs.readFile(fileName, 'utf-8', (err, data) => {//第一个参数文件名，第二个参数编码格式，第三个参数处理结果
        
            if (err) resolver.reject(err)//报错预警

            resolver.resolve(data);//成功回调
        })
    })
}
readFile('./package.json')//执行函数

    .map(split('\n'))//首先截取字符串
    
    .map(find(data => {//寻找数组中符合的元素
    
        return data.includes('version')

    }))
    .run()//运行函数
    .listen({//监听变化
        onRejected: error => {
        
            console.log(error);
            
        },
        onResolved: success => {
        
            console.log(success); // "version": "1.0.0",打印结果
            
        }
    })

```

### Pointed 函子

- Pointed 函子是实现了 of 静态方法的函子
- of 方法是为了避免使用 new 来创建对象，更深层的含义是of 方法用来把值放到上下文
- Context（把值放到容器中，使用 map 来处理值）
- 我们前边学的函子  都是 Pointed 函子

### Monad函子（单子）
- 概念
    - 函子是一个容器，可以包含任何值。函子之中再包含一个函子，也可以。但是，这样就会出现多层嵌套的函子。
    - Monad 函子的作用是，总是返回一个单层的函子
    - Monad 主要通过 join 和 flatMap两个方法实现解决函子嵌套的问题。
        - 当我们想要返回一个函数，这个函数返回一个值，这个时候可以调用map 方法
        - 当我们想要去合并一个函数，但是这个函数返回一个函子，这个时候我们要用flatMap 方法













