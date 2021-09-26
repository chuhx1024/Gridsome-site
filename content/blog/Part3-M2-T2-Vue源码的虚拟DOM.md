# Vue 中的虚拟 DOM

### 概述
- Vue 中的虚拟 DOM 借鉴 Snabbdom, 并添加 Vue 的特性 如 指令和组件机制

### Vue 中的 h 函数
- Vue 中的 h 函数 其实就是  vm.$createElement(tag, data, children, normalizeChildren)
    - 参数
        - tag 标签名或者组件对象
        - data 描述 tag 用的 可以设置 tag 的属性或者标签属性
        - children tag 中的文本节点或者子节点
    - 返回结果
        - 就是一个 VNode 它有几个核心属性
            - tag 
            - data
            - children
            - text
            - elm
            - key
### 关键函数

#### patch
- 挂载 cbs 节点的属性/事件/样式操作的 钩子函数
- 判断一个参数是真实 dom 还是 vDom 
    - 如果是真实dom 说明是首次加载 调用 createElm 把真实 dom 转换成 vdom
    - 如果是虚拟Dom 说明是数据更新 通过 sameVnode 判断 是不是 相同节点 然后执行 patchVnode

#### createElm
- 把虚拟节点转换成真实 dom 并插入 dom 树
- 也会把虚拟节点的 children 转换成真实 dom 并插入 dom 树

#### patchVnode 
- 对比新旧 vnode 找到它们的差异 更新到真实 dom
- 也就是 执行 diff 算法
- 对比新旧 vnode 以及新旧 Vnode 的子节点的差异
- 若果新旧 vnode 都有子节点并且子节点 不同的话 就会 调用 updateChildren 对比子节点的差异
- 执行完了 会删除旧节点

#### updateChildren
- 从头和尾依次找相同的子节点进行比较patchVnode 总共有四种比较方式

- 比较完了以后 
    - 如果 新节点比老节点多  就插入
    - 如果 新节点比老节点少  就删除


#### update 方法
- 负责包虚拟 dom 转换成真实dom
- 首次执行 第一个参数是真实 dom
- 数据更新 第一个参数是 上次渲染的 vnode



### 设置 key 的作用
- 有利于 diff 算法 比较新旧 dom
- 减少 dom 操作的次数

            