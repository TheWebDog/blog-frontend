<template>
  <div class="article_background">
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
                :src="item.userPortrait != '' ?  item.userPortrait : require('./favicon.png')"
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
                    :src="childrenItem.userPortrait != '' ?  childrenItem.userPortrait : require('./favicon.png')"
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
                    <el-link
                      icon="el-icon-edit"
                      @click="replyTheComment(item._id, childrenItem.userName)"
                      >回复</el-link
                    >
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
// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Comment",
  // props: [
  //   'id'
  // ],
  data () {
    return {
      theComment: '',
      loginornot: this.$cookies.isKey('token'),
      // id:this.$router.currentRoute.fullPath.split('/')[2],
      id: this.$route.path.split('/')[2],
    }
  },
  created () {
    // console.log(this.id)
    this.action_getComment(this.id)
  },
  computed: {
    ...mapGetters(['get_ArticlePage', 'get_ArticleComment']),
  },
  methods: {
    ...mapActions(['action_submit_comment', 'action_getComment', 'action_submit_comment_comment', 'action_clearComment']),
    to_login () {
      this.$router.push('/login')
    },

    submit_comment () {
      var token = this.$cookies.get('token')
      var userComment = this.theComment
      var articleId = this.get_ArticlePage._id
      var thatCommit = this.$store.commit
      this.action_submit_comment({ userComment, articleId, thatCommit, token })
    },

    replyTheComment (commentId, childrenUserName) {
      this.$prompt('回复', '留言', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (value) {
          var userComment;
          if (childrenUserName) {
            userComment = '@' + childrenUserName + ': ' + value
          } else {
            userComment = value
          }
          var token = this.$cookies.get('token')
          var thatCommit = this.$store.commit
          this.action_submit_comment_comment({ commentId, userComment, thatCommit ,token})
          // if (token) {
          //   axios
          //     .post('/user/check', { token })
          //     .then((res) => {
          //       var user = res.data.user
          //       var userName = user.name
          //       var userId = user._id
          //       var thatCommit = this.$store.commit
          //       this.action_submit_comment_comment({ commentId, userComment, userName, userId, thatCommit })
          //     })
          //     .catch((err) => {
          //       console.log(err)
          //     })
          // } else {
          //   alert('未登录')
          // }

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
  beforeDestroy () {
    this.action_clearComment()
  }
}
</script>