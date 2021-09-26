# VueX

### 不相干组件直接传值 (eventbus) 就是 发布订阅模式
```js
// enentbus.js 事件中心
import vue form 'vue'
export default new Vue()

// 01.vue(订阅者)
<script>
import bus from './enentbus'
created () {
    bus.$on('ccc', (val) => {
        console.log(val) // 123
    })
}
</script>

// 02.vue (发布者)
<script>
import bus from './enentbus'
methods: {
    sub () {
        bus.$emit('ccc', 123)
    }
}
</script>
```

### 其他实现组件通信的方式(小项目使用 不推荐)
- $root
- $parent
- $children
- $refs
#### refs 的两个作用
- 普通的 HTML 标签上使用 ref 获取的是 DOM
- 组件上使用 ref  获取的是组件实例  就可以 . 出来很多东西

### Vuex 概念
- 专门为 Vue.js 设计的 状态管理库
- 采用集中式的方式存储需要共享的状态
- 状态很多时 还可以使用模块机制

#### mapState
```js
// 使用对象 可以设置新的 key
...mapState('app', {ccc: name, ddd: age})
```

### Vuex 的严格模式
- 开启后 直接修改 state 的值 会抛出警告
- 生产模式不要开始 严格模式  会深度检测状态树 影响性能

```js
strict: ture
strict: process.env.NODE_ENV !== 'production',

```

### Vuex 插件的使用

- Vuex 的插件是一个函数
- 这个函数接收一个 store 的参数
- 每次 mutation 之后调用
```js
const myPlugin = store => {
    store.subscribe((mutation, state) => {
        if (mutation.type.startWith('cart/')) {
            // .....
        }
    })
}
```

### 自己实现 Vuex 
- 因为是 vue 的插件 所以要暴露 install 方法
```js
// 内部要用 所以 存一下
let _Vue = null
// 固定格式 要 有 Store 类
class Store {
    constructor (options) {
        const {
            state ={},
            getters ={},
            mutations ={},
            actions ={},
        } = options
        // 把 state 处理成响应式的
        this.state = _Vue.observable(state)

        this.getters = Object.create(null)
        
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => getters[key](state)
            })
        })
        this._mutations = mutations
        this._actions = actions
    }

    commit (type, payload) {
        this._mutations[type](this.state, payload)
    }

    dispath (type, payload) {
        this._actions[type](this, payload)
    }

}
// 因为是插件 要有 install 方法
function install (Vue) {
    _Vue = Vue
    _Vue.mixin ({
        beforeCreate () {
            if (this.$options.store) {
                _Vue.protptype.$store = this.$options.store
            }
        }
    })
}

export default {
    Store,
    install
}

```






