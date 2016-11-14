<template>
  <div class="view">
    <Panel title="user list">
      <div slot="header">
        <el-input
          v-model="keyWord"
          icon="search"
          placeholder="please input keywords">
      </el-input>
      </div>
      <el-table
        ref="table"
        :data="userList"
        style="width: 100%"
        @selection-change="multipleSelectionChange">
        <el-table-column
         type="selection"
         width="50">
        </el-table-column>
        <el-table-column
         prop="id"
         label="ID"
         sortable
         width="100">
        </el-table-column>
        <el-table-column
         prop="username"
         label="user name"
         sortable
         width="180"
         show-tooltip-when-overflow>
        </el-table-column>
        <el-table-column
         prop="create_time"
         sortable
         label="registration time">
        </el-table-column>
        <el-table-column
         prop="real_name"
         sortable
         label="real name">
        </el-table-column>
        <el-table-column
          prop="email"
          sortable
          label="email">
        </el-table-column>
        <el-table-column
          prop="admin_type"
          sortable
          label="user type">
        </el-table-column>
      </el-table>
      <div class="option">
        <el-button type="primary" size="small" :disabled="optionBtnDisabled" @click.native="showEditAnnounceDialog = true" icon="edit">edit</el-button>
        <el-button type="success" size="small" :disabled="optionBtnDisabled" icon="delete">delete</el-button>
        <el-pagination
         class="page"
         layout="prev, pager, next"
         @current-change="currentChange"
         :page-size = "pageSize"
         :total="count">
       </el-pagination>
      </div>
    </Panel>
  </div>
</template>

<script>
import api from '../api.js'
import Panel from '../components/Panel.vue'
export default{
  components: {
    Panel
  },
  data () {
    return {
      // 一页显示的用户数
      pageSize: 5,
      // 用户总数
      count: 0,
      // 用户列表
      userList: [],
      // 搜索关键字
      keyWord: '',
      // 操作按钮是否禁用
      optionBtnDisabled: true
    }
  },
  mounted () {
    api.getUserList(1, this.pageSize).then(res => {
      this.count = res.data.data.count
      this.userList = res.data.data.results
    })
  },
  methods: {
    // 处理多选回调
    multipleSelectionChange (items) {
      this.optionBtnDisabled = !(items.length === 1)
    },
    // 切换页码回调
    currentChange (page) {
      // 清除上一页选择的的多选框
      this.$refs.table.clearSelection()
      api.getUserList((page - 1) * this.pageSize, this.pageSize).then(res => {
        this.userList = res.data.data.results
      })
    },
    querySearch () {
    }
  }
}
</script>

<style scoped lang="less">
.option{
  border: 1px solid #e0e6ed;
  border-top: none;
  padding: 10px;
  background-color: #fff;
  position: relative;
  button{
    margin-right: 10px;
  }
  >.page{
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
</style>
