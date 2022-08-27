<template>
  <div class="myCollection_div">
    <el-table
      class="myCollection_el_table"
      :data="
        myCollections.filter(
          (data) =>
            !myCollection_search ||
            data.pinyinAndTitle
              .toLowerCase()
              .includes(myCollection_search.toLowerCase())
        )
      "
      stripe
      style="width: 600px; min-width: 670px"
    >
      <el-table-column type="expand" width="60" label="展开">
        <template slot-scope="props">
          <div class="myCollection_template_div_el_form">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="分类：">
                <el-tag size="medium">{{ props.row.category }}</el-tag>
              </el-form-item>
              <br />
              <el-form-item label="简介：">
                <p>{{ props.row.synopsis }}</p>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>

      <el-table-column sortable prop="date" label="日期" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="150"> </el-table-column>

      <el-table-column prop="category" label="分类" width="120">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.category }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="190">
        <template slot="header">
          <input
            class="myCollection_search"
            type="text"
            placeholder="输入关键字搜索"
            v-model="myCollection_search"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="to_article(scope.$index, scope.row)"
          >
            查看原文
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleCommentDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :pager-count="5"
      :total="500"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "myCollection",
  data () {
    return {
      myCollections: [],
      myCollection_search: '',
    }
  },
  created () {
    var token = VueCookies.get('token')
    axios
      .post('/user/myCollection', { token })
      .then((res) => {
        this.myCollections = res.data
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),

    to_article (index, row) {
      this.$router.push(`/article/${row.pageId}`)
    },
    handleCommentDelete (index, row) {
      // 删除数据
      var pageId = row.pageId
      var token = VueCookies.get('token')
      axios
        .post('/user/removeMyCollection', { token, pageId })
        .then((res) => {
          if (res.data.token) {
            VueCookies.set('token', res.data.token)
            this.$store.commit('increment')
          } else {
            console.log(res.data)
            alert('移除失败')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
.myCollection_el_table {
  margin: auto;
  margin-bottom: 20px;
}

.myCollection_el_table
  > .el-table__body-wrapper
  > table
  > tbody
  > tr
  > .el-table_1_column_3
  > div {
  /* background-color: black !important; */
  /* 文本溢出 显示为省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.myCollection_template_div_el_form {
  padding: 5px 20px;
}

.myCollection_template_div_el_form > form > div {
  margin: 0 !important;
}

.myCollection_el_table > div > table > thead > tr > th {
  border-left: 1px solid #e3e3e3;
}

.myCollection_search {
  width: 90%;
  font-size: 12px;
  /* 设置输入框中字体的大小 */
  height: 30px;
  /* 设置输入框的高度 */
  border-radius: 4px;
  /* 设置输入框的圆角的大小 */
  border: 1px solid #c8cccf;
  /* 设置输入框边框的粗细和颜色 */
  color: #986655;
  /* 设置输入框中文字的颜色 */
  outline: 0;
  /* 将输入框点击的时候出现的边框去掉 */
  text-align: left;
  /* 设置输入框中文字的位置 */
  padding-left: 10px;
  display: block;
  /* 将输入框设置为块级元素 */
  /* cursor: pointer; */
}

.myCollection_search::-webkit-input-placeholder {
  color: #986655;
  font-size: 12px;
}
</style>