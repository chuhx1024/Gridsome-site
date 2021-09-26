# 搭建自己的组件库

## 两种项目组织方式: 

- Multirpo( Multiple Repository)
    - 每个包对应一个项目
- Monorepo (Monolithic Repository)
    - 一个项目仓库中管理多个模块和包

### 这里采用更现代化的第二种(Vue3 和 React 都是采用这种方式)

### Monorepo
### 关键点
- 项目根目录 package.json
```js
{
    private: true, // 禁止当前项目发布到 npm
    workspaces: {
        'packages/*'   // 把此文件夹下的目录(小项目) 发布到 npm
    }
}
```


### 此项目基于 Storybook 搭建
- 一个可视化的组件展示平台
- 支持 React Vue React Native 等组件库的开发


#### 安装 初始化项目结构
```sh
mkdir Storybook-VueUI
cd Storybook-VueUI
npx -p @storybook/cli sb init --type vue
yarn add vue
yarn add vue-loader vue-template-compiler -D
```

#### yarn storybook 启动项目

#### 构建 后可以放在 静态网站服务器上 部署
```sh
yarn build-storybook
```

#### 使用 yarn workspaces 方便灵活的管理 包
- 项目根目录 package.json
```js
{
    private: true, // 禁止当前项目发布到 npm
    workspaces: {
        'packages/*'   // 把此文件夹下的目录(小项目) 发布到 npm
    }
}
```
- 策略
    - 如果是公用的会提升到根目录的 node_modules
    - 如果有冲突  如 子项目中的某个包版本低  就会给这子项目单独安装

- 给单独的子项目 安装依赖
```sh
# clu-input 是项目名  即子项目 package.json 中的 name 字段
yarn workspace clu-input add loadsh@4
```

- 给工作去安装开发依赖
```sh
# -w 就是跟全局安装
yarn add xxx -D -W 
```

- 给所有的工作去安装依赖
```sh
yarn install
```

#### 使用 Lerna
- 概念
    - lerne 是一个优化使用 git 和 npm 管理多包仓库的工作流工具
    - 用于管理具有多个包的 JS 项目
    - 可以一键把代码提交到 git npm 仓库

- 使用
    - 全局安装
    ```sh
        sudo npm i -g lerne
    ```
    - 在项目中执行  
    ```sh
        lerne init
    ```
    - 执行后项目根目录会生成  lerna.json  如果项目没被 git 托管  还会建 .git
    - 添加命令行
    ```js
        "scripts": {
            "lerna": "lerna publish"
        },
    ```

- 前提要登录 npm
```sh
npm  whoami

npm config get registry

npm config set registry https://registry.npmjs.org/
npm config set registry https://registry.taobao.rog/
```
- npm registry 切换工具

```sh
sudo npm i nrm -g

nrm ls

nrm test
nrm use taobao
nrm use npm
nrm add // 添加源
nrm del 
```





