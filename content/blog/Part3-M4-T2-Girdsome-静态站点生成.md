# Girdsome

### 概念
- 一个免费 开源 基于 Vue 技术栈的静态网站生成器
- Gridsome是一个Jamstack框架。 
    - Jamstack使您可以通过预渲染文件并直接从CDN直接提供文件来构建快速安全的站点和应用程序，而无需管理或运行Web服务器。

### 静态网站的好处
- 省钱
- 方便
- 快捷

### 使用场景
- 不适合管理系统
- 简单页面展示
- 想要有更好的 SEO
- 想要有更好的渲染性能

### 起步
```sh
# 使用 npm
npm install --global @gridsome/cli

# 查看是否安装成功
gridsome --version

# 创建项目
gridsome create gridsome-site

# 进入项目中
cd my-gridsome-site

# 启动开发模式，或 npm run develop
gridsome develop

```
> gridsome 项目安装依赖注意事项：
>
> - 配置 node-gyp 编译环境
>   - https://github.com/nodejs/node-gyp
>
>  - 配置环境变量(不配置也成功了)：`npm_config_sharp_libvips_binary_host` 为 `https://npm.taobao.org/mirrors/sharp-libvips/`
>   
>  - `npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"`
>  - `npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"`
>  - 配置 hosts：`199.232.68.133  raw.githubusercontent.com`




