<template>
  <div>
    <!-- 小屏时销毁此部分 -->
    <el-aside class="aside_el_aside" width="330px" v-if="media_over_width1200px">
      <Content></Content>
    </el-aside>

    <!-- 大屏时销毁此部分 -->
    <div v-if="!media_over_width1200px">
      <div class="Aside_btn">
        <el-button type="primary" @click="home_drawer = true" icon="el-icon-arrow-left" circle plain></el-button>
      </div>
      <el-drawer :visible.sync="home_drawer" :with-header="true" direction="rtl" class="aside_el_drawer">
        <div class="Aside_small_width_div">
          <Content></Content>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import Content from './content.vue'
export default {
  name: 'Aside',
  components: {
    Content,
  },
  data () {
    return {
      home_drawer: false,
    }
  },
  methods: {

  },
  computed: {
    media_over_width1200px () {
      return this.$store.getters.getDoubleCount >= 1200
    },
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        // this.screenWidth = document.body.scrollWidth
        this.$store.commit("upDateScreenWidth", document.body.clientWidth+12)
        // console.log(document.body.scrollWidth)
        // console.log(document.body.clientWidth+12)
        // console.log(document.body.offsetHeight)
        // console.log(document.body.innerWidth)
      })()
    }
  },
  created () {
    this.$store.commit("upDateScreenWidth", document.body.clientWidth+12)
  }
}
</script>