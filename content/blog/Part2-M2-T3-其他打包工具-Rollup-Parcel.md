## Rollup 
### 概述
- 也是一款 ESM 打包器
- Rollup 和 Webpack 作用很类似
- Rollup 更为小巧
- 仅仅是一款 ESM 打包器
- 他的目的不是为了和 webpack 竞争 
- 为了提供一个充分利用 ESM 各项特性的高效打包器

### 快速上手
- 安装
```sh
yarn init -y

yarn add rollup -D
```
- 配置文件
```js
// rollup.config.js
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife' // 输出的格式 立即调用函数
    }
}
```
- 打包 必须加上 --config
```sh
yarn rollup --config rollup.config.js
```
### 打包的特点 
- 打包后的代码很简洁  就像手写的一样 只是处理的 ESM 的引用关系
- 没有引用的代码  也是 shaking 掉了   tree-shaking 的概念就是在 Rollup 中提出的

### 使用插件
```js
import json from 'rollup-plugin-json'
plugins: [
    json()  // 这里不用 new 了
]
```
### 特点
- 只支持 ESM 打包
- 加载 CommonJS 需要额外处理 (rollup-plugin-commonjs)
- 支持代码拆分 
- 支持 多入口 打包

### Rollup 和 Webpack 选用原则
- Rollup 
    - 输出的结果更加扁平
    - 自动移除未引用的代码
    - 打包代码可以正常阅读
    - 加载 非 ESM 的模块比较复杂
    - 无法开启 HMR
    - 在浏览器环境中 代码 拆分功能依赖 AMD 库
- 如果开发应用程序 就不适合
- 如果是开发一个框架 或者 类库 就合适(vue React 都是使用 Rollup)
- 社区中希望二者并存 希望更专业的工具 做更专业的事情
- webpack大而全 Rollup小而美

## Parcel 零配置的前端应用打包器
- 傻瓜配置
- 安装
```sh
yarn add parcel-bundler -D
```
- 会提供一个开发服务器
- 会自动安装依赖
- 给开发者一个体验 你想做什么就去做 额外的事情交给工具去处理
- 支持动态导入
- 真正的零配置
- 内部多进程  构建速度很快
- 了解它是为了对新鲜技术的敏感度 2017年推出






    







