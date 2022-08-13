<template>
  <div class="user_div">
    <button @click="$router.back()">返回</button>
    <button @click="sign_out">登出</button>
    <img src="./1.png" alt="">
    <div class="background_curcle"></div>
  </div>
</template>

<script>
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
      this.$cookies.remove('key')
      this.$router.push('/login')
    },
  },
}
</script>