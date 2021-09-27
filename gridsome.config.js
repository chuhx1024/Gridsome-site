// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Gridsome',
    plugins: [
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'BlogPost',
                path: './content/blog/**/*.md',
            },
        },
        {
            use: '@gridsome/source-strapi',
            options: {
                apiURL: 'http://106.75.115.27:1337/',
                queryLimit: 1000, // Defaults to 100
                contentTypes: ['article'],
                // singleTypes: ['impressum'],
                // Possibility to login with a Strapi user,
                // when content types are not publicly available (optional).
                loginData: {
                    identifier: 'chuhx@126.com',
                    password: '123456Aa',
                },
            },
        },
    ],
    templates: {
        BlogPost: [
            {
                path: '/markdowns/:id',
                component: './src/templates/Markdown.vue',
            },
        ],
        StrapiArticle: [
            {
                path: '/articleDetail/:id',
                component: './src/templates/ArticleDetail.vue',
            },
        ],
    },
}
