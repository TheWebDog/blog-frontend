<template>
  <div>
    {{ user }}
    <el-form
      class="changeInformation_from"
      :label-position="labelPosition"
      label-width="80px"
      @submit.native.prevent
    >
      <el-form-item label="头像：">
        <el-upload
          class="avatar-uploader"
          action=""
          drag
          accept="image/jpeg, image/png, image/jpg"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onChange"
          :on-remove="handleRemove"
        >
          <img v-if="user_portrait" :src="user_portrait" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称：">
        <el-input v-model="user_name"></el-input>
      </el-form-item>

      <el-form-item label="性别：">
        <el-radio-group v-model="user_sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="微信：">
        <el-input v-model="user_WeChat"></el-input>
      </el-form-item>

      <el-form-item label="个性签名">
        <el-input v-model="user_signature"></el-input>
      </el-form-item>

      <el-button
        class="submitMyData"
        @click="submitData"
        type="success"
        icon="el-icon-check"
        circle
      ></el-button>
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
    };
  },
  computed: {
    ...mapGetters(['get_user']),
    user_portrait: {
      get () {
        return this.get_user.portrait
      },
      set (newVal) {
        this.$store.commit('set_user_portrait', newVal)
      }
    },
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
        this.$store.commit('set_user_sex', newVal)
      }
    },
  },
  methods: {
    ...mapActions(['action_GET_USERINFROMATION', 'action_SUBMIT_USERDATA']),
    submitData () {
      this.action_SUBMIT_USERDATA()
    },

    // // 图片移除
    handleRemove () {
      this.user_portrait = null
    },
    // // 图片保存
    onChange (file) {

      const isLt2M = file.size / 1024 / 1024 < 1

      if (isLt2M) {
        // 通过FileReader.readAsDataURL(file)可以获取一段data:base64的字符串
        // 通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
        // this.user_portrait = URL.createObjectURL(file.raw);
        // console.log(this.user_portrait)
        var reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = () => {
          this.user_portrait = reader.result
          // console.log(this.user_portrait)
        }
        reader.onerror = function (error) {
          console.log('Error: ', error)
        }
      } else {

        this.$message({
          message: '头像不能超过 1MB!',
          type: 'warning'
        })

      }
    },

  },
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px !important;
  height: 100px !important;
  display: block;
}
</style>