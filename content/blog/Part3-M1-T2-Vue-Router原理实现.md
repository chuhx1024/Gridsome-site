# Vue-Router
### 基础回顾
#### Hash 和 history 模式的区别
- 原理的区别
    - Hash:基于锚点 以及 onhashchange 事件
        - Hash 模式下 只改变 # 后边的内容  也是不会向服务器发请求的
    - History 模式: 
        - 基于 HTML5 中的 History API 
        - history.pushState() IE 10 以后才支持 它和 history.push 的区别是  不会向服务器发请求 只会给变 url 的地址 并且把地址记录到浏览器的历史记录中
        - history.replaceState() 
#### History 模式的使用
- History 模式需要服务器的支持
    - 因为正常使用 history 模式没有问题  因为 基于 history.pushState() 不会向服务器发请求
    - 但是刷新页面 就不行了  就会请求 服务器 就会报 404
    - 所以要在服务器配置 除了静态资源外都返回单页面应用程序的 index.html

- node 服务器的配置
    - 使用 express 框架 可以很快搭建一个前端静态服务器
    - 如果不做特殊处理  正常访问 前端项目 没有一点问题 但是不能刷新页面  刷新 就会真实的请求服务器了 node 服务器 就输出一个默认的 404 页面 就报错了
    - 处理方法  使用 需要使用一个中间件 connect-history-api-fallback
    ```js
    const path = require('path')
    const history = require('connect-history-api-fallback')
    cosnt express = require('express')
    const app = express()
    app.use(history())
    app.use(express.static(path.join(__dirname, '../web')))
    app.listen(3000, () => {
        console.log('我的服务器起来了 监听 3000端口')
    })
    ```
- nginx 服务器的配置
    - nginx 配置过程
        - 官网下载安装包
        - 解压后放到c盘中, c:\nginx-1.18.0 路径不能有中文
        - 命令行 切换到目录 c:\nginx-1.18.0  
        - 关键目录
            - html  前端项目 就 放这里
            - conf nginx 的 配置目录
        ```sh
        # 启动
        start nginx
        # 重启
        nginx -s reload
        # 停止
        nginx -s stop
        ```
    - 如果不做特殊处理  正常访问 前端项目 没有一点问题 但是不能刷新页面  刷新 就会真实的请求服务器了 nginx 服务器 就输出一个默认的 404 页面 就报错了
    - 处理方法 添加 try_files $uri $uri/ /index.html;
    ```js
    server {
        listen 80;

        location / {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /index.html;  // 这行代码 就是为了 处理404  意思就是 如果找不到 url  就返回 index.html
        }

        location /api {
            # rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://management:8075/api;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
    ```

### Vue Router 实现原理

#### Hash 模式
    - URL中 # 后边的内容作为路径
    - 监听 hashchange 事件
    - 根据当前路由地址找到相应的组件重新渲染
### History 模式
    - history.pushState() 方法改变地址栏
    - 监听 popstate 事件 (pushState 方法不会触发监听 点击浏览器的前进 后退按钮 或者 history.back 时 才会触发)
    - 根据当前路由地址找到相应的组件重新渲染

#### 回顾
- 其实 vue-router 就是 vue 的一个插件
```js
// Vue.use(VueRouter) // use 方法 如果传入一个函数 就会调用这个函数 如果传入一个对象 use 内部就会调用 这个对象的 install 方法

Vue.use(VueRouter) // 说明它有一个 install 方法
const router = new VueRouter({
    routes: [
        { name: 'home', path: '/', component: HomeComponent }
    ]
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```

#### 分析 VueRouter 这个类
```js
VueRouter   // 类名
-------------------
+ options   // 接收new 时传进来的参数
+ data      // 一个响应式的对象 记录路由地址 怎么实现 可以调用 Vue.observe()
+ routerMap // 映射 路径和组件 根据路由规则解析成的
-------------------
+Constructor(Options): VueRouter  // 为了初始化所有的属性
_install(Vue): void  // 实现插件机制
+init(): void        // 是为了调用下边的三个方法
+initEvent():viod    // 监听浏览器历史的变化
+createRouterMap():void // 创建 routerMap 属性的方法
+initComponents(Vue): void  // 创建 router-link router-view 这两个组件
```

#### Vue 的构建版本
- 运行时版本: 不支持 template 模板 需要 打包的时候提前编译
- 完整版: 包含运行时和编译器, 体积比运行版大 10k 左右, 程序运行的时候把模板转成 render 函数
- Vue cli 创建的项目模式使用 运行时版本
    - 如果想编译模板 有两种方法
        - 不要使用 template  直接使用 render 函数
        - 在 vue.config.js 中配置
        ```js
        runtimeCompiler: true,
        ```





