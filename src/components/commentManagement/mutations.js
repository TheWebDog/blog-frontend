import axios from 'axios'
import { GET_COMMENTMANAGEDATA, REMOVE_COMMENT, REMOVE_CHILDREN } from './type'
export default {
  [GET_COMMENTMANAGEDATA]: function (state) {
    axios
      .post('/page/getArticleComment', {})
      .then((res) => {
        state.CommentManageData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [REMOVE_COMMENT]: function (state, obj) {
    var { id } = obj
    axios
      .post('/page/removeComment', { id })
      .then((res) => {
        if (res.data !== '删除成功') {
          alert(res.data)
        }
        return
      })
      .then(() => {
        var { thatCommit } = obj
        // thatStore.commit('ActiveIsFinish')
        thatCommit('increment')
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [REMOVE_CHILDREN]: function (state, userCommentandid) {
    var { userComment, id } = userCommentandid
    axios
      .post('/page/removeChildren', { userComment, id })
      .then((res) => {
        console.log(res.data)
      })
      .then(() => {
        var { thatCommit } = userCommentandid
        // thatStore.commit('ActiveIsFinish')
        thatCommit('increment')
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
