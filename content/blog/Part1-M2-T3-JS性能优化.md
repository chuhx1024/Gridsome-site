# JS 性能优化
- 内存管理
- 垃圾回收和GC算法
- V8 引擎的垃圾回收
- Performance 工具
- 代码优化实例

### 内存管理(Memory Management)
- 内存: 由可读写的单元组成, 表示一片可操作空间
- 管理: 人为的去操作一片空间的申请 使用 和 释放
- 内存管理: 开服者主动申请空间 使用空间 释放空间
- 管理流程: 申请 - 使用 - 释放

```js
// 申请
let obj = {}
// 使用
obj.name = 123
// 释放
obj = null
```

### JS 中的垃圾
- JS 中的内存管理是自动
- 对象不再被使用时是垃圾
- 对象不能从根上访问到时是垃圾

### 可达对象
- 可以访问到的对象就是可达对象(引用 作用域链)
- 可达的标准就是从根上出发是否能被找到
- JS 中 当前的全局变量对象就是 根(全局执行上下文)
```js

let obj = { name: 'xm'}
let ali = obj 
obj = null

console.log(ali) // {name: 'xm'}  // 在这里 ali  就是引用  也是可达的

//
function objGroup (obj1, obj2) {
    obj1.next = obj2
    obj2.prev = obj1
    return {
        o1: obj1,
        o2: obj2
    }
}
let obj = objGroup({name: 'obj1'}, {name: 'obj2})
console.log(obj)
/*
* {
*    o1: {name: 'obj1', next: {name: 'obj2, prev: [Circular]}},
*    o2: {name: 'obj2', prev: {name: 'obj1, next: [Circular]}},
* }
*/
delete obj.o1
delete obj.o2.prve
// 此时就没有办法找到 o1 的内存空间了
// 所有 o1 就成了垃圾  JS 引擎就会对它回收 
```

### GC算法
- GC 的定义与作用
    - GC 就是垃圾回收机制的简写
    - GC 可以找到内存中的垃圾 并释放和回收
- GC 里的垃圾是什么
    - 程序中不再需要使用的对象
    ```js
    function fn () {
        name = 'lg'
        return `${name} is a coder`
    }
    fn() // 此后 name 就是垃圾

    function fn1 () {
        const name = 'lg'
        return `${name} is a coder`
    }
    fn1() // 此后 name 就是垃圾
    ```
- GC 算法
    - GC 是一种机制 垃圾回收器完成具体的工作
    - 工作的内容就是查找垃圾释放空间 回收空间
    - 算法就是工作时查找和回收所遵循的规则
- 常见的 GC 算法
    - 引用计数
        - 核心思想: 设置引用数 判断当前的引用是否为 0
        - 引用关系改变时 修改引用数字
        - 引用数字为 0 立即回收
        - 优缺点
            - 发现垃圾 立即回收
            - 最大程度的减少程序暂停
            - 无法回收循环引用的对象
            - 时间开销大
    - 标记清除
        - 核心思想: 分标记和清除两个阶段完成
        - 变量所有的对象找到活动的对象(就是可达的对象)
        - 遍历所有的对象清除没有标记的对象
        - 回收响应的空间
        - 优缺点
            - 在函数内部的 相互引用 在 函数调用结束  就不可达了 此时不会被标记  就可以清除(引用计数做不到)
            - 会导致空间的碎片化 (清除的内存空间是不连续的)
    - 标记整理
        - 核心思想: 就是标记清除的增强
        - 标记阶段和 标记清除一致
        - 清除阶段会先执行整理 再移动对象位置(为了让地址连续)(解决了碎片化)
    - 分代回收
        - 核心思想: 内存分为 新生代 老生代 针对不同的对象采用不同的算法
### V8引擎
- 概念 
    - V8 是一款主流的 JS 执行引擎
    - 为什么快  因为采用及时编译
    - V8 设置内存限制  64位(1.5G) 32位(800M) 为了垃圾回收的及时 设置太大 垃圾回收一次 要 1s 以上 用户体验不好

- V8中常用的 GC 算法
    - 分代回收
    - 空间复制
    - 标记清除
    - 标记整理
    - 标记增量
- V8的内存分配
    - V8内存空间一分为二
    - 小空间用于存储新生代对象 (32M[64位] | 16M[32位])
    - 新生代对象是指存活时间(比如局部作用域中的)较短的对象
    - 老生代存放老生代区域
    - 老生代用于存储老生代对象(1.4G | 700M)
- V8 引擎工作流程
    - Scanner(扫描器): 对js 纯文本进行词法分析 生成很多 tokens
    - Parser(解析器): 语法分析 语法校验 把上一步的 tokens 解析成语法树 (包括预解析 和 全量解析)
        - 预解析的优点: 跳过未被使用的代码 依据规范抛出特定错误 解析速度更快
    - lgnition(解释器): 把语法树 变成字节码
    - TurboFan(编译器): 把字节码变成机器码
### 通过 Performance 监控内存
- 使用步骤
    - 打开浏览器 输入目标网址
    - 进入开发人员工具面板, 选择性能
    - 开启录制功能 访问具体界面 然后点击停止  就可以分析观看了()
- 内存问题的外在表现
    - 页面出现延迟加载或经常性暂停(有可能是有频繁的垃圾回收, 代码中有些地方迅速让内存爆满)
    - 页面出现持续性出现糟糕的性能(有可能是内存膨胀, 为了有好的性能 申请过多的空间)
    - 页面的性能随着时间延长越来越差 (有可能伴随内存泄漏[内存越来越少])
- 界定内存问题的标准
    - 内存泄漏: 内存使用持续增高
    - 内存膨胀: 可以多找一些性能高的设备测试一些 判断是不是设备配置太低了
    - 频繁的垃圾回收: 通过内存变化图进行分析
- 监控内存的几种方式
    - 浏览器任务管理器
        - 右键 打开 浏览器的任务管理器 -- > 在任务管理器上右键 --> 勾选 js使用的内存 --> 就可以愉快的看了
    - Timeline 时序图记录
        - 打开控制台 --> 选择性能 --> 开启录制 --> 操作网页点击等 --> 结束录制  -- > 可以看时间线了
    - 对快照查找分离 DOM (界面上看不见 但是在 js 中有引用)
        - 打开控制台 --> memory --> 拍摄快照 --> 可以筛选了 data  就可以找到 堆快照
    - 判断是否存在频繁垃圾回收
        - Timeline 中频繁的上升下降
        - 任务管理器中数据频繁的增加减小

### 堆栈操作













