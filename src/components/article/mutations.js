import axios from 'axios'
import { CLEAR_ARTICLE, GET_ARTICLEPAGE, SUBMIT_COMMENT, GET_COMMENT ,SUBMIT_COMMENT_COMMENT} from './type'
export default {
  [CLEAR_ARTICLE]: function (state) {
    state.article = ''
  },
  [GET_ARTICLEPAGE]: function (state, id) {
    axios
      .post('/page/getArticlePage', id)
      .then((res) => {
        state.article = res.data
        var coverRequirePath = res.data.coverRequirePath
        axios
          .get(coverRequirePath)
          .then((res) => {
            state.picUrl = res.data
          })
          .catch((err) => {
           console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [SUBMIT_COMMENT]: function (state, obj) {
    console.log('SUBMIT_COMMENT')
    // console.log(obj)
    axios
      .post('/page/submitComment', obj)
      .then((res) => {
        // console.log(res.data)
        switch (res.data) {
          case '成功':
            // alert('留言成功')
            console.log('留言成功')
            break
          case '失败':
            alert('留言出错')
            break
          default:
            break
        }
        return
      })
      .then(() => {
        var { thatCommit } = obj
        thatCommit('increment')
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [GET_COMMENT]: function (state, articleId) {
    axios
      .post('/page/getArticleComment', { articleId })
      .then((res) => {
        state.articleComment = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [SUBMIT_COMMENT_COMMENT]: function (state, obj) {
    axios
      .post('/page/submitCommentComment', obj)
      .then((res) => {
        // console.log(res.data)
        if (res.data !== '评论成功') {
          alert(res.data)
        }
      }).then(() => {
        var { thatCommit } = obj
        thatCommit('increment')
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
