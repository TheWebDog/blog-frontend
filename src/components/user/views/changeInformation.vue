<template>
  <div>
    {{ user }}
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      @submit.native.prevent
    >
      <el-form-item label="昵称">
        <el-input v-model="user_name"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="user_sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="微信">
        <el-input v-model="user_WeChat"></el-input>
      </el-form-item>

      <el-form-item label="个性签名">
        <el-input v-model="user_signature"></el-input>
      </el-form-item>

      <button @click="submitData">submitData</button>
    </el-form>
  </div>
</template>

<script>
// import axios from 'axios';
// import VueCookies from 'vue-cookies'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "changeInformation",
  created () {
    this.action_GET_USERINFROMATION()
  },
  data () {
    return {
      user: this.get_user,
      labelPosition: 'right', //  右对齐
      // formLabelAlign: {
      //   name: '',
      //   region: '',
      //   type: '',
      //   resource: '',
      // },
    };
  },
  computed: {
    ...mapGetters(['get_user']),
    user_name: {
      get () {
        return this.get_user.name
      },
      set (newVal) {
        this.$store.commit('set_user_name', newVal)
      }
    },
    user_WeChat: {
      get () {
        return this.get_user.WeChat
      },
      set (newVal) {
        this.$store.commit('set_user_WeChat', newVal)
      }
    },
    user_signature: {
      get () {
        return this.get_user.signature
      },
      set (newVal) {
        this.$store.commit('set_user_signature', newVal)
      }
    },
    user_sex: {
      get () {
        return this.get_user.sex
      },
      set (newVal) {
        // this.$store.commit('modelData', newVal)
        console.log(this.$store.commit('set_user_sex', newVal))
      }
    },
  },
  methods: {
    ...mapActions(['action_GET_USERINFROMATION', 'action_SUBMIT_USERDATA']),
    submitData () {
      this.action_SUBMIT_USERDATA()
    }
  },
}
</script>