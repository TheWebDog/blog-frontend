<template>
  <div class="homeBody_div">
    <div class="homeBody_image">
      <!-- <a :href="$axios.defaults.baseURL">a</a> -->
      <el-image
        style="width: 100%;"
        src="../static/homePage2.gif"
        fit="cover"
      ></el-image>
    </div>
    <List></List>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { List } from './list'
export default {
  name: "HomeBody",
  components: {
    List,
  },
  methods: {
    ...mapActions([]),
    // :src="$axios.defaults.baseURL+'/page/getPic/homePage2.gif'"
    // :src="$axios.defaults.baseURL+'/page/getPic?picUrl=public\\homePage2.gif'"
    // http://localhost:4000/page/getPic?picUrl=public\homePage1.gif
    // http://localhost:4000/page/getPic?picUrl=public\homePage2.gif
  },
  created () {
    // console.log(this)
    this.$axios
      .get(this.$axios.defaults.baseURL)
      .then((res) => {
        console.log(res)
      })
        .catch((err) => {
          console.log(err, '--错误')
        })
  },
}
</script>