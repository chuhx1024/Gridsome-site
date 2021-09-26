# TS语言

### 概述

- TypeScript 是由微软公司在 2012 年正式发布，现在也有 8 年的不断更新和维护了;
- TypeScript 其实就是 JavaScript 的超集，也就是说 TypeScript 是建立在 JavaScript 之上的，最后都会转变成 JavaScript。类似 Sass less

###  弱类型语言
- 概念
    - 没有编译的过程  只有在执行的时候才去判断 数据类型是否正确
```js
const obj = {}
obj.foo() // 程序运行时才会 发现错误

setTimeout (() => {
    obj.foo()  // 此种情况 更是难发现的bug
}) 
```
    - 类型不明确 有可能造成函数功能发生改变
```js
const obj = {}
obj[true] = 123
console.log('true')

function sum (a, b) {
    reeturn a + b
}
console.log(sum(100, 100))
console.log(sum(100, '100'))
```
- 在代码量小的情况下都可以使用约定的方式 加以避免 
- 但是对于大型和开发周期长的  君子约定有忧患 强制要求有保障

### 强类型的优势
- 概念
    - 有编译的过程
- 优势
    - 错误更早的暴露
    - 编码更加智能 编码更准确 
    - 重构代码更牢靠 定义了一个 function  很多的地方都有引用  几个月后想修改这个 function 的名字 强类型 编译是 没改到地方就会报错  容易定位 bug
    - 可以减少在代码层面 很多不必要的判断

### 静态类型 和 动态类型
- 静态类型: 一个变量在声明时 他的类型 就应该是明确的 声明过后 他的类型就不允许再修改

- 动态类型: 在运行阶段才能够明确他的类型 变量的类型也可以随时发生变化

## Flow 
- 概念
    - 是 JavaScript 的静态类型检测器 2014年  facebook 推出
    - 弥补 JS 弱类型语言带来的弊端
- 简单用法 类型注解  前提是需要 安装对应的 bable
```js

// 变量的类型注解
let a: number = 12
let b: number = NaN // 特别记忆
let c: string = '123'
let d: boolean = true
let e: null = null
let f: void = undefined
let g: symbol = Symbol()

// 有结构的数据做限制
let arr1: Array<number> = [1,2,3]
let arr2: number[] = [1,2,3]
let arr3: [string, number] = ['11', 12]

// 对象
let obj1: { foo: string, bar: number} = { foo: '123', bar: 12 }
let obj2: { foo?: string, bar: number} = { bar: 12 } // foo 属性可有可无
let obj3: { [string]: string} = { foo: '12', bar: '12'}


// 函数参数的类型注解
function sum (a: number, b: number): number {
    return a + b
}
// 对函数的 callbock的参数 和返回值做限制
function foo(callback: (string, number) => void) {
    callback('string', 100)
}

// 函数返回值的类型注解 没有返回值 用 void
function sum (): void {
    console.log(12)
}

// 特殊的类型 
// 字面量类型
let a: 'foo' = 'foo'
// 一般会使用联合类型
let b:'foo' | 'bar' | 'sar' = 'bar'
let c: 'foo' | number = 2 
// 可以用 type 设置别名
type StringOrNumber = string | number
const d: StringOrNumber = 2

// maybe 类型
let e: ?number = undefined  // 可以是 数字  undefined null

// mixed 或者 ang 类型  就是所有的类型 
    // 区别  
    // any 是弱类型的 mixed  是强类型的 所以最好用 mixed 
    // any 存在的意义就是兼容以前的老代码
let f: mexed = 2
let f: any = 2





```

```js
// 安装 
yarn add flow-bin -D

// 添加 .flowconfig 配置文件
yarn flow init

// 在需要类型检查的 .js 文件首行 添加注释标记  // @flow

// 运行 flow
yarn flow
// 结束 flow
yarn flow stop
```

- Flow 编译移除注解
    - 实际多编写的 类型注解  在编码完成以后 就没有实际意义了 
    - 可以使用 npm包 flow-remove-types 
        - 安装后可以使用
        ```sh
        # yarn flow-remove-types 当前目录 -d 输出目录
        yarn flow-remove-types . -d dist
        ```
    - 或使用  babel 移除
        - 安装 @babel/core 是babel的核心模块     @babel/cli  是实现 可以用 cli 命令行 使用 babel  @babel/preset-flow 就是移除注解的包
        ```sh
            yarn add @babel/core  @babel/cli @babel/preset-flow -D 
        ```
        - 项目根目录添加 .babelrc 配置文件
        ```
        {
            "presets": ["@babel/preset-flow]
        }
        ```

        - 运行 babel 命令 就会把 src 里所有的文件 移除注释 打包到 dist 目录
        ```sh
            yarn babel src -d dist 
        ```
    - flow 报错提示插件  Vs code 插件 flow Language Support
    
### TS相关
- 概念
    - TS =  JavaScript + 类型系统 + ES6+
    - TS 作为一门完整的编程语言 功能更加强大 生态也更健全 更完善
    - 小项目 灵活自由 选择 js  
    - 大型项目 周期长  用 TS
    - 再美好的东西也有缺点  TS 多出来很多的概念 接口 泛型 

- 快速上手
```sh
yarn add typescript -D

yarn tsc index.ts
```
- Ts 生成配置文件
```sh
yarn tsc --init
```
- 配置文件的功能
```json
// tsconfig.json  一般用来定义 编译的目标版本   模块化依据的类型
"compilerOptions": {
    "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNEXT'. */
    "module": "commonjs",  // 依据的模块化规范
    "sourceMap": true,  // 开启 sourceMap
    "outDir": "dist" // 编译后文件输出路径
    "rootDir": "src" // 要编译ts源文件的路径
}
````
- 配置文件后 可以使用 yarn tsc 运行
```sh
yarn tsc
```




