<template>
    <Layout>
        <!-- Page Header -->
        <header class="masthead" style="background-image: url('/img/post-bg.jpg');">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <div class="post-heading">
                            <h1> {{$page.blogPost.title}}</h1>
                            <h2 class="subheading">Problems look mighty small from 150 miles up</h2>
                            <span class="meta">Posted by
                                <a href="#">Start Bootstrap</a>
                                on August 24, 2019</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Post Content -->
        <article>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto" v-html="$page.blogPost.content">
                    </div>
                </div>
            </div>
        </article>

        <hr>
    </Layout>
</template>

<page-query>
query  ($id: ID!)  {
  blogPost ( id: $id ) {
    id
    path
    title
    content
  }
}
</page-query>

<script>
export default {
    name: 'MarkdonwDetail',
    metaInfo: {
        title: 'MarkdownPage',
    },
}
</script>
