<template>
  <div>
    <div class="information_container">
      <div class="information information_name">昵称：</div>
      <div class="information information_time">日期：</div>
      <div class="information information_sex">性别：</div>
      <div class="information information_number">微信：</div>
      <div class="information information_personalSignature">个性签名：</div>
    </div>

    <div class="user_btn_container">
      <div class="user_btn changeInformation">修改个人信息</div>
      <div class="user_btn myComments">我的评论</div>
      <div class="user_btn myCollection">我的收藏</div>
      <div class="user_btn myReply">我的回复</div>
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

  },
  data () {
    return {

    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
  },
}
</script>