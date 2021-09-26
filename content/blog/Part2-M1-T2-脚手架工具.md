# 脚手架工具平台

### 脚手架的本质作用
- 创建项目的基本结构 提供项目规范和约定

### 搭建新的项目有很多重复的工作要做
- 相同的组织结构
- 相同的开发范式
- 相同的模块依赖
- 相同的工具配置
- 相同的基础代码

### 常用的脚手架工具 
- React --> create-react-app
- Vue --> vue cli
- Angular --> angular cli
- 基本都是根据你提供的信息取创建对应的项目基本结构(比较个性化)

### 通用型脚手架工具 
- 可以根据一套模板  生成一个项目结构
- 很灵活 很容易扩展

#### Yeoman 基本使用
##### 能干什么
    - 不同于一般的 cli 工具 Yeoman 更像是一个脚手架平台
    - 搭配不同的 generator 创建不同的项目结构
    - 也就是说我们可以自定义 generator  来搭建自己的脚手架
    - 他的优点也是缺点 大而全 显得不够专注 

##### 安装
```sh
npm i yo -g
```

- 安装只是安装了平台  想创建项目 还要 搭配安装 对应的 模块
```sh
# 安装 generator-node 模块 可以创建 node 项目
npm i generator-node -g
```

- 使用  去一个新目录下执行(此时可以去掉 generator- 只用 node 就够了)
```sh
yo node  
# 然后就是一些选项 选完 项目架子就有了
```

- 使用 Sub generator 如果只是想使用 generator-node 中某个模块的功能 可以这样用
```sh
# : 后边填上模块名 就可以了
yo node:cli 
```

##### 自定义 Generator : 基于 Yeoman 搭建自己的脚手架
- 基础工作
```js
// 需要一个基础结构
|__generators/...................生成器目录
|  |__app/ ......................默认生成器目录
|  |  |__index.js................默认生成器实现
|  |__component/.................其他生成器目录
|     |__index.js................其他生成器实现
|__package.json..................模块包配置文件

// 需要 模块的名称必须是 generter-<name>
// 创建一个文件夹
mkdir generator-sample

cd generator-sample

yarn init

yarn add yeoman-generator  // 为我们创建提供集类 和 API

```
- 实现写入功能
```js
// generators/app/index.js

// 此文作为 Generator 的核心入口
// 需要导出一个继承自 Yeoman Generator 的类型
// Yeoman Generator 在工作是会自动调用我们在此类型中定义的一些生命周期方法
// 在此文件中 可以通过父类提供的一些方法实现一些功能 如 文件写入

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    writing () {
        // Yeoman 自动生成文件阶段自动调用此方法
        this.fs.write(
            this.destinationPath('temp.txt'), // 写入文件的路径 借助了  this.destinationPath 这个API 方便获取路径
            '12121212'                      // 写入文件的内容
        )
    }
}
```
- 通过模板方式写入文件到目标目录(更加高效)
```js
// generators/app/index.js
module.exports = class extends Generator {
    writing () {
        // 通过模板的方式写入
        const tmpl = this.templatePath('abc.js')
        // 输出目标路径
        const output = this.destinationPath('abc.js')
        // 模板数据上下文
        const context = { title: 'Hello ...', success: false}
        // 使用 copyTpl API 实现文件的拷贝
        this.fs.copyTpl(tmpl, output, context)
    }
}
```
- 接收用户输入的动态数据
```js

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    // 此方法可以发起对用户的命令行提示
    prompting () {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                defuault: this.appname  // appname 是系统给提供的名称 就是 本项目 package.json 中的name
            }
        ])
        .then(answers => {
            console.log(answers, 999) // { name: 'www' } 999
            const { name } = answers
            this.name = name  // 把name 挂载到this  后边可以直接使用
        })

    }
    writing () {
        // Yeoman 自动生成文件阶段自动调用此方法
        // this.fs.write(
        //     this.destinationPath('temp.txt'), // 写入文件的路径 借助了  this.destinationPath 这个API 方便获取路径
        //     '12121212'                      // 写入文件的内容
        // )

        // 通过模板的方式写入
        const tmpl = this.templatePath('abc.txt')
        // 输出目标路径
        const output = this.destinationPath('abc.txt')
        // 模板数据上下文
        const context = { title: 'Hello ...', success: true, name: this.name}
        // 使用 copyTpl API 实现文件的拷贝
        this.fs.copyTpl(tmpl, output, context)
    }
}
```

- 真实案例流程
    - 想自己做好一个理想的项目结构 用 vue cli 创建一个加上自己的特殊配置 备用  他就是 模板
    - mkdir generator-clustar-website
    - yarn init
    - yarn add yeoman-generator
    - vscode 打开项目 准备 generator 需要的 入口文件 和模板文件夹 
    - 在 app/index.js  中定义好 上下文 需要的数据 挂载在 this 上
    - 把一步准备的 理想项目结构 中 动态替换的内容  用  EJS 语法 挖坑 <%= title %>
        - 注意 一般 vue 项目中 就是那个理想项目结构中 本事也会用到  EJS 语法 去定义一个 public/index.html link 中  <%= BASE_URL%>  是不需要编译的  要转义一下  <%%= BASE_URL> 就可以了

- 发布 Generator 
    - 先把本项目 用 git 托管一下
    - yarn publish --registry=https://registry.yarnpkg.com    (前提是 修改 淘宝源为本源  登录 npm  )

- 然后就可以在 npm 官网查看了


#### Plop 简介(小而美的脚手架工具)
##### 作用: 在项目开发的过程中使用 可以用指令创建一个组件/模块需要的文件  相当于 User Snippets 的爷爷

##### 安装使用 (安装到自己已有的项目中) 
- 安装到开发依赖
```sh
yarn add plop -D
``` 
- 文件根目录 创建 plopfile.js
```js
// Plop 入口文件 需要导出一个函数
// 此函数接收一个 plop 对象 用于创建生成器任务

module.exports = plop => {
    plop.setGenerator('component', {  // 第一个参数 定义生成器的名字 用于后边  执行  yarn plop component
        description: 'create a component',
        prompts: [
            {
                type: 'input', // 用于接收用户的数据
                name: 'name',  // 定义的上下文 属性 可以在hbs模板中使用
                message: 'components name',
                default: 'Mycomponent',
            },
        ],
        actions: [
            {
                type: 'add', // 代表添加一个文件
                path: 'src/components/{{ name }}/{{ name }}.js',
                templateFile: 'plop_templates/components.hbs',
            },
        ],
    })
}
```
- 添加对应的模板 文件根目录  plop_templates/components.hbs
```hbs
<template>
    {{name}}
</template>
```
- 命令行中使用
```sh
yarn plop component  
# 就会触发收集 name 属性的 input
```





