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
        return
      })
      .then(() => {
        var { thatStore } = obj
        // thatStore.commit('ActiveIsFinish')
        thatStore.commit('increment')
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
