<template>
  <div>
    <div class="information_container">
      <div class="information information_name">昵称：{{get_user.name}} </div>
      <div class="information information_time">日期：{{get_user.date}} </div>
      <div class="information information_sex">性别：{{get_user.sex}} </div>
      <div class="information information_number">微信：{{get_user.WeChat}} </div>
      <div class="information information_personalSignature">个性签名：{{get_user.signature}} </div>
    </div>

    <div class="user_btn_container">
      <div class="user_btn changeInformation" @click="$router.push('/user/changeInformation')">修改个人信息</div>
      <div class="user_btn myComments" @click="$router.push('/user/myComments')">我的评论</div>
      <div class="user_btn myCollection" @click="$router.push('/user/myCollection')">我的收藏</div>
      <!-- <div class="user_btn myReply" @click="$router.push('/user/myReply')">我的回复</div> -->
    </div>

  </div>
</template>

<script>
// import axios from 'axios';
// import VueCookies from 'vue-cookies'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "userInformation",
  created () {
    // var thatCommit = this.$store.commit
    // this.action_GET_USERINFROMATION()
  },
  data () {
    return {

    };
  },
  computed: {
    ...mapGetters([ 'get_user' ]),
  },
  methods: {
    ...mapActions(['action_GET_USERINFROMATION']),
    // btnAddOne () {
    //   this.num++
    // }
  },
  // watch: {
  //   user:{
  //     handler (newValue, oldValue) {
  //       console.log(123)
  //       console.log(newValue ,oldValue)
  //     },
  //     deep: true
  //   },

  //   // num (newValue, oldValue) {
  //   //   console.log(newValue, oldValue)
  //   // }

  // }
}
</script>