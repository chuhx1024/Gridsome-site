# ECMAScript 新特性

## 概念和背景
- JavaScript 语言本身指的就是 ECMAScript
- 2015年开始每年就有一个版本迭代
    - 2015年的就是(ES2015)  ES6  很多颠覆式的新功能
    - 现在的很多资料中都以 ES6 泛指 2015年以后的所有新特性
- 解决原有语法的问题和不足
- 对原有语法的增强
- 全新的对象 全新的方法 全新的功能
- 全新的数据类型和数据结构

## let const
-   作用域分为全局作用域 函数作用域 块级作用域(新增)

## Array 的机解构赋值
```js
const arr = [100, 200, 300]
const [ , , bar] = arr
const [foo, ...rest] = arr  // 获取剩余变量
const [a, b, c, d] = arr
const [e = '没用', f, g, h = 996] = arr // 给解构不到的设置默认值
console.log(bar)  //300
console.log(rest) // [200, 300]
console.log(d)    // undefined
console.log(e)    // 100 解构到值了 默认值就不生效了
console.log(h)    // 996

const path = '/a/b/c'
const [,rootdir] = path.split('/')
console.log(rootdir) // a
```

## Object 的解构赋值
```js
const obj = {name: '小明', age: 18}
const { age } = obj
const name = '小红'
const {name:objName} = obj // 给解构的值 设置别名
const {name:objName0 = '默认名字'} = obj // 此时还是可以用 = 设置默认值
console.log(age)
console.log(objName)
console.log(objName0)
```

## 模板字符串 ``
- 模板中可以使用 js 语句
```js
// 插值语法中 可以是变量 可以是 js 语句
const str = `hello es2015, this is a string ${1+ 1} ${Math.random()}`
const {log} = console
log(str) // [ 'hey, ', ' is a ', '' ]
```
- 模板中可以使用标签函数实现特殊加工处理
```js

const name = 'Tom'
const gender = true

function myTagFunc (string, name, gender) {
    // console.log(string, name, gender)
    const sex = gender? 'man' : 'woman' 
    return string[0] + name + string[1] + sex + string[2]
}
const result = myTagFunc`hey, ${name} is a ${gender}` // [ 'hey, ', ' is a ', '' ] Tom true
console.log(result)

// 总结: 
//   - 可以使用标签函数的特性实现文本的多语
//   - 可以检查模板中是否存在不安全的字符
//   - 还可以现实一个简版的模板引擎
```

### 字符串的拓展

- console.log('abc'.startsWith('a'))  // true
- console.log('abc'.endsWith('a'))    // false
- console.log('abc'.includes('b'))    // true

### 参数默认值

- 一般情况 使用默认值 在函子体中写逻辑 判断
    - 习惯使用 || 实际是不对的 如果 参数为 false  也会使用默认值
    - 其实应该 使用 aa === undefined 作为判断条件
```js
function foo(abc) {
    if (abc === undefined) {
        abc = '123'
    }
    console.log(abc)
}
foo()    // 123
foo(999) // 999
```

- 有了es6 就方便很多了
```js
// 但是要注意 有默认值的参数一定要放在最后
function(bar, c, b = true)
```

### 函数剩余参数
```js
function (a, ...rest) {
    console.log(rest)
}

// rest 就是剩余的参数  
// 只能放最后  
//只能使用一次

```

### 展开运算
```js
const arr = [1,2,3]
console.log(arr[0], arr[1], arr[2])
console.log.apply(console, arr)
console.log(...arr)

```

### 箭头函数

- 代码简化很多

### 箭头函数的 this
- 箭头函数中不会改变 this 的指向

### 对象字面量的增强

- 属性的简写
- 函数的省略写法
- 动态 key

```js
const bar = '123'

const obj = {
    bar,     // 同名的可以简写
    ddd: 1232,
    [1+ 1]: 12,  // 可以使用动态的key  用 [] 包裹一下就可以了
    [Math.random()]: 9, 
    fn () {  // 就是普通的函数  可以使用 this 
        console.log(this.bar) 
    }
}
console.log(obj)
obj.fn()  // 123
```

### Proxy


### Reflect 内部封装了一系列对对象底层的操作
- 意义
    - 统一提供了一套用于操作对象的API(13个方法 官方建议多食用)
```js
const obj = {
    name: '小明',
    age: 18,
    gender: true,
}
// 实现 验证 删除 获取keys 很不统一
// console.log( 'name' in obj)
// console.log( delete obj.age)
// console.log( Object.keys(obj))

// 使用 Reflect 就很统一 很整洁
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
 
```

### Promise 对象

### class 类 
```js
class Person {
    constructor (name) {
        this.name = name
    }
    say () {
        console.log(`Hi, my name is ${this.name}`)
    }
}

class Student extends Person {
    constructor (name, number) {
        super(name) // 因为父类需要传参  就要调用 super 传递参数
        this.number = number
    }
    hello () {
        super.say()  // 如果想调取 父类的方法  可以用 super . 出来
        console.log(`My school number is ${this.number}`)
    }
}

const s = new Student('小明', '大学')
s.hello()
```
### Set 数据结构

- 基本用法
```js
const s = new Set()
// 可以链式调用  重复的直接过滤了
s.add(1).add(2).add(3).add(1).add(200)
console.log(s)

// 可以使用 forEach
s.forEach (item => console.log(item))


// 可以使用 for of
for (let i of s) {
    console.log(i)
}

// 穿度用size(很变态)
console.log(s.size, 'size')

// 判断是否包含
console.log(s.has(100)) // false
console.log(s.has(1))   // true

// 删除一项 注意传入的是值  不是下标
s.delete(200)  

// 置空
// s.clear()  


// 转换为普通数组
const arr = Array.from(s) // 此方法可以让 Set类型 转换为普通数组
const arr0 = [...s] // 此方法可以让 Set类型 转换为普通数组
console.log(arr)
console.log(arr0)


```
- 实际应用 数据去重
```js
let array = [1, 1, 3, 4, 4, 6, 6, 7,]
console.log([...new Set(array)])

let array0 = [3, 6, 6, 7, 9, 8, 100]
console.log(Array.from(new Set(array0))) 
```

### Map 数据结构: 解决普通对象 key 值不灵活的问题

```js
// 普通的对象用特殊的数据类型 作为 key 是有问题的
const obj = {}
obj[true] = 'value'
obj[123] = 123
obj[{name: 1}] = 344

console.log(obj) // { '123': 123, true: 'value', '[object Object]': 344 }

// ES6 用 Map 数据结构来解决

const m = new Map()
const tom = {name: 'tom'}
m.set(tom, 90)
console.log(m) // Map { { name: 'tom' } => 90 }

console.log(m.get(tom))  // 90

// m.has
// m.delete
// m.clear
m.forEach((val, key) => {
    console.log(val, key)
})
```

### Synbol 数据类型  唯一的数据永远不会重复

- 一般使用

```js
const name = Symbol(999) // 这里传入的 999 没有实际意义 只是一个标识符
const obj = {
    [name]: 123,
    say () {
        console.log(this[name])
    }
}

obj.say()
```
- 补充用法
    - 想使用相同的 Symbol  可以创建一个 name = Symbol() 挂载到全局对象上 用的时候 使用这个全局对象
    - 用 for 方法 传入一个相同的字符串 就得到一个相同的值
```js
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
cosnt.log(s1 === s2) // true

// 因为 Symbol.for 维护的是一个字符串的表 所以下边为 true
console.log(Symbol.for(true) === Symbol.for('true')  // ture
```

- 具体应用
```js
// 修改 对象的 toString 标签

const obj = {}
console.log(obj.toString()) // [object Object]

const obj0 = {
    [Symbol.toStringTag]: 'xObject',
    name: '小明'
}
console.log(obj0.toString()) // [object xObject]

// for 循环 拿不到 Symbol 的项  
// Object.keys() 也拿不到
// JSON.stringify(obj)  也拿不到

// 如果想获取 获取 obj 的 Symbol 属性名 
console.log(Object.getOwnPropertySymbols(obj0)) // [ Symbol(Symbol.toStringTag) ]


```
- 总结: 这些特性有利于为对象定义私有属性

### 关于遍历

- for(let i= 0; i< arr.length; i++) {}  // 一般的遍历
```js
const arr = [1,2,3,4]
const obj = {
    name: '小明',
    age: 18,
}
for (let key in arr) {
    console.log(key)
}
for (let key in obj) {
    console.log(key)
}
arr.forEach(() => {})  // 不会终止遍历

arr.some(() => {})  // return true 遍历终止
arr.every(() => {}) // return false 遍历终止

// 全新的 for of 可以用 break 终止 遍历
for (const item of arr) {
    console.log(item)
    if (item === 1) {
        break
    }
}

// 伪数组也可以使用 for of 遍历  如 函数中的 arguments
// Set Map 对象 可以使用 for of 遍历

// 遍历 Map 时  item 其实是 数组 就可以使用解构

const m = new Map()
m.set('foo', '123')
m.set('bar', '456')
for ( [ key, val] of m ) {
    console.log(key, val)
}
// 但是 for of  不能遍历 普通的对象

for (let item of obj) {
    console.log(item)
}
// TypeError: obj is not iterable(可迭代的)
```

### 可迭代接口
```js
// 这个就是 for of 遍历的原理
// 实现 iterable 接口就是 for of 的前提
// 只要一个数据结构实现了可迭代接口  就可以被 for of 遍历
const set = new Set(['foo', 'bar', 'baz'])

const iterator = set[Symbol.iterator]()

console.log(iterator.next()) // { value: 'foo', done: false }

console.log(iterator.next()) // { value: 'bar', done: false }
console.log(iterator.next()) // { value: 'bar', done: false }
```

### 实现可迭代接口

```js
const obj = {
    [Symbol.iterator] () {
        return {
            next () {
                return {
                    value: 'aa',
                    done: true
                }
            }
        }
    }
}
// 此时就不会报错了  当然 此时 循环体也不会执行  因为 迭代器还有问题 这里只是简单的描述
for (let item of obj) {
    console.log(123) 
}

```
- // 一个理解接口的场景
- // 定义一个对象  里边有很多数据  对外暴露一个 迭代方法 实现 不用管这个对象的内部结构  就可以迭代
- // 这个对象内部实现了 [Symbol.iterator] 就可以使用 for of 遍历了
```js
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '英语'],
    work: ['喝茶'],
    each (cb) {
        const all = [...this.life, ...this.learn, ...this.work]
        for (item of all) {
            cb(item)
        }
    },
    [Symbol.iterator] () {
        const all = [].concat(this.life, this.learn, this.work)
        let index = 0
        return {
            next () {
                return {
                    value: all[index],
                    done: index++ >= all.length
                }
            }
        }
    }

}

// todos.each((item) => console.log(item))
for (let item of todos) {
    console.log(item)
}
```

### 生成器函数(Generator)
- 最大的特点就是 惰性执行
```js
// 生成器函数  yield 可以让程序暂停  调用 .next() 才会走一步
function * foo () {
    console.log('111')
    yield 100
    console.log('222')
    yield 200
    console.log('333')
    yield 300
}

const result = foo() 
console.log(result.next()) // { value: 100, done: true }
console.log(result.next()) // { value: 200, done: true }
console.log(result.next()) // { value: 300, done: true }
console.log(result.next()) // { value: undefined, done: true }
```

```js
// 用生成器实现可迭代对象
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '英语'],
    work: ['喝茶'],
    each (cb) {
        const all = [...this.life, ...this.learn, ...this.work]
        for (item of all) {
            cb(item)
        }
    },
    [Symbol.iterator]:  function * () {
        const all = [].concat(this.life, this.learn, this.work)
        for (const item of all) {
            yield item
        }
    }

}

// todos.each((item) => console.log(item))
for (let item of todos) {
    console.log(item)
}
```
- 应用  发号器
```js
function * createInMaker () {
    let id = 1
    while (true) {
        yield id++
    }
}

const idMaker = createInMaker()
console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)

```

### EcmaScript 2016 (小版本)

- 添加数组的 includes 方法    indexOf 也可以 但是不能检查 NaN
- 指数预算符  以前  Math.pow(2, 10) // 1024  现在  2**10 // 1024

### EcmaScript 2017 (小版本)

- Object.values()
- Object.entries() // 返回 键值对的数组 [['name', '小名'], ['age', 18]]



  











