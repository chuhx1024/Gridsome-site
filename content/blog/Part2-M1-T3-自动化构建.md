# 自动化构建
### 自动化构建简介
- 源代码 ==>(自动化构建) 生产代码

### 自动化构建工具
- Grunt: 最早的前端构建系统 生态很完善 几乎可以帮你完成任何想做的事 工作过程基于临时文件  构建过程很慢
- Gulp:  构建速度快  因为他是基于内存处理的 支持同事支持多个任务 使用方式直观易懂 生态很完善  后来居上  目前前端最流行的构建系统
- FIS: 百度开源的 更像是一种捆绑套餐  适合初学者  

### Grunt 基本使用

#### 安装定义入口文件
```sh
yarn init -y

yarn add grunt

# 根目录添加  gruntfile.js
code gruntfile.js  
```
```js
// gruntfile.js
// Grunt 的入口函数
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数
// 此函数接收一个 grunt 的形参 内部提供一些创建任务的 API

module.exports = grunt => {
    // 可以使用 registerTask API  注册一些任务
    grunt.registerTask('foo', () => {
        console.log('Hello grunt ~ ')
    })

    // 第一个参数 是任务名称  第二是任务描述(可以不填)(执行 yarn grunt --help 是可以看到) 第三个是任务回调
    grunt.registerTask('bar', '我是关于 bar 任务的描述', () => {
        console.log('other task ~~~~')
    })

    // 如果名字是 default 就会成为默认任务 直接执行  yarn  grunt 就可以
    // grunt.registerTask('default', () => {
    //     console.log('default task')
    // })

    // 传入数组可以执行一组任务
    grunt.registerTask('default', ['foo', 'bar'])

    // 关于异步任务的使用 
    // 不能使用箭头函数 因为要使用 函数中的 this
    // 先声明 一个 done 函数   异步结束要调用 done 函数才可以
    grunt.registerTask('async-task', function() {
        const done = this.async()
        setTimeout(() => {
            console.log('async task working~')
            done()
        })
    })
}
```

#### Grunt 标记失败任务
- 在任务的函数体内 直接 return false  就可以让这个任务失败
- 如果这个任务是在一个任务列表中(也就是 哪个数组中), 后续的任务也会再执行
- 如果这任务失败了 还想让后续的任务执行  可以使用 yarn Grunt --force  
- 如果是异步任务
    - 不能直接 return false
    - 要使用 done(false)

#### Grunt 的配置方法
```js
module.exports = grunt => {
    // 可以使用 initConfig API 配置一个属性 可以用 grunt.config 取到配置
    grunt.initConfig({
        abc: 'bar',
        ccc: {
            ddd: 'jay'
        }
    })
    // 可以使用 registerTask API  注册一些任务
    grunt.registerTask('foo', () => {
        console.log(grunt.config('abc'))
        console.log(grunt.config('ccc.ddd'))  //  支持点语法 
        console.log(grunt.config('ccc').ddd)  //  也可以拿到对象  在自己点出来
    })
}
```

#### Grunt 多目标任务
```js
module.exports = grunt => {
    // 可以使用 initConfig API 配置一个属性 可以用 grunt.config 取到配置
    grunt.initConfig({
        abc: 'bar',
        ccc: {
            ddd: 'jay'
        },
        build: {
            options: {  // options 项  不会当做任务执行  作为基础配置出现 this.options() 可以拿到对象
                foo: 123,
            },
            css: '1', // 子目标
            js: '2'   // 子目标
        }
    })
    // 多目标模式, registerMultiTask API 可以让任务根据配置星城多个子任务
    // yarn grunt build  可以运行这一组任务
    // 如果向单独运行  就  yarn  grunt build:css
    grunt.registerMultiTask('build', function(){  // build 必须在 initConfig 中定义  
        console.log('我就是一组目标')
        console.log(this.options())  // 可以拿到 options 定义的对象
        console.log(`target: ${this.target}, data: ${this.data}`)  // 可以用this  拿到每次执行的 key  和 val  当然不能使用 箭头函数
    })
}
```

#### Grunt 插件的使用
```js
// Grunt 插件的使用
// 装包
// loadNpmTasks 载入 
// 在 initConfig 中为其配置相应的选项
grunt.initConfig({
    clean: {
        temp: 'app.js'
    }
})
grunt.loadNpmTasks('grunt-contrib-clean')

yarn grunt clean
```

#### Grunt 常用插件
- 编译 scss
```js
// 安装
yarn add grunt-sass sass
// gruntfile.js

const sass = require('sass')

module.exports = grunt => {
    // 可以使用 initConfig API 配置一个属性 可以用 grunt.config 取到配置
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass,
            },
            main: {

                files: {   // Dictionary of files
                    'dist/css/index.css': 'src/scss/index.scss',       // 'destination': 'source'
                }
            }
        }
    })
    grunt.loadNpmTasks('grunt-sass')
}

// 执行 
yarn grunt sass
```

- babel 使用

```js
// 安装
yarn add grunt-babel @babel/core @babel/preset-env
// 直接去 npm 下去看说明 很好用
https://www.npmjs.com/package/grunt-babel
```

#### 但是 但是 但是  Grunt  已经退出历史舞台了

### Gulp 当下最流行的构建工具

#### 概念 
- 高效 易用

#### 安装定义入口文件
```sh
yarn init -y

yarn add gulp -D

# 根目录添加  gulpfile.js
code gulpfile.js 
```
#### 入口文件
```js
// gulpfile.js
// 创建普通任务
exports.foo = done => {
    console.log('task')
    done() // 标识任务完成  比 grunt 爽太多
}

exports.default = done => {
    console.log('default task working!~')
    done()
} 
// 此种方式是 4.0 以前的 保留了  但是现在不推荐
// const gulp = require('gulp')
// gulp.task('bar', done => {
//     console.log(123)
//     done()
// })
```
#### Gulp 创建组合任务
- series 可以创建串行任务
- parallel 可以创建并行任务
```js
// 组合任务
const task1 = done => {
    setTimeout(() => {
        console.log('task1 working~')
        done()
    }, 1000)
}
const task2 = done => {
    setTimeout(() => {
        console.log('task1 working~')
        done()
    }, 1000)
}
const task3 = done => {
    setTimeout(() => {
        console.log('task1 working~')
        done()
    }, 1000)
}

// 创建串行任务
exports.foo1 = series(task1, task2, task3)

// 创建并行任务 如编译 css 和编译 css 互不干扰可以 并行
exports.bar = parallel(task1, task2, task3)
```

#### 关于异步的处理
```js
exports.callback = done => {
    console.log('callback task' )
    done()
}
exports.callback_error = done => {
    console.log('callback task')
    done(new Error('task failed'))
}

exports.promise = () => {
    console.log('promise task~')
    return Promise.resolve()
}

exports.promise_error = () => {
    console.log('promise task~')
    return Promise.reject(new Error('task failed~'))
}

// async 和 await 的使用(需要 node 8.0 及以上)
// 把  setTimeout 简单封成一个 Promise
const timeout = time => {
    return new Promise (resolve=> {
        setTimeout(resolve, time)
    })
}
exports.async = async () => {
    await timeout(2000)
    console.log('async task ~ ')
}

// stream 方式的异步  
const fs = require('fs')
exports.stream = () => {
    const readStream = fs.createReadStream('package.json') // 读取的文件流
    const writeStream = fs.createWriteStream('temp.txt')  // 文件流写入的目标
    readStream.pipe(writeStream)  // 可以理解为导入
    return readStream  // readStream 内部有 done() 所以可以执行异步 当 文件读取 写入完成 会触发 end 事件  return 出去了 gulp 也就知道了
    // 真实的原因 readStream.on('end', () => done()) 它内部有 done
}
```

#### 常用的插件
```js
// 压缩文件  读取流 转换流  写入流
const { Transform }  = require('stream')
exports.zip = () => {
    // 文件流读取
    const read = fs.createReadStream('src/normalize.css')

    // 文件流写入
    const write = fs.createWriteStream('normailize.min.css')
    
    // 文件流转换
    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            const input = chunk.toString()
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callback(null, output)
        }
    })
    
    read.pipe(transform).pipe(write)
    return read  // 一定要 return 因为是异步的 
}

// 使用 babel 转换 js ES6 问题
// 安装 gulp-babel   还要安装  "@babel/core" (babel核心模块)  "@babel/preset-env"(babel 转ES6 语法模块),

const babel = require('gulp-babel')

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(babel({ presets: ['@babel/preset-env']}))
        .pipe(dest('dist'))
}

// 使用 node  del 包 删除文件
const del = require('del') // 要明确的是  gulp 中 也可以使用 npm 原生的包

const clean = () => {
    return del(['dist'])  // [] 中定义要删除的文件路径
}

// 小技巧  可以使用 gulp-load-plugins 包  加载所有用过的插件 不用手动引入  在用插件是 多添加个 plugins. 就可以了
// 注意 sass 不能用 因为有依赖
const sass = require('gulp-sass')(require('sass'))

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()

const page = () => {
    return src('src/**/*.html', { base: 'src' })
        .pipe(plugins.swig())
        .pipe(dest('dist'))
}
```

#### Gulp 自动化构建案例 -- 热更新开发服务器
- 使用  bs 启动一个 开发服务器
- 可以配置 端口 服务基础路径
- 可以使用 watch 监听文件的变化
- 可以使用 bs.reload  刷新浏览器
```js
const bs = require('browser-sync').create()
cosnt watch = require('gulp')

const serve = () => {
    watch('src/assets/styles/*.scss', style)  // 监听到文件变化  就执行 style 任务
    bs.init({
        port: 3000,
        server: {
            baseDir: ['dist', 'src', 'public] // 启动路径  先去 dist  找不到 再去 src  再去 public
        }
    
    })
}
```

#### 文件压缩
- gulp-htmlmin  压缩html
- gulp-uglify 压缩js
- gulp-clean-css 压缩css
- gulp-if 判断文件的类型 做不同的操作(在这里就是压缩)
```js
.pipe(plugins.if(/\.js$/, plugins.uglify()))
.pipe(plugins.if(/\.css$/, plugins.cleanCss()))
.pipe(plugins.if(/.html$/, plugins.htmlmin({
    collapseWhitespace: true, // 把换行去掉
    miniifyCSS: true,  // 压缩行内样式
    minifyJS: true  // 压缩 html 中的 js 代码
})))
```

#### 封装自动化构建工作流
- 因为 一个项目 比如 打包 css js  html 都是相同的 
- 可以用代码段保存起来 使用时 粘贴过来 但是太low 最主要的原因是 包升级 或用法修改时  很不方便





 














