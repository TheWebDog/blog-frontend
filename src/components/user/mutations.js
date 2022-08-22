import { GET_USERINFROMATION , SUBMIT_USERDATA} from './type'
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  // 获取用户信息
  [GET_USERINFROMATION]: function (state) {

    var token = VueCookies.get('token')
    axios
      .post('/user/check', { token })
      .then((res) => {
        if (res.data == '未登录') {
          state.user = '未登录'
          alert('未登录')
        } else {
          state.user = res.data.user
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  [SUBMIT_USERDATA]: function (state) {
    console.log(state.user)
  },  


  // 编辑用户
  set_user_name: function (state ,value) {
    state.user.name = value
  },
  set_user_WeChat: function (state ,value) {
    state.user.WeChat = value
  },
  set_user_signature: function (state ,value) {
    state.user.signature = value
  },
  set_user_sex: function (state ,value) {
    state.user.sex = value
  },
}
