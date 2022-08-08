import axios from 'axios'
import { GET_USERMANAGEDATA, REMOVE_USERDATA, CHANGE_USERDATA } from './type'
export default {
  [GET_USERMANAGEDATA]: function (state) {
    axios
      .post('/user/getUserList', {})
      .then((res) => {
        state.UserManageData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [REMOVE_USERDATA]: function (state, obj) {
    var { id, ActiveIsFinish } = obj
    axios
      .post('/user/removeUser', { id })
      .then((res) => {
        alert(res.data)
        return
      })
      .then(() => {
        ActiveIsFinish()
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [CHANGE_USERDATA]: function (state, idandvalue) {
    var { id, value, ActiveIsFinish } = idandvalue
    axios
      .post('/user/changeUser', { id, value })
      .then((res) => {
        alert(res.data)
        return
      })
      .then(() => {
        ActiveIsFinish()
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
