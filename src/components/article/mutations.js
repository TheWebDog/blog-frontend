import axios from 'axios'
import { GET_ARTICLEPAGE, SUBMIT_COMMENT, GET_COMMENT ,SUBMIT_COMMENT_COMMENT} from './type'
export default {
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
    axios
      .post('/page/submitComment', obj)
      .then((res) => {
        console.log(res.data)
        switch (res.data) {
          case '成功':
            alert('留言成功,请刷新页面')
            break
          case '失败':
            alert('留言出错')
            break
          default:
            break
        }
        return
      }).then(() => {
        // state.finished = true
        var { thatStore } = obj
        // thatStore.commit('ActiveIsFinish')
        thatStore.commit('increment')
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
        console.log(res.data)
        alert(res.data)
      }).then(() => {
        // state.finished = true
        var { thatStore } = obj
        // thatStore.commit('ActiveIsFinish')
        thatStore.commit('increment')
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
