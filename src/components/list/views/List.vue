<template>
  <div class="list_div">
    <el-row :gutter="12">
      <el-col :span="24">
        <ul class="list_ul">
          <li
            class="list_li"
            v-for="(item, index) in get_articleList"
            :key="index"
            @click="to_article(item._id)"
            v-scroll-reveal.reset
          >
            <el-card class="list_li_div" shadow="hover">
              <el-image
                class="el_card_el_image"
                :src="getPicbase64(item.coverRequirePath)"
                fit="contain"
              ></el-image>
              <!-- {{item.coverRequirePath}} -->
              <ul class="textIntroduction_ul">
                <li class="textIntroduction_li">
                  <div class="el_card_title">{{ item.title }}</div>
                </li>
                <li class="textIntroduction_li">
                  <p class="el_card_generalization">{{ item.synopsis }}</p>
                </li>
                <li class="textIntroduction_li">
                  <div class="textIntroduction_li_div">
                    <el-tag class="el_card_time" type="info">
                      {{ item.date }}
                    </el-tag>
                  </div>
                  <div class="textIntroduction_li_div">
                    <el-tag class="el_card_tag">{{ item.category }}</el-tag>
                  </div>
                </li>
              </ul>
            </el-card>
          </li>
        </ul>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      :small="media_lessThan_width500px"
      background
      layout="prev, pager, next"
      :page-size="10"
      :pager-count="5"
      :total="get_articleList.length+20"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "List",
  data () {
    return {
      screenWidth:  document.body.scrollWidth,
    }
  },
  computed: {
    ...mapGetters(['get_articleList','get_picUrl']),
    media_lessThan_width500px () {
      return this.screenWidth < 500
    },
  },
  methods: {
    ...mapActions(['action_getArticleList']),
    to_article (item) {
      this.$router.push(`/article/${item}`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    getPicbase64 (coverRequirePath) {
      var picUrl
        axios
          .get(coverRequirePath)
          .then((res) => {
            picUrl = res.data
            return picUrl
          })
          .catch((err) => {
           console.log(err)
          })
    }

    
  },
  created () {
    this.action_getArticleList(this.$router.currentRoute.fullPath)
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.scrollWidth
      })()
    }
  },
  // watch: {
  //   screenWidth: {
  //     handler: function () {
  //     },
  //     immediate: true,
  //     deep:true
  //   },
  // }
}
</script>