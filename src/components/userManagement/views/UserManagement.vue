<template>
  <div class="userManage_div">
    <el-table class="userManage_el_table" :data="
      get_UserManageData.filter(
        (data) =>
          !user_search ||
          data.name.toLowerCase().includes(user_search.toLowerCase())
      )
    " stripe style="width: 670px">
      <el-table-column sortable prop="date" label="日期" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="用户名" width="120">
      </el-table-column>

      <!-- <el-table-column prop="password" label="(加盐的)哈希密码" width="120"></el-table-column> -->

      <el-table-column prop="power" label="权限等级" width="100"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot="header">
          <input class="userManage_search" type="text" placeholder="输入关键字搜索" v-model="user_search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUserChange(scope.$index, scope.row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleUserDelete(scope.$index, scope.row)">
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
  name: "UserManagement",
  data () {
    return {
      user_search: '',
    }
  },
  computed: {
    ...mapGetters(['get_UserManageData']),
  },
  methods: {
    ...mapActions(['action_getUserManageData', 'action_REMOVE_USERDATA', 'action_CHANGE_USERDATA']),
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
    handleUserDelete (index, row) {
      // 删除数据
      var id = row._id
      // var ActiveIsFinish = this.$store.commit('ActiveIsFinish')
      // var thatStore = this.$store
      var thatCommit = this.$store.commit
      this.action_REMOVE_USERDATA({ id,thatCommit })
      // this.$router.go(0)
      // this.knowfinished()
    },
    handleUserChange (index, row) {
      // 修改数据
      this.$prompt('请输入数字', '更改权限', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]+$/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        if (value) {
          var id = row._id
          // var ActiveIsFinish = this.$store.commit('ActiveIsFinish')
          // var thatStore = this.$store
          var thatCommit = this.$store.commit
          this.action_CHANGE_USERDATA({ id, value, thatCommit })
          // this.$router.go(0)
          // this.knowfinished()
          this.$message({
            type: 'success',
            message: '提交成功'
          });
        } else {
          this.$message({
            type: 'warning',
            message: '未输入'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });









      // this.$router.go(0)
    },
  },
  created () {
    this.action_getUserManageData()
  },
}
</script>

<style>
.userManage_el_table {
  margin: auto;
  margin-bottom: 20px;
}

.userManage_template_div_el_form {
  padding: 5px 20px;
}

.userManage_template_div_el_form>form>div {
  margin: 0 !important;
}

.userManage_el_table>div>table>thead>tr>th {
  border-left: 1px solid #e3e3e3;
}

.userManage_search {
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

.userManage_search::-webkit-input-placeholder {
  color: #986655;
  font-size: 12px;
}
</style>