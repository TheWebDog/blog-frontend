<template>
  <div class="articleManage_div">
    <el-table class="articleManage_el_table" :data="
      get_ArticleManageData.filter(
        (data) =>
          !table_search ||
          data.title.toLowerCase().includes(table_search.toLowerCase())
      )
    " stripe style="width: 600px; min-width: 660px">
      <el-table-column type="expand" width="60" label="展开">
        <template slot-scope="props">
          <div class="articleManage_template_div_el_form">
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

      <el-table-column label="操作" width="180">
        <template slot="header">
          <input class="articleManage_search" type="text" placeholder="输入关键字搜索" v-model="table_search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "articleManagement",
  data () {
    return {
      table_search: '',
    }
  },
  computed: {
    ...mapGetters(['get_ArticleManageData']),
  },
  methods: {
    ...mapActions(['action_getArticleManageData', 'action_REMOVE_DATA']),
    // knowfinished () {
    //   // console.log('knowfinished')
    //   var finished = this.$store.getters.getActiveFinish
    //   console.log(finished)
    //   if (finished) {
    //     this.$store.commit('ActiveFinishReset')
    //     setTimeout(() => {
    //       this.$router.go(0)
    //     }, 500);
    //   } else {
    //     setTimeout(() => {
    //       this.knowfinished()
    //     }, 1000);
    //   }
    // },
    handleDelete (index, row) {
      // 删除数据
      // var ActiveIsFinish = this.$store.commit('ActiveIsFinish')
      // var id = row.pageId
      // console.log(row)
      var thatCommit = this.$store.commit
      this.action_REMOVE_DATA({ row, thatCommit })
      // this.knowfinished()
    }
  },
  created () {
    this.action_getArticleManageData()
  },
}
</script>

<style>
.articleManage_el_table {
  margin: auto;
  margin-bottom: 20px;
}

.articleManage_el_table>.el-table__body-wrapper>table>tbody>tr>.el-table_1_column_3>div {
  /* background-color: black !important; */
  /* 文本溢出 显示为省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}




.articleManage_template_div_el_form {
  padding: 5px 20px;
}

.articleManage_template_div_el_form>form>div {
  margin: 0 !important;
}

.articleManage_el_table>div>table>thead>tr>th {
  border-left: 1px solid #e3e3e3;
}

.articleManage_search {
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

.articleManage_search::-webkit-input-placeholder {
  color: #986655;
  font-size: 12px;
}
</style>