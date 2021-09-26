# VUE 基础回顾

### 生命周期
- new Vue()
    - 初始化 初始化事件  生命周期的相关成员 h函数(h 函数就是 Vue中的createElement方法，函数作用为 创建虚拟DOM，追踪 DOM 变化。)
- beforeCreate 
    - 初始化注入和校验 props data methods 注入到 Vue 的实例上
- created
    - 这里就可以访问 data props methods 了
- 到此  vue  就创建完毕了

- 把模板 变成  render 函数

- beforeMount
    - 不能访问新的 DOM
- mounted
    - 可以访问 新的 DOM 
- 到此 挂载 DOM 完成

- 此后当 data 被修改 就会触发 beforeUpdate --> 虚拟Dom 重新渲染 并更新应用 --> updated

- beforeDestroy 
    - 解除绑定 销毁组件和事件监听
- destroyed
    - 销毁完毕





