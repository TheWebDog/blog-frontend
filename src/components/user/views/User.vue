<template>
  <div class="user_div">
    <div class="user_head">
      <svg
        class="icon user_back"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          @click="$router.back()"
          fill="#515151"
          d="M94.9504 732.13952c-18.84672 0-29.85472-31.49824-29.85472-31.49824V254.93504l509.77792 477.55776c-0.01536 0-370.78016-0.25088-479.9232-0.35328z m766.68928 32.21504c-69.64224 69.64224-159.3088 63.70304-159.3088 63.70304s58.57792-125.83936 63.71328-223.01696c3.45088-65.36704-35.78368-107.89888-63.71328-127.45216-38.86592-27.2384-96.74752-32.896-159.32416 0-78.56128 41.27744-159.3088 127.45216-159.3088 127.45216L192.53248 382.0288S338.47808 264.11008 479.2832 222.71488c198.45632-58.36288 343.23968 15.88224 414.21312 127.44192 99.1232 155.776 81.41824 300.88704-31.85664 414.19776z"
        />
      </svg>

      <svg
        class="icon user_out"
        viewBox="0 0 1025 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          @click="sign_out"
          fill="#515151"
          d="M1001.65696 463.424l-332.224-332.416C648.76096 110.4 624.05696 104.256 598.52096 113.792c-26.176 9.856-41.152 33.28-41.216 64.384L557.30496 328.32 492.28096 328.32 305.65696 328.384C266.48896 328.512 239.16096 355.712 239.03296 394.624c-0.128 78.4-0.128 156.736 0 235.072 0.128 37.696 27.776 65.28 65.792 65.664l252.48 0.064L557.24096 724.48c-0.128 40.768-0.256 81.408 0.576 122.112 0.256 15.936 6.528 33.28 16.256 45.184 11.904 14.656 28.224 22.72 45.952 22.72l0 0c17.536 0 35.2-8 49.728-22.464 110.848-110.72 221.568-221.504 332.288-332.352C1031.60896 530.176 1031.48096 493.248 1001.65696 463.424zM387.70496 805.696 387.64096 805.696l-72.576 0.128-103.872-0.064c-52.48 0-82.624-30.144-82.624-82.688L128.56896 300.48c0-52.416 30.144-82.496 82.752-82.496l68.8-0.064 75.584 0.064 42.048-0.064c30.08 0 46.528-15.104 48.896-44.8 0.896-11.072 0.64-22.336 0.256-34.88C446.13696 106.944 428.60096 89.664 397.68896 89.6L321.33696 89.6C280.44096 89.6 239.54496 89.6 198.71296 89.856 186.16896 89.92 173.30496 91.328 160.44096 94.08 68.21696 113.728 0.88896 196.416 0.37696 290.688 0.12096 341.504 0.18496 392.384 0.24896 443.136l0.064 67.648L0.18496 581.76C0.12096 632.768-0.00704 683.712 0.44096 734.784c0.896 107.776 88.768 197.056 195.904 199.04 26.368 0.512 52.8 0.64 79.168 0.64l125.376-0.256c24.768 0 42.112-15.04 45.184-39.232 1.088-8.832 1.216-17.856 1.28-26.88l0-4.48c0.128-13.312 0.256-31.552-12.544-44.48C422.45696 806.784 404.66496 805.696 387.70496 805.696z"
        />
      </svg>

      <img
        class="user_portrait"
        src="./wode.png"
        alt=""
      />
    </div>

    <div class="background_curcle"></div>

    <div class="information_container">
      <div class="information information_name">昵称：</div>
      <div class="information information_time">日期：</div>
      <div class="information information_sex">性别：</div>
      <div class="information information_number">微信：</div>
      <div class="information information_personalSignature">个性签名：</div>
    </div>

    <div class="user_btn_container">
      <div class="user_btn changeInformation">修改个人信息</div>
      <div class="user_btn changeInformation">我的评论</div>
      <div class="user_btn changeInformation">我的收藏</div>
      <div class="user_btn changeInformation">我的回复</div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import VueCookies from 'vue-cookies'
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
    // checkToken () {
    //   var token = VueCookies.get('token')
    //     axios
    //     .post('/user/check', {token})
    //     .then((res) => {
    //       console.log(res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
  },
}
</script>

<style scoped>
.user_div {
  box-sizing: border-box;
  border: 5px solid #515151;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.user_head {
  width: 100%;
  height: 120px;
  position: relative;
}
.user_back {
  position: absolute;
  left: 30px;
  top: 20px;
  height: 60px;
}
.user_out {
  position: absolute;
  right: 30px;
  top: 20px;
  height: 60px;
}
.user_portrait {
  background-color: #f3f3f3;
  border: 5px solid #515151;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  position: absolute;
  bottom: -90px;
  left: 20%;
  transform: translateX(-50%);
  z-index: 10;
}
.background_curcle {
  width: 300%;
  height: 300%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  border: 5px solid #515151;
  border-radius: 50%;

  z-index: -1;
}

.information_container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 100px 0 30px 0;
  display: flex;
  width: 340px;
  flex-wrap: wrap;
}
.information {
  font-size: 18px;
  font-weight: 900;
  width: 150px;
  border-bottom: 5px solid #515151;
  margin: 0 20px 50px 0;
}
.information_personalSignature {
  width: 320px;
  margin: 0 20px 0 0;
}
.user_btn_container {
  display: flex;
  flex-wrap: wrap;
  max-width: 720px;
  margin: 0 auto;
  /* position: absolute; */
  /* top: 430px; */
  /* bottom: 0; */
  /* width: 100%; */
}
.user_btn {
  font-weight: 900;
  text-align: center;
  width: 150px;
  height: 50px;
  border: 5px solid #515151;
  border-radius: 15px;
  margin: 10px;
}

@media (max-width: 750px) {
  .user_btn_container {
    max-width: 360px;
  }
}
</style>