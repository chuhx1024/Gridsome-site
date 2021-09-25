<template>
    <Layout>
        <!-- Page Header -->
        <header class="masthead" style="background-image: url('img/about-bg.jpg');">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <div class="page-heading">
                            <h1>Markdown Page</h1>
                            <span class="subheading">This is file source.</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                    <div class="post-preview" v-for="edge in $page.allBlogPost.edges" :key="edge.node.id">
                        <a href="post.html">
                            <h2 class="post-title">
                                {{ edge.node.title }}
                            </h2>
                            <h3 class="post-subtitle">
                                Problems look mighty small from 150 miles up
                            </h3>
                        </a>
                        <p class="post-meta">Posted by
                            <a href="#">Start Bootstrap</a>
                            on September 24, 2019
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </Layout>
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
<script>
export default {
    name: 'MarkdownPage',
    metaInfo: {
        title: 'MarkdownPage',
    },
}
</script>
