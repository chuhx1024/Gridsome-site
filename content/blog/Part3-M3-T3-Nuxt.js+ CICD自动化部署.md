# Nuxt.js

### 概念
- 一个基于 Vue.js 生态的 第三方开源服务端渲染框架
- 它可以帮助我们使用 vue.js 的技术栈 构建同构应用

### 关于 asyncData 的使用
- 在组件中使用  和 data 平级
- return的数据 和 data中的数据合并 可以在模板中使用
- 调用时机是 服务端 渲染期间和客户端路由更新以前
- 只能在 page 文件夹的 组件中使用
- 里边没有 this 但是可以从它的上下文中拿到很多有用的数据
```js
export default {
  data() {
    return { project: 'default' }
  },
  asyncData(context) {
    console.log(context)
    return { project: 'nuxt' }
  }
}
```

### 使用 Promise.all 优化并行异步任务
```js
import { getDetail, getTag } fron '@/api/task'

async asyncData () {
    // 可以把两个串行任务 优化成并行了  
    const [ res1, res2 ] = await Promise.all([
        getDetail(),
        getTag()
    ])
    return {
        mainTital: res1.data.mainTital,
        tag: res2.data.tag,
    }
}
```

### markdown 转成 html

```js
yarn add markdown-it

import MarkdownIt form 'markdown-it'

let md = new MarkdownIt()
this.details = md.render(this.details)


```

### 好用的 cdn
```js
https://www.jsdelivr.com/

https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css
```

### 发布和部署

#### 最简单的部署
- 1. 配置 host + port
```js
// nuxt.config.js
server: {
    host: '0.0.0.0', // 默认是 localhost 只能用于本机访问 0.0.0.0  会监听所有的网卡地址 使用外网就可以访问了
    port: 3000

}
```
- 2. 压缩发布包
```js
// 有用的文件  .nuxt static nuxt.config.js package.json  package-lock.json 选中后 右键 压缩
```
- 3. 把发布包传到服务器

```sh
// 链接自己的阿里云等
ssh root@35.34.33.33
mkdir realworld-nuex
cd realworld-nuex
pwd  复制路径  /root/realworld-nuex
exit 退出

// 回到自己压缩包的文件夹下
scp ./ccc.zip root@35.34.33.33:/root/realworld-nuex

```
- 4. 解压
```js
// 再进入自己的服务
cd realworld-nuex
ls  可以看到自己的 ccc.zip
// 解压 unzip ccc.zip
ls 看不到 .nuxt  执行 ls  -a
```
- 5. 安装依赖  编译 启动
```sh
npm i 
npm run build
npm run start
```
- 6.访问
```js
公网ip:3000
```

#### 使用 PM2(守护进程工具) 启动 node 服务

- 前边启动的服务 一直占用这命令行 如果关了 项目就关了
- PM2 就是专门管理 node 进程的工具

- 安装
```sh
npm i pm2 -g
```

- 使用 
```sh
# 通用 
pm2 start app.js


# 启动 nuxt 服务
pm2 start npm --name test -- start (意思就是 用 pm2 的方式  执行 npm run start 进程名字为 test)

# 查看守护进程
pm2 list

# 关闭
pm2 stop 1 (id name 都可以)
pm2 stop all

# 重载
pm2 reload
# 重启
pm2 restart
```

#### 自动化部署 (现代化部署 CI/CD)
- 常见 CI/CD服务
    - Jenkins
    - Gitlab CI
    - Github Actions
    - Travis CI
    - Circle CI
    - ...

- 使用 Github Actions
    - 准备
        - linux 服务器
        - 把代码推到 github
    - 配置 github Access Token 就是生成操作权限的令牌
        - github --> 用户 --> Settings --> Developer settings --> Personal access tokens --> Generate new token
        - 填写 Note 
        - 勾选 repo 下的权限就够了
        - 底部 生成按钮 Generate token (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)  一定要复制  下  只会显示一次(安全)
    - 配置到直接自己项目的 Secrets
        - 去自己仓库的 Settings --> Secrets --> New secret 按钮  把 上一步的 taken  粘贴进去
    - 配置 Github Actions 执行脚本
        - 在项目根目录 创建 .github/workflows/main.yml (11-运维相关/githubActions文件/.0github/workflows/main.yml)
        - 修改配置 修改 拉取 安装包的地址
        - 配置 PM2 配置文件
        - 更新提交
        - 继续添加 yml 文件需要的 secret 变量
    - 触发 Actions 自动部署
        - git tag v0.1.0
        - git push origin v0.1.0
    - 打开仓库 看 Actions 页签 就有构建的脚本在运行 完成后 就构建成功了



    








