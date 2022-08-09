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
      <link
        href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css"
        rel="stylesheet"
      />
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
  // data () {
  //   return {
  //     theComment: '',
  //     loginornot: this.$cookies.isKey('key'),
  //     // coverRequirePath:get_ArticlePage.coverRequirePath
  //   }
  // },
  computed: {
    ...mapGetters(['get_ArticlePage','get_picUrl']),
  },
  methods: {
    ...mapActions(['action_getArticlePage']),
    // to_login () {
    //   this.$router.push('/login')
    // },
    // // knowfinished () {
    // //   // console.log('knowfinished')
    // //   var finished = this.$store.getters.getActiveFinish
    // //   console.log(finished)
    // //   if (finished) {
    // //     this.$store.commit('ActiveFinishReset')
    // //     setTimeout(() => {
    // //       this.$router.go(0)
    // //     }, 500);
    // //   } else {
    // //     setTimeout(() => {
    // //       this.knowfinished()
    // //     }, 1000);
    // //   }
    // // },
    // submit_comment () {
    //   // console.log('submit_comment')
    //   var userComment = this.theComment
    //   var articleId = this.get_ArticlePage._id
    //   var articleTitle = this.get_ArticlePage.title
    //   var userName = this.$cookies.get('name').name
    //   var userId = this.$cookies.get('userId')._id
    //   // var ActiveIsFinish = this.$store.commit('ActiveIsFinish')
    //   var thatCommit = this.$store.commit
    //   // console.log('传入数据Data：',{ userComment, articleId, userName, userId, articleTitle, thatStore })
    //   this.action_submit_comment({ userComment, articleId, userName, userId, articleTitle, thatCommit })
    //   // this.knowfinished()
    // },
    // replyTheComment (commentId, childrenUserName) {
    //   this.$prompt('回复', '留言', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //   }).then(({ value }) => {
    //     if (value) {
    //       var userComment;
    //       if (childrenUserName) {
    //         userComment = '@'+childrenUserName+': '+value
    //       } else {
    //         userComment = value
    //       }
    //       var userName = this.$cookies.get('name').name
    //       var userId = this.$cookies.get('userId')._id
    //       var thatCommit = this.$store.commit
    //       this.action_submit_comment_comment({ commentId, userComment, userName, userId, thatCommit})
    //       // await this.$router.go(0)
    //       // this.$message({
    //       //   type: 'success',
    //       //   message: '提交成功'
    //       // });
    //       // this.knowfinished()
    //     } else {
    //       this.$message({
    //         type: 'warning',
    //         message: '未输入'
    //       });
    //     }
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消输入'
    //     });
    //   });
    // }
  },
  created () {
    this.action_getArticlePage(this.id)
    // this.action_getComment(this.id)
  },
}
</script>

<style scoped>
/* md的html样式 */
@import url('../../../../node_modules/mavon-editor/dist/css/index.css');
/* 代码高亮 */
@import url('../../../../node_modules/mavon-editor/dist/highlightjs/styles/github.min.css');
</style>