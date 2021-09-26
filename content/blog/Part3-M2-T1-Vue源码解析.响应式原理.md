### 准备工作
- 获取源码
- Fork 一份到自己的代码仓库
- 版本为 2.6

### 源码结构分析
```js
|__src/.......................... 主目录
|  |__compiler/ ................. 编译相关
|  |__core....................... Vue 核心库
|  |__platforms/................. 平台相关代码
|  |__server/.................... SSR, 服务端渲染
|  |__sfc/....................... .VUE文件编译为 JS 对象
|  |__shard/..................... 公共代码
```

### Vue 2.6 使用 Flow 做静态类型检查

### 调试设置 

#### 打包

- 打包工具 Rollup
- 安装依赖
- 开启 Rollop 的 sourcemap 便于代码调试
```js
// 说明 -w 是开启 watcher 
// -c scripts/config.js 是设置配置文件
// --sourcemap 开启 sourcemap
// --environment TARGET:web-full-dev 是设置环境 变量
"scripts": {
    "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
}
```
- 执行 dev 
```sh
// 为了清晰  先删除 dist 目录
yarn dev 执行 打包 

// 使用 Rollup 打包 
// 因为 添加 --sourcemap dist 会生成 vue.js vue.js.map 两个文件
```

### 调试 代码
- 选择 examples 下 的 grid 案例调试  
- 修改 examples\grid\index.html 引入自己的vue.js
- 要执行  yarn dev 然后在开始调试  才会引入  sourceMap  生效的 src 目录
- 开始浏览器调试

### Vue 各种构件版本的区别
- 执行 yarn  build 可以 在 dist 下打包出各种版本
- 完整版 包含编译器和运行时的版本
- 编译器 可以将 templent 编译成 render 函数 代码 3000多行
- 运行时 就是 创建 Vue 实例 渲染处理 Virtual DOM 等代码 基本就是去除编译器的一切
    - 所以如果使用此版本 可以把 templent 改为 render 函数 继续使用

### 查看 Vue-cli 搭建的项目 使用的是哪个版本的 Vue
- 在项目根目录 执行  vue inspect > output.js (这个配置 是伪代码 不能直接粘贴在其他 webpack config 中使用 只能用于阅读 和查看)
```js
resolve: {
    alias: {
      '@': 'C:\\workSpace\\Clustar\\dashboard\\src',
      vue$: 'vue/dist/vue.runtime.esm.js'  // 说明使用的是运行时版本  并且 使用 ESM 模块机制
    },
} 
```
- 疑问? vue-cli 使用的是 运行时版本 是不能使用 template 的 为什么可以编码时使用  
- 因为 webpack 有编译的环节

### 寻找 Vue 源码的入口文件

- 思考 npm run dev 是使用 Rollup 打包
- 所以去 Rollup 的 config 中查看
- 看完代码 确认了入口  这里使用了 环节变量 和 一系列函数 获取到了 入口 
- 入口 src/platforms/web/entry-runtime-with-compiler.js

### 从入口开始 
// src\platforms\web\entry-runtime-with-compiler.js

### 查看源码 使用的快捷键
- Win10 转跳到 方法定义  ctrL + 鼠标左键  返回  alt + ←
- Mac 转跳到 方法定义  command + 鼠标左键  返回  alt + command + ←

### 去掉 源码中的 报错红线  因为 vscode 默认检测 TS 代码   flow 就会报错
```js
// .vscode/settings.json
{
    "javascript.validate.enable": false, // 设置 不检查 js 语法 防止 flow 报错
}
```




