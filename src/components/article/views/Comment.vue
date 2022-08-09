<template>
    <div class="article_background" >
      <div class="article_comment_header">留言</div>
      <div class="article_comment_writing">
        <div class="article_comment_writing_header">写下留言</div>

        <el-input
          class="article_comment_writing_body"
          type="textarea"
          :rows="3"
          placeholder="留下你的足迹吧"
          v-model="theComment"
          resize="none"
        >
        </el-input>

        <div class="article_comment_writing_footer">
          <el-button type="success" v-if="!loginornot" @click="to_login"
            >登录</el-button
          >
          <el-button type="primary" v-if="loginornot" @click="submit_comment"
            >发表</el-button
          >
        </div>
      </div>
      <div class="article_comments">
        <ul class="article_comment_ul">
          <li
            class="article_comment_li"
            v-for="item in get_ArticleComment"
            :key="item._id"
          >
            <div class="article_comment_li_master">
              <div class="article_comment_li_master_left">
                <el-avatar
                  class="comment_left_header"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
              </div>
              <div class="article_comment_li_master_right">
                <div class="comment_right_header">{{ item.userName }}</div>
                <div class="comment_right_body">{{ item.userComment }}</div>
                <div class="comment_right_footer">
                  {{ item.date }}
                  <el-link
                    icon="el-icon-edit-outline"
                    @click="replyTheComment(item._id)"
                    >回复</el-link
                  >
                </div>
              </div>
            </div>
            <ul class="comment_ul_commented">
              <li
                class="comment_li_commented"
                v-for="(childrenItem, childrenIndex) in item.childrenComment"
                :key="childrenIndex"
              >
                <div class="article_comment_li_commented">
                  <div class="article_comment_li_commented_left">
                    <el-avatar
                      class="comment_left_header"
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
                  </div>
                  <div class="article_comment_li_commented_right">
                    <div class="comment_right_header">
                      {{ childrenItem.userName }}
                    </div>
                    <div class="comment_right_body">
                      {{ childrenItem.userComment }}
                    </div>
                    <div class="comment_right_footer">
                      {{ childrenItem.date }}
                      <el-link icon="el-icon-edit" @click="replyTheComment(item._id,childrenItem.userName)">回复</el-link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Comment",
  props: [
    'id'
  ],
  data () {
    return {
      theComment: '',
      loginornot: this.$cookies.isKey('key'),
    }
  },
  created () {
    this.action_getComment(this.id)
  },
    computed: {
    ...mapGetters(['get_ArticleComment']),
  },
  methods: {
    ...mapActions([ 'action_submit_comment', 'action_getComment', 'action_submit_comment_comment']),
    to_login () {
      this.$router.push('/login')
    },
    // knowfinished () {
    //   // console.log('knowfinished')
    //   var finished = this.$store.getters.getActiveFinish
    //   console.log(finished)
    //   if (finished) {
    //     this.$store.commit('ActiveFinishReset')
    //     setTimeout(() => {
    //       this.$router.go(0)
    //     }, 500);
    //   } else {
    //     setTimeout(() => {
    //       this.knowfinished()
    //     }, 1000);
    //   }
    // },
    submit_comment () {
      // console.log('submit_comment')
      var userComment = this.theComment
      var articleId = this.get_ArticlePage._id
      var articleTitle = this.get_ArticlePage.title
      var userName = this.$cookies.get('name').name
      var userId = this.$cookies.get('userId')._id
      // var ActiveIsFinish = this.$store.commit('ActiveIsFinish')
      var thatCommit = this.$store.commit
      // console.log('传入数据Data：',{ userComment, articleId, userName, userId, articleTitle, thatStore })
      this.action_submit_comment({ userComment, articleId, userName, userId, articleTitle, thatCommit })
      // this.knowfinished()
    },
    replyTheComment (commentId, childrenUserName) {
      this.$prompt('回复', '留言', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (value) {
          var userComment;
          if (childrenUserName) {
            userComment = '@'+childrenUserName+': '+value
          } else {
            userComment = value
          }
          var userName = this.$cookies.get('name').name
          var userId = this.$cookies.get('userId')._id
          var thatCommit = this.$store.commit
          this.action_submit_comment_comment({ commentId, userComment, userName, userId, thatCommit})
          // await this.$router.go(0)
          // this.$message({
          //   type: 'success',
          //   message: '提交成功'
          // });
          // this.knowfinished()
        } else {
          this.$message({
            type: 'warning',
            message: '未输入'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  },
}
</script>