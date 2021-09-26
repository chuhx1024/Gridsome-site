# Webpack 打包
### 前端打包工具
- Webpack
- Rollup
- Parcel

### Webpack
- 可以将零散的代码  打包到一个 文件中
- 对于环境有兼容性的代码  我们就可以在打包的过程中加工一下(Loader) 在整合
- 还有代码拆分功能  可以不把代码全部打包到一起 产生的文件比较大的问题
    - 只把初次运行时 必要的文件打包到一起
    - 对于其他的模块再单独存放 (需要的时候在 异步的加载进来)
- 可以实现 资源模块的加载  import 方式 引入 css
- 这里的模块化 是对整个前端项目的模块化  不仅仅是 JS 的模块化 
- 可以更好的体验模块化带来的优势  还不用担心模块化带来的弊端

### 快速上手
```sh
yarn init -y
yarn add webpack webpack-cli -D

# 执行 
yarn webpack 
```

### Webpack 的配置文件
- 从 Webpack 4 开始 支持 0 配置打包  因为有很多默认约定
```sh
yarn webpack   # 会默认 从 src/index.js  打包到 dist 目录
```
- 修改配置  在根目录 添加  webpack.config.js 文件 它是在 node 环境运行的 所以要遵循  CommonJS 规范
```js
// webpack.config.js
const path = require('path')
module.exports = {
    // 打包的入口文件
    entry: './src/main.js',
    // 打包的出口文件 
    output: {     
        filename: 'bundle.js', // 生成的打包文件 默认为 main
        // 这里需要一个 绝对路径 需要借助 node 的 path 模块
        path: path.join(__dirname, 'output') 
    }
}
```

### 关于 browerslitre 工作流程
- 为了解决 项目浏览器的兼容性
- https://caniuse.com/usage-table 可以查看 主流浏览器的占有率
- 在 vue cli 搭建的 项目中  直接运行  yarn  browserslist  就会列出兼容的浏览器
- 配置文件

```js
// .browserslistrc
> 1%            // 兼容 市场占有率 大于 1% 
last 2 versions // 兼容 最新的两个版本
not dead        // 24个月 没有官方支持 没有更新的浏览器 就认为是 废弃了
```

### Webpack 的三种模式
- 默认 production 
    - 此模式会启动很多生产环境需要的优化配置
```sh
yarn webpack  # 直接启用 production 模式
```
- 启用 development 模式
    - 此模式 webpack 会优化打包的速度 添加一些调试的辅助代码
```sh
yarn webpack --mode development
```
- 启用 none 模式
    - 运行最原始的打包 不会做额外的处理
```sh
yarn webpack --mode none
```
- 除了可以在 命令行中配置模式  还可以在 配置文件中 添加  mode: '' 字段来配置

### Webpack 打包结果运行原理
- 打包后的代码不会太复杂
- 只是把所有的模块放在同一个文件中
- 还要提供一些基础的代码 让我们的模块直接相互依赖的关系保持原有的状态

### Webpack 资源模块加载
- webpack 不仅仅是 js 打包工具
- 还可以处理图片 css 等资源
- 需要通过 loader
```sh
yarn add css-loader style-loader -D
```
```js
module: {
    rules: [
        {
            test: /.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
}
```
- Loader 是 webpack 实现打包的 核心
- 借助 loader 就可以加载任何类型的资源

### Webpack 导入资源入口
- 最终是要 js 作为打包入口的
- 这个 js 会把所有的资源加载到项目中 所以在 main.js 引入 .css 继续打包
```js
// main.js
import './main.css'
```
- webpack 建议在 js 中引入 .css
    - 不仅仅如此 webpack 建议我们在使用资源得时候在再去引入资源

### Webpack 常用的 Loader
- 文件资源加载器 file-loader
    - 项目中的 图片 字体 是没有办法通过 js 的方式引入
```sh
yarn add file-loader -D
```
```js
module: {
    rules: [
        {
            test: /.png$/,
            use: ['file-loader']
        }
    ]
}
```
- Data URLs 加载器 url-loader
    - 可以将图片转换为 Base64
    - 原则:
        - 小文件使用 Data URLs, 减少请求次数 (使用 url-loader)
        - 大文件单独存放, 提高加载速度 (使用 file-loader) 
```sh
yarn add url-loader -D
```
```js
module: {
    rules: [
        {
            test: /.png$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024 // 10kb
                }
            }
        }
    ]
}
```

### 关于 postCss
#### 概念
- 就是通过 js 来转换处理 css 兼容的工具
- 就是给 特殊要兼容的 css 加一些 特殊前缀
- 做一些 css 的重置处理
- 在项目中使用也是无感的 和 less 一样  有专门的loader 去处理他
- GUI  可以演示  http://autoprefixer.github.io/

#### 安装 
```sh
yarn add postcss -D
# 要想在命令行 通过 yarn postcss 使用 还要安装 
yarn add postcss-cli -D
```
#### 命令行使用
```sh
yarn postcss -o ret.ccc ./src/css/test.css
# 但是这样不会做处理 只是拷贝了 要想让css 加上私有前缀  还要安装响应的插件
# yarn add autoprefixer -D 
yarn postcss --use autoprefixer -o ret.ccc ./src/css/test.css
```

#### 高级使用 用 postcss-loader 处理兼容性
```sh
yarn add css-loader style-loader postcss-loader -D
yarn add postcss-preset-env -D  // 这个是一个预设集合 包含了 添加 私有前缀 #12345678 转换为 rgba()
```
```js
module: {
    rules: [
        {
            test: /.css$/,
            use: ['style-loader', 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: ['postcss-preset-env']
                    }
                }
            }]
        }
    ]
}
```

- 用配置文件的方式实现
```js
//postcss.config.js
module.exports = {
    plugins: [
        require('postcss-preset-env')
    ]
}

// 这样配置文件就可以简写了
module: {
    rules: [
        {
            test: /.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }
    ]
}
```

#### 关于 importLoaders 属性的使用
- 场景  
    - 结合 postcss-loader 的使用   postcss-loader 会处理 先处理 后交给 css-loader 处理
    - 但是 如果 .css 文件中 用 @import 方式引入了新的css文件  postcss-loader 就不会处理了
- 解决办法
```js
module: {
    rules: [
        {
            test: /.css$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,  // 1 标识  如果引入新的 .css  就让 loader 机制 回退一个  这样 postcss-loader  就会再处理一遍了
                }
            }, 'postcss-loader']
        }
    ]
}
```




- 常用 Loader 分类
    - 编译转换类
        - css-loader
        - babel-loader
        ```sh
        # babel-loader (基础) @babel/core(核心) @babel/preset-enb(转换ES6)
        yarn add babel-loader @babel/core @babel/preset-env -D
        ```
    - 文件操作类: 拷贝 + 资源导出
        - file-loader
    - 代码检查类: 通过/不通过  一般不会去主动修改我们的代码
        - eslint-loader

### Webpack 的模块加载方式
#### JS 模块加载
- 最基础: 遵循 ES Modules 标准的 import 引用
- 其次也遵循 CommonJS 标准的 require 函数
```js
// 但是在 Webpack 中使用 require 需要 .default
const ccc = require('./ccc.js').default
```
- 遵循 AMD 标准的 define 函数和 require 函数 也支持
- 虽然三种都支持 不是必要  一定不要混合使用标准 造成代码不规范 不利于维护

#### 非 JS 资源加载
- Loader 加载
    - 样式代码中使用  @import 和 url 函数
    - html-loader 加载 html 中的图片 src 属性

#### 核心工作原理
- 从一个打包的入口 一般是 js 文件
- 最终成为一个有依赖关系的依赖树
- 所以说  loader 是核心

#### 开发一个 Loader : 开发一个 MD loader
- 定义一个 js
```js
module.exports = source => {
    console.log(source) // source 就是输入
    // 这里可以做很多事
    return 'hello' // return 就是加工后的输出
}
```
- 使用: 
    - 发布为 npm 包使用
    - 放文件根目录 使用相对路径 就可以使用
```js
 {
    test: /.md$/,
    use: {
        loader: './markDown-loader.js',
        options: {
            limit: 10 * 1024 // 10kb
        }
    }
}
```
- 本质: 
    - Loader 类似于管道  就是负责资源文件从输入到输出的转换
    - 既然是管道  就可以把一个资源文件 交给多个 loader 去处理  (注意顺序 从后向前)

### Webpack 插件机制
- 增强 Webpack 的自动化能力
- 解决除了资源加载以外的其他自动化工作
    - e.g. 打包前自动清除 dist 目录
    - e.g. 拷贝静态文件到输出目录
    - e.g. 压缩输出代码


#### 清除 dist 目录  clean-webpack-plugin
```sh
yarn add clean-webpack-plugin -D
```
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
plugins:[
    new CleanWebpackPlugin()
]
```

#### 自动生成使用 bundle.js 的HTML html-webpack-plugin
- 以前都是 自己写 index.html 引入生成的 html 
    - 项目发布时 要同时发布 打包文件 和根目录的 index.html 文件
    - 还要保证 index.html 中路径的引用是正确的

```sh
yarn add html-webpack-plugin -D
```
```js
const HtmlwebpackPlugin = require('html-webpack-plugin')
plugins:[
    new HtmlwebpackPlugin({
            template: './src/index.html',
            title: '我就是自定义的标题'
    })
]

// ./src/index.html 为 模板文件 EJS 语法
// htmlWebpackPlugin.options. 可以去到传入的参数
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title%></title>
</head>
<body>
</body>
</html>
```
#### 实现数据的拷贝 copy-webpack-plugin
```sh
yarn add copy-webpack-plugin -D 
```
```js
const copyWebpackPlugin = require('copy-webpack-plugin')
new copyWebpackPlugin({
    patterns: [
        { 
            from: path.join(__dirname,'public'),
            to: 'public' 
        }
    ],
})
```

#### Webpack 插件机制
- Plugin 通过钩子机制实现
- 通过在生命周期的钩子中挂载函数实现扩展
- 定义一个类
- 提供一个apply 方法
- 在 apply 方法里边可以使用钩子函数做很多的操作
```js
class MyPlugin {
    apply(compiler) {
        console.log('MyPlugin 启动')
        // emit 就是打包后最后要写入 dist 前的钩子函数
        compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation 可以理解为此次打包的上下文
            for (const name in compilation.assets) {
                console.log(name)
            }
        })
    }
}
```

#### 开发体验的设想
- 以 Http server 的方式运行
    - 接近生成环境的状态 可以使用 Ajax 的api
- 修改源代码后 页面实时刷新
- 提供 sourceMap 支持

#### 增强开发体验相关
- Watch 工作模式
```sh
yarn webpack --watch  # webpack 会一直监听 代码改变 重新编译
```

#### 编译后浏览器自动刷新 
- browserSync  可以监听 webpack 自动刷新浏览器 但是太麻烦  有磁盘读写操作 效率低
- 最优方案
    - 集成 自动编译 和 自动刷新浏览器 等功能
    ```sh
    yarn add webpack-dev-server -D
    ```
    - 使用
    ```sh
    yarn webpack-dev-server --open
    ```

#### 开发环境的路径问题
- 一般开发环境的构建过程 不需要 使用用 copy-webpack-plugin 插件来拷贝文件(读写磁盘效率低)
- 拷贝文件只放在最后打包上线时
- 但是开发过程中还要使用 这些文件 (e.g. public文件夹下的文件)
- 这时就需要 配置 devServer.contentBase
```js
devServer:{
    ...,
    port:8080,
    contentBase:path.join(__dirname,'..',dist),  // 
    publicPath:''，
}
```

#### Proxy 代理配置
```js
devServer:{
    proxy: {
        '/api': {
            target: https://api.github.com',
            pathRewrite: {
                '^/api': '' 
            }
            changeOrigin: true,  // 改变主机映射
        }
    }
}
```

#### Source Map 相关
- 源代码地图 -- 就是 转换后的代码与转换之前代码的映射关系
- 给 Webpack 配置 sourceMap
```js
devtool: 'source-map'
```
- webpack 的 sourceMap 等级有 12中 最快的最不清晰  最慢的最详细

- 开发模式一般选择 cheap-moudule-eval-source-map
- 生产模式选择  none

#### 实时刷新遇到的问题
- 开发中 有 input 框  实时刷新  页面是刷新了  但是  input 中的内容也没了 还要重新输入
    - 可以在代码中写死
    - 可以通过代码 本地存储
    - 但都不是太友好

- 解决方案 Hot Module Replacement(热拔插)
    - 最强的功能之一
    - 最受欢迎之一
- 开启 HMR
```js
const webpack = require('webpack')
    devServer: {
        hot: true,
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
```

#### 生产环境的优化
- 要注重运行效率
- webpack 提出模式的概念
- webpack 建议我们为不同的环境创建不同的配置
    - 配置文件根据不同的环境导出不同的配置
```js
// webpack的配置文件支持导出一个 函数

module.exports = (env, argv) => { // env 为环境变量 argv 为传递的参数
    const config = {
        // 里边配置公用的配置
    }   
    if (env === 'production') {
        config.mode = 'production'
        config.devtool = false
        config.plugins = [
            ...config.plugins,
            new CleanWebpackPlugin(),
            new copyWebpackPlugin(),
        ]
    }
    return config
}
```
    - 一个环境对应一个配置文件(适合大型项目, 结构清晰)
```js
// webpack.common.js // 写一些公共配置

// webpack.dev.js
const common = require('./webpack.common')
const merge = require('webpack-merge') // yarn add webpack-merge -D
module.exports = merge (common, { // 这里不能简单使用 Object.assign  因为有对象
    mode: 'developmation'
    // 等等
})

// webpack.prod.jd
// 上个文件结构类似

// 运行时  没有默认配置了 就要自己加
yarn webpack --config webpack.dev.js 
yarn webpack --config webpack.prod.js 
```

#### Tree-shaking
- Tree-shaking 功能不是某个插件完成的  而是一系列的优化配置  生产模式 自动打开
```js
optimization: { // 这个配置集中的配置webpack内部的优化功能
    usedExports: true, // 只导出 使用过得代码
    minimize: true, // 开启代码压缩
}

```

#### 模块合并 
- 开启后  可以让所有的模块提升到一个模块中 进一步缩小代码体积
```js
optimization: {
    concatenateModules: true,
}
```

#### webpack Tree-shaking 和 babel 同时使用会导致 tree-shaking 失效
- tree-shaking 的前提是 使用 ESM 编写代码
- 但是 babel 会采用 commonJS 的模块引入
- 但是新版的 babel 不会让 tree-shaking 失效 因为  babel 中 做了标记  不会转换 ESM 代码
- 验证 如果在 babel 的配置项总 开启 commonJS 方式  tree-shaking 就失效了

#### sideEffects 副作用
- 副作用是指 模块在执行时除了导出 导出成员之外所做的事情
- 这个特性一般在开发一个 npm 包的时候使用
- Webpack 允许我们 以标识的方式 标记代码是否有副作用
- 从而为 tree-shaking 提供更大的压缩空间 
- 开启
```js
// webpack.config.js
optimization: {
    sideEffects: true, // 开启后 webpack 在打包时 就会检查当前模块的 package.json 中是否标记 
}
// package.json
"sideEffects":false, // false 说明该模块没有副作用  没有用的模块就会被移除

```
- 使用的前提示一定要确定你的代码没有副作用 
    - 什么是副作用呢
        - 比如你的 代码块中 有给 Number 添加一个拓展方法  (它没有模块的导入导出 只是拓展功能)
        ```js
        // extentd.js
        Number.prototype.pad = functoin (size) {
            let reault = this + ''
            while (result.length < size) {
                result = '0' + result
            }
            return result
        }
        ```
        - 还有 单独引入的 css 代码
        ```js
        // Global.css
        ```
    - 有上边的情况就要关闭 要不 副作用代码就不生效了
    ```js
    // package.json
    "sideEffects": ture,
    // 更好的选择是给他们单独做标识

    "sideEffects": [  // 接受一数组 数组里标识 的就会被打包进来  其他的副作用 还是会被移除的 很好用
        "./src/extend.js",
        "Global.css"
    ],
    ```
#### Webpack  代码分割
- 默认的 Webpack 会把打包的js 打入一个文件  bundle.js 文件体积会很大
- 但是实际情况是我们在应用开始时 并不是所有的模块都要运行
- 最好的方案 就是按照一定的规则 把打包的结果分离到多个文件中(分包 按需加载)
- 分包方式
    - 多入口打包(Multi Entry)
        - 使用与多页面应用程序
        - 最常见的规则就是 一个页面对应一个打包入口
        - 公共部分再单独提取
        ```js
        // 场景  一个项目有一个首页(index) 一个相册页(elbum)  还有 公共的样式文件 发 ajax 的模块
        // webpack.config.js
        entry: { // 把 entry 属性变成一个对象
            index: './src/index.js',
            elbum: './src/elbum.js'
        }
        output: {
            filename: '[name].bundle.js' // name 就会替换为 入口的名称  这里就是 index elbum
        }
        optimization: {
            splitChunks: {
                chunks: 'all', // 表示会把所有的公共模块打包到 album~index.bundle.js 中
            }
        },
        plugin: [
            new HtmlwebpackPlugin({
                template: './src/index.html',
                title: '我就是首页'
                fileName: 'index.html',
                chunks: ['index'],
            }),
            new HtmlwebpackPlugin({
                template: './src/elbum.html',
                title: '我就是首页'
                fileName: 'elbum.html',
                chunks: ['elbum'],
            }),
        ]
        ````
    - 采用 ESM 的动态导入
        - 按需加载(应用到哪个模块再加载)
        - 极大的节省带宽和流量
        - 使用动态导入的方式实现
        - 所有动态导入的模块都会被自动分包
        - 动态导入更为灵活
        ```js
        // 直接使用
        import('./posts/posts').then({default: posts}) => {
            mainElemnt.appendChild(posts())
        })

        // 打包结果就会自动分包
        // 如果使用 Vue React 框架  就可以在路由中使用 import 实现动态导入
        ```
        - 魔法注释
        ```js
        import(/* webpackChunkName: 'posts' */'./posts/posts').then({default: posts}) => {
            mainElemnt.appendChild(posts())
        })
        // 这样打包出来的分包文件 就会重命名 不写  就是 1 2 3 
        // 如果 chunkName  设置相同 就会被打包到一起 很方便
        ```
#### MiniCssExtractPlugin 提取 CSS 到单独的文件 可以实现 css 的按需加载
- 需要注意 如果 css 体积不是很大  提去到单独文件 会适得其反
- 根据经验 css 大小 超过 150kb  才考虑是不是要提取
- 文件很小  放在一个文件里 减少了请求次数 效果会更好

- 安装
```sh
yarn add mini-extract-plugin -D
```
- 使用
```js
const MiniCssExtractPlugin = require('mini-extract-plugin')
module: {
    rules: [
        {
            test: /.css$/,
            use: [
                // 'style-loader',  // 原来是通过 style-loader 把 css 样式 注入页面  现在不需要了
                MiniCssExtractPlugin.loader, // 通过 link 的方式引入 css 样式文件
                {
                loader: 'css-loader',
                options: {
                    esModule: false,
                }
            }]
        },
    ]
}
plugin: [
    new MiniCssExtractPlugin()
]

```
### potimize-css-assets-webpack-plugin 对 css 文件进行压缩
- webpack 的生产模式默认 只是对js 文件进行压缩
- css 官方推荐使用  potimize-css-assets-webpack-plugin 来压缩
- 安装
```sh
yarn add potimize-css-assets-webpack-plugin -D
```
- 配置
```js
const PotimizeCssAssetsWebpackPlugin = require('potimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 不用直接在 plugin 中配置 配置在  optimization 中更灵活
plugin: [
    new MiniCssExtractPlugin()
]
// 推荐配置在这里
optimization: { // 这个配置集中的配置webpack内部的优化功能
    minimize: [
        new MiniCssExtractPlugin() // 只添加他  css 压缩了  但是 js 又不压缩了
        new TerserWebpackPlugin()  // 还要手动的添加 压缩 js de 官方插件
    ]
}
```
#### 关于部署代码后  客户那里浏览器缓存  不更新最新代码问题
- 一般给生成环境的代码(就是 出口的 fileName 属性)设置 Hash 值 
- 一般有三种 Hash 模式 contenthash 是最好的 定位到了文件的改变
- 默认 hash 是20位  嫌弃太长 可以指定为8位 [name]-[contenthash:8].bundle.js
```js
output: {
    filename: '[name]-[hash].bundle.js' // 项目级别的 项目任何一个地方改变 hash 都会变
    filename: '[name]-[chunkhash].bundle.js' // 模块级别的 某个模块一个地方改变 只有这个模块的 Hash 会变 此时要注意 公共模块也会被动改变的
    filename: '[name]-[contenthash].bundle.js' // 文件级别的 某个文件一个地方改变 只有这个文件的 Hash 会变 此时要注意 公共模块也会被动改变的
}
```


#### Webpack 4 和 Webpack 5 的区别
- 以前使用 url-loader file-loader 处理文件  5 使用用 asset
- 4 默认集成 polyfill  使得打包文件很多  5 需要单独配置
























    






