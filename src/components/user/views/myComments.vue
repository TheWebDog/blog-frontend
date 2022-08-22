<template>
  <div>
    
    <el-table class="CommentManage_el_table" :data="
      myComments.filter(
        (data) =>
          !comment_search ||
          data.userComment.toLowerCase().includes(comment_search.toLowerCase())
      )
    " stripe style="width: 530px">

    <el-table-column type="expand" width="60" label="展开">
        <template slot-scope="props">
          <div class="CommentManage_template_div_el_form">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="评论详情：">
                <p>{{ props.row.userComment }}</p>
              </el-form-item>
              <br />
              <el-form-item label="回复：">
                <ul class="CommentManage_childrenComment_ul">
                  <li class="CommentManage_childrenComment_li" v-for="(childrenItem, childrenIndex) in props.row
                  .childrenComment" :key="childrenIndex">
                    <div class="CommentManage_childrenComment">
                      <div class="CommentManage_childrenComment_container">
                        <div>用户名:</div>
                        <div class="">
                          {{ childrenItem.userName }}
                        </div>
                      </div>
                      <div class="CommentManage_childrenComment_container">
                        <div>用户评论:</div>
                        <div class="">
                          {{ childrenItem.userComment }}
                        </div>
                      </div>
                      <div class="CommentManage_childrenComment_container">
                        <el-link :underline="false" class="children_delete" icon="el-icon-delete" @click="
                          handleCommentChildrenDelete(
                            childrenItem.userComment,
                            props.row._id
                          )
                        ">删除</el-link>
                      </div>
                    </div>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>


      <el-table-column sortable prop="date" label="日期" width="130">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="userComment" label="评论内容" width="150">
      </el-table-column>

      <el-table-column label="操作" width="190">
        <template slot="header">
          <input class="articleManage_search" type="text" placeholder="输入关键字搜索" v-model="comment_search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUserChange(scope.$index, scope.row)">
            查看原文
          </el-button>
          <el-button size="mini" type="danger" @click="handleCommentDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "myComments",
  created () {
    var token = VueCookies.get('token')
    axios
      .post('/user/myComments', { token })
      .then((res) => {
        this.myComments = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      myComments: [],
      comment_search : '',
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
  },
}
</script>