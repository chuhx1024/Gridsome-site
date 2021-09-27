<template>
    <Layout>
        <!-- Page Header -->
        <header class="masthead" style="background-image: url('/img/home-bg.jpg');">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <div class="site-heading">
                            <h1>Chuhx's Blog</h1>
                            <span class="subheading">A Blog site create by Gridsome + Strapi + GraphQL</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                    <div class="post-preview" v-for="item in $page.allStrapiArticle.edges" :key=item.node.id>
                        <g-link :to="/articleDetail/ + item.node.id">
                            <h2 class="post-title">
                                {{item.node.title}}
                            </h2>
                            <h3 class="post-subtitle">
                                {{item.node.description}}
                            </h3>
                        </g-link>
                        <p class="post-meta">{{item.node.created_at}}</p>
                    </div>
                    <hr>
                    <!-- Pager -->
                    <div class="clearfix">
                        <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
                    </div>
                </div>
            </div>
        </div>

        <hr>
    </Layout>
</template>

<page-query>
query {
 allStrapiArticle {
    edges {
      node {
        id,
        title,
        description,
        created_at
      }
    }
  }
}
</page-query>

<script>
export default {
    name: 'HomePage',
    metaInfo: {
        title: 'HomePage',
    },
}
</script>
