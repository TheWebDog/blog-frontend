<template>
  <div class="header_div">
    <!-- 大屏时销毁此部分 -->
    <div class="blog_name" v-if="!media_over_width935px">
      <div class="the_blog_name">
        <i class="el-icon-s-home"></i>WebDog的主页
      </div>
      <el-link
        :underline="false"
        icon="el-icon-more"
        @click="drawer = true"
        type="primary"
      ></el-link>
      <el-drawer
        title="WebDog的主页"
        :visible.sync="drawer"
        :with-header="true"
        direction="ltr"
      >
        <div>
          <el-tabs
            :tab-position="tabPosition"
            style="height: 200px"
            @tab-click="handleClick"
          >
            <el-tab-pane label="博客主页">博客主页</el-tab-pane>
            <!-- <el-tab-pane label="技术交流">技术交流</el-tab-pane> -->
            <el-tab-pane label="文章分类">文章分类</el-tab-pane>
            <el-tab-pane label="源码分享">源码分享</el-tab-pane>
            <el-tab-pane label="关于博主">关于博主</el-tab-pane>
          </el-tabs>
        </div>
        <ul class="left_nav_ul_el_input">
          <li class="left_nav_li_el_input">
            <el-input
              @input="changeValue()"
              class="left_nav_search"
              prefix-icon="el-icon-search"
              v-model="searchinput"
              placeholder="请输入内容"
              maxlength="10"
              show-word-limit
            ></el-input>
          </li>
          <li
            class="left_nav_li_el_link"
            @click="to_Personal"
            :hidden="!loginornot"
          >
            <el-link icon="el-icon-user">个人中心</el-link>
          </li>
          <li
            class="left_nav_li_el_link"
            @click="to_login"
            :hidden="loginornot"
          >
            <el-link icon="el-icon-warning-outline">未登录</el-link>
          </li>
        </ul>
      </el-drawer>
    </div>
    <!-- 小屏时销毁此部分 -->
    <div class="header_div1" v-if="media_over_width935px">
      <el-row :gutter="20">
        <el-col :span="5" class="blog_name2">
          <el-link>
            <div class="el_col_header_div the_blog_name2" @click="to_home">
              WebDog的主页<i class="el-icon-s-home"></i>
            </div>
          </el-link>
        </el-col>
        <el-col :span="19">
          <div class="el_col_header_div">
            <ul class="header_ul">
              <!-- <li class="header_li" @click="to_list">
                <el-link type="primary" icon="el-icon-s-promotion">
                  技术交流
                </el-link>
              </li> -->
              <li class="header_li" @click="to_articleClassifylist">
                <el-link icon="el-icon-menu">博客文章</el-link>
              </li>
              <li class="header_li">
                <el-link icon="el-icon-s-management">源码分享</el-link>
              </li>
              <li class="header_li" @click="to_aboutMe">
                <el-link icon="el-icon-s-custom">关于博主</el-link>
              </li>
              <li class="header_li">
                <el-input
                  @input="changeValue()"
                  class="search"
                  prefix-icon="el-icon-search"
                  v-model="searchinput"
                  placeholder="请输入内容"
                  maxlength="10"
                  show-word-limit
                ></el-input>
              </li>
              <li class="header_li" @click="to_Personal" v-if="loginornot">
                <el-link icon="el-icon-user">个人中心</el-link>
              </li>
              <li class="header_li" @click="to_login" v-if="!loginornot">
                <el-link icon="el-icon-warning-outline">未登录</el-link>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Header",
  data () {
    return {
      searchinput: '',
      drawer: false,
      tabPosition: 'left',
      loginornot: this.$cookies.isKey('token'),
      // windoWidth: document.documentElement.scrollWidth,
      // screenWidth:  document.body.scrollWidth,

      timeOut : null ,
    }
  },
  computed: {
    ...mapGetters([]),
    media_over_width935px () {
      return this.$store.getters.getDoubleCount > 935
    },
  },
  mounted () {

  },
  methods: {
    ...mapActions(['action_getSearchList', 'action_setInputValue']),
    changeValue: function () {
      clearTimeout(this.timeOut)
      this.timeOut = null
      this.timeOut = setTimeout(() => {
        var value = this.searchinput
        if (value.length != 0) {
          if (this.$route.fullPath != '/search') {
            this.$router.replace('/search')
          }
          this.action_setInputValue(value)
        } else {
          // this.$router.replace('/list')
          this.$router.replace('/')
        }
      }, 1000);
    },
    to_login () {
      this.$router.push('/login')
    },
    // sign_out () {
    //   this.$cookies.remove('token')
    //   this.$router.push('/login')
    // },
    to_Personal () {
      this.$router.push('/user')
    },
    to_home () {
      this.$router.push('/')
    },
    // to_list () {
    //   this.$router.push('/list')
    // },
    to_articleClassifylist () {
      this.$router.push('/articleClassify')
    },
    to_aboutMe () {
      this.$router.push('/aboutMe')
    },
    handleClick (tab) {
      // console.log(tab._props.label, event);
      switch (tab._props.label) {
        case '博客主页':
          this.to_home()
          break;
        case '技术交流':
          // this.to_list()
          break;
        case '文章分类':
          this.to_articleClassifylist()
          break;
        case '源码分享':

          break;
        case '关于博主':
          this.to_aboutMe()
          break;

        default:
          break;
      }
    }
  },
  created () {

  },
}
</script>