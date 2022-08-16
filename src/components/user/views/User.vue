<template>
  <div class="user_div">
    <button @click="$router.back()">返回</button>
    <button @click="sign_out">登出</button>
    <button @click="checkToken">验证</button>
    <img src="./1.png" alt="">
    <div class="background_curcle"></div>
  </div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "User",
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
    sign_out () {
      this.$cookies.remove('token')
      this.$router.push('/login')
    },
    checkToken () {
      var token = VueCookies.get('token')
        axios
        .post('/user/check', {token})
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>