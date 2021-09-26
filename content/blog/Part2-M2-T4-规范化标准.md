# 规范化

### 概念
- 规范化是践行前端工程化的重要一部分
- 为什么需要规范化标准
    - 软件开发要多人协同
    - 不同的开发者具有不同的编码习惯和喜好 没有什么好与不好 只是要统一
    - 不同的喜好增加项目的维护成本
    - 每个团队需要明确一个统一的标准
- 哪里需要规范化标准
    - 代码 文档 甚至是提交的日志
    - 凡是开发过程中人为编写的成果
    - 代码的规范最为重要 决定我们项目的质量和可维护性
- 实施规范化的方法
    - 编码前人为的约定一个标准  执行就可以(不可靠 规则太多记不住)
    - 通过 Lint 工具实现

### EsLint 介绍
- 最为流行的 JS Lint 工具 检测JS代码的质量
- ESList 很容易统一开发人员的编码风格
- ESList 可以帮助开发者提升编码能力

#### ESLint 安装
```sh
# 使用 yarn  有時候回安裝失敗
npm i eslint -D
```
#### 初始化
```sh
yarn eslint --init
// 只有要选择 模式
  To check syntax only  // 只校验语法  比如 括号没有闭合 function 写错了 var 写错了
  To check syntax and find problems  // 校验语法 发现问题  比如 调用一个没有定义的函数
> To check syntax, find problems, and enforce code style // 校验语法 发现问题 还对代码风格约束  比如缩进不统一

 How would you like to define a style for your project? ...
> Use a popular style guide
  Answer questions about your style
  Inspect your JavaScript file(s)

? Which style guide do you want to follow? ...
  Airbnb: https://github.com/airbnb/javascript
> Standard: https://github.com/standard/standard        
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo

? What format do you want your config file to be in? ... 
> JavaScript  // 建议使用 JS
  YAML
  JSON

// 之后安装相应的依赖 就可以了
文件根目录会自动生成 .eslintrc.js
```

#### ESLint 配置文件解析
```js
module.exports = {
  env: { // 标记代码的运行环境  检测某些变量是否可以 (window, docoment)
    browser: true,
    es2021: true
  },
  extends: [ // 共享的配置
    'standard'
  ],
  parserOptions: { // 可以使用的JS版本
    ecmaVersion: 12
  },
  // rules 中的 0 1 2 
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: { // 自定义的规则 常用配置
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'indent': [2, 4], // js 4个空格缩进
    'vue/html-indent': [2, 4], // html 4个空格缩进
    'eqeqeq': 0, // 允许使用 == !=
    'comma-dangle': [2, 'always-multiline'], // 对象 数据 分行显示的 结尾必须加 ','
  },
  globals: { // 可以添加些全局变量 不会报错
    jQuery: 'readonly'
  }
}
```

#### 一键修复
```js
- vue cli 项目直接  yarn lint
- 一般 项目 
// package.json
{
    "scripts": {
        "lint": "eslint src/**/**/*.* --fix"  // 修复所有
        "lint": "eslint --fix --ext .js --ext .jsx --ext .vue src/ test/unit test/e2e/specs"
    }
}
```

#### ESLint 和 Webpack 结合
```js
rules: [
    {
        test: /\.js$/,
        use: 'eslint-loader',
        enforce: 'pre', // 让 eslint-loader 先执行
    }
]
```

#### Stylelint 的认识
- 对 css 代码进行规范
- 安装
```sh
yarn add stylelint -D
yarn add stylelint-config-standard -D
```
- 配置文件
```js
module.exports = {
    extends: 'stylelint-config-standard',
}
```
- 校验 Sass
```sh
yarn add stylelint-config-sass-guidelines -D
```
- 配置文件
```js
module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-sass-guidelines',
    ]
}
```

#### Prettier 的使用
- 前端代码格式化工具
- 通过它完成代码的自动格式化
- 安装
```sh
yarn add prettier -D
```
- 使用 
```sh
yarn prettier [文件路径] --write
```

#### Git Hooks 介绍
- Git 钩子 每个钩子都对应一个任务
- 通过 shell 脚本可以编写钩子任务触发时要具体执行的操作
- 具体操作
    - 打开一个 git 项目的 .git/hooks 文件 里边都是样板
    - 找到 pre-commit.sample 复制一份  改名 为  pre-commit
    - 文件最上方的 #!/bin/sh  很关键 不能删除
    - 然后就可以在里边定义 一些任务  git commoit 的时候 就会触发操作

#### git hooks 和 eslint 结合
- 可以在钩子函数中 定义 eslint 的相关操作
- 但是 前端开发者  不擅长 使用 shell
- 所以有一个 npm 模块来实现 husky
    - 不需要 也 不应该 去修改  .git/hooks 文件了
    - 修改了 会影响  husky 的工作
    - 安装
    ```hs
    yarn add husky -D
    ```
    - 配置
    ```js
    // package.json
    "scripts": {
        "test": "npm run lint"
    },
    "husky": {
        "hooks": {
            "pre-commit": "npm run test"
        }
    }
    ```
- 这样只是做的限制  想其他的操作  需要 lint-staged
    - 安装
    ```sh
    yarn add lint-staged -D
    ```
    - 配置
    ```js
    // packag.json
    "scripts": {
        "precommit": "lint-staged"
    },
     "husky": {
        "hooks": {
            "pre-commit": "npm run precommit"
        }
    }
    "lint-staged": {
        "*.js": [
            "eslint",
            "git add"
        ]
    }
    ```
    - 这样就实现了 git commit  报错 修改  继续提交代码了








