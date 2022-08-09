import axios from 'axios'
import { GET_ARTICLEMANAGEDATA, REMOVE_DATA } from './type'
export default {
  [GET_ARTICLEMANAGEDATA]: function (state) {
    axios
      .post('/page/getList', {})
      .then((res) => {
        state.ArticleManageData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [REMOVE_DATA]: function (state, obj) {
    var { id } = obj
    axios
      .post('/page/removeArticle', { id })
      .then((res) => {
        alert(res.data)
        // console.log(res.data)
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
}
