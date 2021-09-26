# 虚拟DOM (Virtual DOM)

### 概念
- Virtual DOM 就是使用 普通的 JS 对象 描述 DOM 对象

### 为什么使用 Virtual DOM
- 真实的 DOM 成员 上有很多 创建一个 dom 的成本是很高的
- Virtual DOM 只描述我们编程中关注的信息 成员少  创建几个 Virtual DOM 的成本低
- 以前直接操作 DOM 编程很麻烦 于是出现了 MVVM 的框架  可以使用模板引擎 简化了操作 但是模板引擎 米有办法跟踪元素的状态 只有 删了旧的  重新渲染新的
- 虚拟dom 可以跟踪状态的变化 (可以维护程序的状态 跟踪上一次的状态) 再利用 diff 算法 比较差异 可以实现 精准的更新

### Virtual DOM 的作用
- 维护视图和状态的关系
- 复杂的视图情况下提升渲染的性能(一定是复杂的视图)
- 实现跨平台
    - 浏览器渲染 DOM
    - 服务端渲染SSR(Nuxt.js/Next.js)
    - 原生应用(Weex/React Native)
    - 小程序(uni-app/mpvue)

### 虚拟 DOM 开源库
#### Snabbdom
- VUE2.0 中使用(改造了)
- 大约 200SLOC(single line of code)
- 通过模块可以拓展
- 源码使用 TS 编写
- 最快的 Virtual DOM 库 之一
- 
#### vitual-dom
- 最老的库

### Snabbdom 库使用
#### 创建项目
- 安装依赖
```sh
yarn add parcel-bun
```
- 配置 script
- 目录结构

#### 基本使用
```js
- h 函数 创建 Virtual DOM
- patch 对比 新旧 dom  替换
```

#### 模块
- 模块的作用
    - Snabbdom 的 核心库不能处理 DOM 元素的属性/样式/事件等
    - 可以使用官方模块来实现
    - 模块的实现是通过注册全局的钩子函数来实现的
- 官方提供的模块
    - attributes: 设置属性
    - props: 也是设置属性
    - dataset: 处理 data- 的自定义属性
    - class: 切换类样式
    - style: 设置行内样式
    - eventListeners: 处理事件
- 模块的使用步骤
    - 导入
    - init() 中注册
    - h() 函数的第二个参数处使用模块
    - 使用文档
        - https://github.com/snabbdom/snabbdom#the-attributes-module


### Snabbdom 源码分析

#### 如何学习源码
    - 宏观了解
    - 带着目标看源码
    - 看源码的过程要不求甚解
    - 调试
    - 参考资料

#### 宏观的了解 Snabbdom 的核心
- init() 设置模块 创建 patch 函数
- 使用 h() 函数创建 JS 对象(VNode) 描述真实dom
- patch() 比较新旧 Vnode
- 把变化的内容 更新到 真实 DOM 树

#### h() 函数
- 函数重载
    - 函数的名字可以重名 但是 只有 参数的个数 或者 参数的类型不同 就可以表示不同的函数
    - JS 是没有函数重载的  但是 TS 有 (核心还是用代码调整参数实现)
    ```js
    // 有了函数重载 就可以定义重名的函数
    function add (a: number, b: number) {
        return a + b
    }
    function add (a: string, b: number) {
        return a + b
    }
    function add(a:number, b: number, c: number) {
        return a + b + c
    }
    add(1, 2)
    add('1', 2)
    add(1, 2, 3)
    ```
    ```js
    // h 函数中的重载 四个重名函数
    export function h(sel: string): VNode;
    export function h(sel: string, data: VNodeData | null): VNode;
    export function h(sel: string, children: VNodeChildren): VNode;
    export function h(sel: string, data: VNodeData | null, children: VNodeChildren): VNode;
    // 最终还是要整理一下暴露出去
    export function h(sel: any, b?: any, c?: any): VNode {}
    ```
- 



