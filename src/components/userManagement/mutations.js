import axios from 'axios'
import { GET_USERMANAGEDATA, REMOVE_USERDATA, CHANGE_USERDATA } from './type'
export default {
  [GET_USERMANAGEDATA]: function (state) {
    axios
      .get('/user/getUserList', {})
      .then((res) => {
        state.UserManageData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [REMOVE_USERDATA]: function (state, obj) {
    var { id } = obj
    axios
      .post('/user/removeUser', { id })
      .then((res) => {
        alert(res.data)
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
  [CHANGE_USERDATA]: function (state, idandvalue) {
    var { id, value } = idandvalue
    axios
      .post('/user/changeUser', { id, value })
      .then((res) => {
        alert(res.data)
        return
      })
      .then(() => {
        var { thatCommit } = idandvalue
        // thatStore.commit('ActiveIsFinish')
        thatCommit('increment')
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
