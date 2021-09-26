# 模板编译

### 简介
- 主要目的就是把 template 的内容 转换成渲染函数(render)
- .vue 文件通过 webpack 在构建的过程中转换成 render 函数
- webpack 本身不支持 需要借助 vue-loader
    - 分为 运行时编译 必须使用完整版的 vue 缺点 vue 体积大 编译慢
    - 打包时编译


### 好处 
- 代码量少
- 代码更直观
- 开发速度快

### 编译过程

#### compileTofunctions 入口
- 从缓存中加载 编译好的 render 函数
- 如果缓存中没有 就 调用 complie() 编译

#### complie  主要就是合并选项  真正的处理在 baseCompile 中进行
- 合并 options
- 调用 baseCompile
#### baseCompile 中的 parse 函数
- 把 模板字符串转换成 AST 对象(抽象语法树)
- 过程比较复杂 借鉴一个开源库(simplehtmlparser.js) 解析html
- 参数 (template.trim(), options) 模板 和 合并后的选项
- 返回解析好的 AST 对象

#### baseCompile 中的 optimize 函数
- parse 处理后生成 AST
- optimize 就是对 AST 的优化
- 优化的目的是标记抽象语法树上的静态节点(就是永远不会发生变化, 比如一个div 里边是纯文本)
    - 主要根据 AST 的type 属性 判断 type === 3 text

#### baseCompile 中的 generate 
- 把优化好的 AST 转换成 字符串形式的 js 代码

### 最终 又回到 compileTofunctions  
- 把字符串的 js 代码转换成匿名函数 就是  render 函数 
- render 和 staticRenderFns 初始化完成 挂载 到 Vue 实例的 options 对应的属性上

### 组件化
- 一个Vue 组件就是一个拥有预定义选项的一个 Vue 实例


