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
    var { row } = obj
    delete row.coverRequirePath
    axios
      .post('/page/removeArticle', { row })
      .then((res) => {
        if (res.data !== '删除成功') {
          alert(res.data)
        }
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
