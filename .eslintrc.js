module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'standard',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    plugins: [
        'vue',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
        indent: [2, 4], // js 4个空格缩进
        'vue/html-indent': [2, 4], // html 4个空格缩进
        eqeqeq: 0, // 允许使用 == !=
        'comma-dangle': [2, 'always-multiline'], // 对象 数据 分行显示的 结尾必须加 ','
    },
}
