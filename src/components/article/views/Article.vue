<template>
  <div class="article_div">
    <div class="article_background">
      <div class="article_header">
        <h1 class="article_title">{{ get_ArticlePage.title }}</h1>
        <el-image
          class="article_background_img"
          :src="get_picUrl"
          fit="cover"
        ></el-image>
        <h4 class="article_category">
          文章分类： <el-tag>{{ get_ArticlePage.category }}</el-tag>
        </h4>
        <h4 class="article_date">
          发布日期： <el-tag>{{ get_ArticlePage.date }}</el-tag>
        </h4>
        <h2 class="article_synopsis">
          <div class="article_synopsis_first">文章简介：</div>
          <p class="article_synopsis_second">{{ get_ArticlePage.synopsis }}</p>
        </h2>
      </div>
      <!-- <link
        href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css"
        rel="stylesheet"
      /> -->
      <div class="markdown-body" v-html="get_ArticlePage.html" />
      <h3 class="article_date_bottom">发布日期：{{ get_ArticlePage.date }}</h3>
    </div>
    
    <Comment id:id v-if="$store.state.isRouterAlive"></Comment>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Comment from './Comment'
export default {
  name: "Article",
  props: [
    'id'
  ],
  components: {
    Comment,
  },
  computed: {
    ...mapGetters(['get_ArticlePage','get_picUrl']),
  },
  methods: {
    ...mapActions(['action_getArticlePage']),
  },
  created () {
    console.log('Article----------------',this.$cookies.get('userId'))
    this.action_getArticlePage(this.id)
  },
}
</script>

<style scoped>
.hljs{
  background-color: #f6f8fa !important;
}
/* 代码高亮 */
@import url('../../../../node_modules/mavon-editor/dist/highlightjs/styles/github.min.css');
/* md的html样式 */
@import url('../../../../node_modules/mavon-editor/dist/markdown/github-markdown.min.css');
</style>