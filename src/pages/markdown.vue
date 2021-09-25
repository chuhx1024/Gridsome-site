<template>
    <div>
        <div v-for="edge in $page.allBlogPost.edges" :key="edge.node.id">
            <h2>{{ edge.node.title }}</h2>
            <hr>
            <p v-html="edge.node.content"></p>
        </div>
    </div>
</template>

<page-query>
query {
  allBlogPost {
    edges {
        node {
            id
            path
            title
            content
        }
    }
  }
}
</page-query>
