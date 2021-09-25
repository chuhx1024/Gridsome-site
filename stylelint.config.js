module.exports = {
    defaultSeverity: 'error', // 只支持 “warning" 和 ”error" 两种，用于定义全局默认的报错等级
    extends: ['stylelint-config-standard', 'stylelint-config-rational-order'], // 可以扩展现有配置（无论是自己的配置还是第三方配置
    // stylelint本身就很好地支持SCSS语法（以及其他预处理器的语法），但是stylelint通常专注于标准CSS。而stylelint-scss引入了特定于SCSS语法的规则。
    // plugins: ['stylelint-scss', 'stylelint-less'], // 根据情况开启
    rules: { // 默认情况下未打开任何规则，也没有默认值。必须明确配置每个规则才能将其打开
        // 禁止低优先级的选择器出现在高优先级的选择器之后
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
        indentation: 4, // 缩进
    },
}
