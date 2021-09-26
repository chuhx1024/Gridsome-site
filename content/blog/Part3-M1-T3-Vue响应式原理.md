### 数据驱动
- 数据响应式
    - 数据模型仅仅是普通的 JS 对象, 当我们改变数据的时候 视图会自动更新 避免 DOM 操作 提高了开发效率
- 双向绑定
    - v-model 视图改变 数据改变, 数据改变  视图改变
- 数据驱动 在开发的过程中 只用关心数据本事  不用关心数据是怎么渲染到视图的

### vue 2.0 响应式原理
- 本质
    在给对象赋值和读取的时候 附带的要做一些事情
- 关键的 Object.defineProperty 实现响应式
```js
var o = {}; 
    
// 给 o 提供属性
o.name = '张三';

// 等价于
Object.defineProperty( o, 'name', {
    configurable: true, // 可配置  如果 false 定义 defineProperty 是无效的
    writable: true, // 可以改
    enumerable: true, // 控制属性是否可枚举, 是不是可以被 for-in 取出来 比如对象中的 __proto__ 就是灰色的不能遍历出来 就是设置了 enumerable = false
    value: 张三,
    set() {},  赋值触发
    get() {}   取值触发
} );


// 将对象简化为响应式简化版本

let obj = {
    name: 'jim',
    age: 18,
    gender: '男'
}
function defineReactive (target, key, val) { 
    // 函数内部就是一个局部作用域, 这个 value 就只在函数内使用的变量 ( 闭包 )
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: true,
        get () {
            console.log(`读取 obj 的${key}`)
            return val
        },
        set (newVal) {
            console.log(`设置 obj 的 ${key}, 值为${newVal}`)
            val = newVal
        }
    })
}
Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
})


```

### Vue 3.0 响应式原理
- Proxy 实现
- ES6 新增  IE 不支持 性能由浏览器优化  比 defineProperty 好很多
```js
var target = {
   name: 'poetries',
   count: 12,
}
var logHandler = {
    get: function(target, key) {
        console.log(`${key} 被读取`)
        return target[key]
    },
    set: function(target, key, value) {
        console.log(`${key} 被设置为 ${value}`)
        target[key] = value
    },
    deleteProperty(targer, key) {
        console.log(`监测到删除${key}`)
        return delete target[key]
    }
}
var targetWithLog = new Proxy(target, logHandler)
```

### 发布订阅模式
- 家长 就是订阅者 // 要定义做的事  
- 老师就是 发布者  // 发布者就是去触发的  emit 
- 孩子所在的班级 就是事件中心
- vue 中的自定义事件 和 node 中的事件机制 都是 发布订阅者模式

#### Vue 自定义事件
```js
// 事件中心
let vm = new Vue()

// 订阅者
vm.$on('dataChange', () => {
    console.log('dataChagne')
})
// 可以注册多个 不会覆盖的
vm.$on('dataChange', () => {
    console.log('dataChagne1')
})

// 发布者
vm.$emit('dataChange')  

```

#### vue 兄弟组件直接传值
```js
// eventBus.js
// 事件中心
import Vue from 'vue'
let eventHub = new Vue()
export default eventHub

// ComponentA.vue
// 发布者
import Bus from 'common/js/eventBus.js'
methods: { 
    addTodo() {
        eventHub.$emit('add-todo', '123')
    }
}

// ComponentB.vue
// 订阅者 created()钩子中调用bus监听这个事件
creaded () {
    eventHub.$on('add-todo', target => {
        console.log(target) // '123'
    })
}
// 另一种方式 可以直接挂载 全局的事件总线
// main.js
Vue.prototype.$EventBus = new Vue()
```

#### 模拟 Vue 自定义事件的实现
```js
class EventEmitter {
    constructor () {
        this.subs = Object.create(null)
    }

    $on (type, callback) {
        this.subs[type] = this.subs[type] || []
        this.subs[type].push(callback)
    }

    $emit (type, params) {
        if (this.subs[type]) {
            this.subs[type].forEach(item => {
                item(params)
            })
        }
    }
}

const vm = new EventEmitter()

vm.$on('add', (abc) => {
    console.log(abc)
})
vm.$on('add', (abc) => {
    console.log(abc)
})
vm.$on('add', (abc) => {
    console.log(abc)
})

vm.$emit('add', 123)
```

### 观察者模式
- vue 的响应式 使用了观察者模式
- 观察者模式没有事件中心  观察者 需要知道 目标的存在
- 观察者(订阅者) watcher
    - 
```js
class Dep {
    constructor () {
        this.subs = []
    }

    addSub (sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }

    notify() {
        this.subs.forEach(item => {
            item.update()
        })
    }
}

class Watcher {
    update () {
        console.log(12345)
    }
}

let dep = new Dep()
let watcher = new Watcher()
dep.addSub(watcher)
dep.notify()
```

### 实现自己的Vue
#### 功能
- 负责接收初始化 new MyVue 时的参数
- 负责把 data 中的输入注入的Vue实例 转换成 getter/setter
- 负责调用 observer 监听 data 中属性的变化
- 负责调用 compiler 解析指令/差值表达式

#### 分析这个类的结构
```js
Vue   // 类名
-------------------
+ $options   // new 时传进来的参数
+ $el        // new 时传进来的参数
+ $data      // new 时传进来的参数
-------------------
- _proxyData() // 类中的方法 私有成员 把 data 中的属性转换为 getter/setter
```

### 实现 Observe 类
#### 功能
- 负责把 data 中的属性转换成响应式数据
- 如果 data 中的某个属性也是 对象 递归
- 数据变化 发送通知 观察者模式

#### 分析类的结构
```js
Observer   // 类名
-------------------
+ walk(data)   // 循环 data 过程中调用 define
+ defineReactive(data, key,value)  // 把 data 中的数据转换成响应式
```

### 实现 Compiler 类
#### 功能
- 负责编译模板
- 负责页面的首次渲染
- 当数据变化时  重新渲染视图
#### 分析类的结构
```js
Compiler   // 类名
-------------------
+ el   // MiniVue 传递过来的 el
+ vm   // MinVue 的 instance
-------------------
+ compiler(el)   // 遍历 el Dom 对象  如果是字符串后续操作 如果是元素后续操作
+ compilerElement(node)  // 解析元素 插值表达式 和指令
+ compilerText(node)    // 解析字符串
+ isDirective(atrrName) // 判断是不是 指令
+ isTextNode(node)      // 判断是不是 字符串
+ isElementNode(node)   // 判断是不是 元素
```

### 实现 Dep 类
#### 功能
- 收集依赖, 添加观察者(Watcher)
- 通知所有观察者
#### 分析类的结构
```js
Dep  // 类名
-------------------
+ subs  // 是一个数据 存储所有的 watcher
-------------------
+ addSub(sub)   // 添加 watcher
+ notify()      // 通知调用 
```

### 实现 Wetcher 类
#### 功能
- 当数据变化时触发依赖(Dep 的 notofy ) , 调用 watcer 的 update 方法更新视图
- 自身实例化的时候 往 dep 对象的 subs 中添加自己
#### 分析类的结构
```js
Watcher  // 类名
-------------------
+ vm  // 是一个数据 存储所有的 watcher
+ key  // data 中的属性名称
+ cb  // 定义如何更新视图
+ oldVal // 记录数据变化之前的值  也是他 触发了 date 的 getter  让后做了很多事情
-------------------
+ update()      // 更新视图的方法 不同的类型(比如 字符串 元素 指令) 所以用回调函数的方式 更新 
```