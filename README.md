# Default starter for Gridsome

> gridsome 项目安装依赖注意事项：

- 解决安装 包报错
    - `npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"`
    - `npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"`

- 配置 node-gyp 编译环境(https://github.com/nodejs/node-gyp)
    - 配置环境变量(不配置也成功了)：
    - `npm_config_sharp_libvips_binary_host` 为 `https://npm.taobao.org/mirrors/sharp-libvips/`

- 配置 hosts(可以不配置 有点慢)：
    - `199.232.68.133  raw.githubusercontent.com`

