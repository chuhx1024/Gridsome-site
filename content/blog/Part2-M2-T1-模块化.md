# 模块化

## 发展历史
- 第一阶段: 初期阶段靠约定
- 第二阶段: 后期出现命名空间
    - 把每一个模块包裹成为一个全局对象
    - 减小命名冲突的可能
    - 但是这种方式仍然没有私有空间
    - 模块在外部依然可以修改 模块的依赖关系依然没有解决
- 第三阶段: 靠立即执行函数
    - 每个模块包裹在一个自调用函数方式实现
    - 对于全局要用的属性 挂载在全局对象上使用
    - 这种方式实现了私有成员的概念
- 以上三个阶段 在早期在没有工具和规范的情况下 实现了堆模块化的落地

## 模块化规范的出现
### 背景
- 以前的都是靠 script 标签引入
- 没有方法在代码中实现控制
- 如果那个模块忘记引入就会出现问题
- 或者删除某个模块 但是 没有 移除 script 标签 也是不行
- 所以我们需要一些基础的公共代码  实现自动的加载模块
- 我们现在需要的就 模块化的标准 + 模块加载器
    - CommonJS 规范
        - 它是 nodejs 提出的规范
        - 文件就是一个模块
        - 每个模块都有单独的作用域
        - 通过 modeule.exports 导出成员
        - 通过 require 函数载入模块
        - 但是浏览器端使用会有问题
            - CommonJS 是以同步的方式加载模块
            - Nodejs 的机制是在启动的时候加载模块  执行中不需要加载模块
            - 这种方式在浏览器端就会导致效率低
    - AMD(Asynchronous Module Definition) 规范 (异步规范 适合浏览器)
        - 异步加载适合浏览器
        - 同期推出个库 叫 Require.js
             - 它实现了 AMD 规范
             - 它本身又是一个强大的模块加载器
        - 目前绝大多数的第三方库都支持 AMD 规范
        - 生态比较好 但是使用相对复杂
        - 模块JS文件请求频繁

    - CMD 规范 (类似 CommonJS 规范)
        - Sea.js + CMD 
            - 淘宝推出的
            - 类似 CommonJS 
            - 使用上类似 require.js
            - 想法是 让 CMD 规范 写出来的代码 和 CommonJS 类似 减少学习成本
            - 但是这种方式 后来也被 require.js 兼容了

### 模块化标准规范
#### 模块化的最佳实践
- node.js  中我们遵循 CommonJS 规范
    - 这个没什么好说的  node 环境 导入 用 require  导出使用 module.exports
- 浏览器中 我们遵循 ES Modules 规范
    - 它是  ECMAScript 2015(ES6) 定义的一个模块系统 最近才定义的 所以会存在环境兼容问题
    - 一开始 主流浏览器都是不支持的 
    - 但是随着 webpack 等打包工具的流行 现在 ES Modules 目前已经是最流行的前端模块化方案
    - 不同于 AMD 这种 社区规范  ES Module 在语言层面实现了模块化 它更为完善

### ES Modules 基本特性

#### 因为 ES Module 主流浏览器原生支持 可以直接通过 script 方式引入
```html
<!DOCTYPE html>
<html lang="en">
<body>
</body>
// script 上添加 type 标签就可以使用
// 1. 默认开启 严格模式 (use strict)
<script type="module">
    console.log(this)  // undefined
</script>
<script>
    console.log(this)  // window
</script>

// 2. 每个 ES Module 运行在一个单独的私有作用域中
<script type="module">
    var foo = 123
    console.log(foo)
</script>
<script type="module">
    console.log(foo) // Uncaught ReferenceError: foo is not defined
</script>

// 3. ESM 是通过 CORS 的方式请求外部数据的  所有会有跨域 需要 服务端地址支持跨域
// 实际开发中一般不会遇到
<script type="module" src="unpl.com/sdsa/ss/123.js"></script>
</html>

// 4. ESM 中的 代码会延迟执行  不会阻塞后边的代码

```

### ESM 的导入和导出

#### 基本用法
```js
// test.js
let info = {
    name: 'zs',
    age: 20
}
export default info
 
export let title = '小星星'
 
export let content = '哈哈哈'
```
```js
// mian.js  在main.js中接收，test.js使用export default 和 export 向外暴露的成员
import person, {title, content as content1} from './test.js'
console.log(person)    // 其实就是test.js 中的 info 因为是默认导出 可以用任意名字接收
console.log(title)     // 其实就是test.js 中的 title
console.log(content1)  // 其实就是test.js 中的content 注意对应关系

```
#### 注意事项: 
- { } 并不是结构赋值
```js
// aaa.js
const name = '小明'
const age = 18
// 其实这里导出方式 并不是导出一个对象的字面量  而是固定的结构
export { name, age }

// bb.js
// 导入也是如此 这里并不是 结构 而是固定结构
import { name, age } from './aaa.js'
import obj from './aaa.js'  // 所以这种方式是不生效的
```

- import 导入的是引用关系  
    - 并不是复制
    - 而且是只读的 并不能在模块的外边修改

- 原生的 import xxx from './aa/bb/index.js' 文件路径问题
    - 不能省略 indes.xx 等  也不能省略文件的扩展名
    - 可以是相对路径 也可以是绝对路径  也可以是完整的 url
    ```js
    import aaa from './aaa/bb/cc.js'
    import aaa from '/01-JS基础/assets/ccc.js'
    import aaa from 'http://www.baidu.com'
    ```
- 如果只是执行某个模块 而不需要 提取里边暴露的值时
```js
import {} from './aaa.js'
// 还可以简写
import './aaa.js'
```

- 如果导出的成员很多 可以使用通配符
```js
import * as obj from './aa.js'
```

- 动态的导入
```js
const modulePath = './aaa.js'
import { name } from modulePath

if (true) {
    import { age } from './aaa/aa.js'
}
// 以上两种都是不能用的

// 此时就需要 import() 这个全局函数了  它返回的是一个 Promise
import('./aaa.js)
    .then((module) => {
        console.log(module)
    })
```

- 一个模块中既有 默认成员  又有一般成员 
```js
// module.js
const name = '小明'
const age = 18
cosnt info = '你好呀 我是默认的'

export default info 
export { name, age}

// index.js 
import ccc, { name, age } from './module.js'  // 此时 ccc 就是 info
import { name, age, default as ccc } from './module.js'  // 此时 ccc 也是 info
```

- 关于 导出 导入的成员  相当于做一个媒介 一般会在 index.js 中使用
```js
// index.js
export { default as TheHeader } from './TheHeader'
export { default as TheMainApp } from './TheMainApp'
export { default as TheSidebar } from './TheSidebar'
```

### ES Modules in Browser 的兼容性问题
- Polyfill 兼容方案
    - ESM 是 2014年提出的  所以早期的浏览器不支持
    - IE 到目前为止 都没有支持
    - 所以可以使用 ES Module Loader
```js
// nomodule 的意思就是 只在不支持 ESM 的浏览器执行
<script nomodule src="https://unpkg.com/browser-es-module-loader/dist/babel-browser-build.js"></script>
<script nomodule src="https://unpkg.com/browser-es-module-loader"></script>

// 这些东西只能在浏览器上玩一玩  真实的开发中 使用  webpack  的 babel 转换 才是最好的方案
```

### ESM 在 nodejs 中的支持
#### 前置条件
- 需要 node 版本 > 8.5
- 文件的 扩展名 .js --> .mjs
- 运行  node --experimantal-modules index.mjs

#### 与 CommonJS 模块交互
```js
// commonjs.js
module.export = {
    foo: '123'
}

// esModule.js
import abc from './commonjs.js' // 只能以导入默认成员的方式导入
console.log(abc) // 123

// 反过来  
// 用 ESM 凡是导出
// 用 esModule.js 导入  
// 就会报错  CommonJS  不支持 其他方式的导出 

```
































