<template>
  <div class="list_div">
    <el-row :gutter="12">
      <el-col :span="24">
        <ul class="list_ul">
          <li class="list_li" v-for="(item) in get_articleList" :key="item._id" @click="to_article(item.pageId)"
            v-scroll-reveal.reset>
            <el-card class="list_li_div" shadow="hover"  v-loading="get_loading">
              <!-- <el-image class="el_card_el_image" :src="item.coverRequirePath" fit="contain"></el-image> -->
              <!-- el-image的bug喜加一 -->
              <!-- {{item.coverRequirePath}} -->
              <img class="el_card_el_image" :src="item.coverRequirePath" alt="图片又没了？"
                onerror="this.src='../../../static/picNotFound.png';this.οnerrοr=null">
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
    <el-pagination :small="media_lessThan_width500px" background layout="prev, pager, next" :page-size="10"
      :pager-count="5" :total="get_articleList.length + 20" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import $ from 'jquery'
$(".el_card_el_image").one("error", function () {
  $(".el_card_el_image").attr("src", "");
  $(".el_card_el_image").attr("alt", "");//这样就不会出现断裂图片样式，以及文字
  $(".el_card_el_image").css("background-color", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.soogif.com%2FClkKoCEHhuyuRkINHFAvmTsrJjGfUMKV.gif_s400x0&refer=http%3A%2F%2Fimg.soogif.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662551488&t=8224a1465ccdb51ab9cc6c6653f4a872");//添加自定义的样式，根据需求随意

});

// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "List",
  data () {
    return {
      screenWidth: document.body.scrollWidth,
    }
  },
  computed: {
    ...mapGetters(['get_articleList','get_loading']),
    media_lessThan_width500px () {
      return this.screenWidth < 500
    },
  },
  methods: {
    ...mapActions(['action_getArticleList']),
    to_article (id) {
      this.$router.push(`/article/${id}`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    // getPicbase64 (coverRequirePath ,callback) {
    //   var picUrl
    //   axios
    //     .get(coverRequirePath)
    //     .then((res) => {
    //       picUrl = res.data
    //       return picUrl
    //        callback(res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }


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