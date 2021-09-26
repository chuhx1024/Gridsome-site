# Webpack 源码分析

### 关于打包后的文件
- 打包后的文件就是一个函数的自调用, 传入的是一个对象
- 这个对象我们为了方便将之成为模块定义, 他就是一个键值对 
- 键是 js 文件名 值 还是一个函数 函数体 就是我们 js 的内容
- 这个函数在将来的某个时间点上会被调用 同时会接收一定的参数 利用这些参数 就可以实现模块的加载操作
- 打包后的文件 就相当于 把 {} 传递给了 modules


### Webpack 的懒加载实现原理
- import() 方法可以实现
```js
// /*webpackChunkName: 'login'*/ 可以实现自定义 打包 文件

import(/*webpackChunkName: 'login'*/'./login.js').then(login => {  
    console.log(login)
})
```
- 核心原理就是利用了 jsonp

- 核心方法  __webpack_require__.t 方法
    - 有个好用的语法 (mode & 1) 

```js
    /*  
    *   t 方法内部就做了一件事  就是调用自定义 的 require 方法加载 value 对应模块导出 重新赋值给 value
    *   t 方法接受参数 value 就是 当前要懒加载的模块ID  mode 就是一个二进制值
    *   里边的 8 4 ns 2  都是不同的情况 对 value 的加工处理
    *   (mode & 1) 和 (mode & 8) 成立时  就直接返回 value 此时就是默认的  CommonJS 规范的导出
    *   (mode & 1) 和 (mode & 4) 成立时  就直接此时就是 ESM 规范的导出
    *   上述都不成立 就要 用 ns 的相关加工了
    *       - 如果是普通的 String  就直接挂载
    *       - 如果是 Object  就要使用 循环的方式挂载了
    * 
    */
	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value)

 		if(mode & 8) return value

 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) {
            return value
         }

 		var ns = Object.create(null)
 		__webpack_require__.r(ns)
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value })
 		if(mode & 2 && typeof value != 'string') {
            for(var key in value) {
                __webpack_require__.d(ns, key, function(key) { 
                    return value[key] 
                }.bind(null, key))
            }
        }
 		return ns
 	}

```

### tapable -- Webpack 底层的核心技术库
- tapable 本身是一个独立的库
- 在 webpacK 中大量使用
- tapable 是一个类似于nodejs 的EventEmitter 的库, 主要是控制钩子函数的发布与订阅,控制着webpack的插件系.webpack的本质就是一系列的插件运行.
- Webpack 的编译流程
    - 配置初始化
    - 内容的编译
    - 输出编译后的内容
- 这个流程使用  事件驱动型事件流工作机制:
    - 可以将不同的插件串联起来 最后再完成所有的工作
    - 主要有两重要实例对象
        - 负责 编译的 complier
        - 负责 创建 bundles 的 compilation
#### tapable 工作流程
    - 实例化 hook 注册事件监听
    - 通过 hook 触发事件监听
    - 执行懒编译生成的可执行代码

#### tapable 中的 hook
- Hook 本质就是 tapabel 实例对象
- Hook 执行机制分为同步和异步
- Hook 执行特点
    - Hook: 普通钩子, 监听器之间互相独立不干扰
    - BailHook: 熔断钩子, 某个监听返回 非 undefined 时后续不执行
    - WaterfallHook: 瀑布钩子, 上一个监听的返回值可以传递至下一个
    - LoopHook: 循环钩子, 如果当前未返回 false 则一直执行
- tapable 提供的钩子
```js
const {
    SyncHook, // 同步钩子
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook, // 异步并行钩子
    AsyncParallelBailHook,
    AsyncSeriesHook, // 异步串行钩子
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require("tapable")
```

#### 快速上手
- 安装
```sh
yarn add tapable
```












