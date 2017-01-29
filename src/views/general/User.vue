<template>
  <div class="view">
    <Panel title="User List">
      <div slot="header">
        <el-input
          v-model="keyword"
          icon="search"
          placeholder="Keywords">
      </el-input>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="loading"
        ref="table"
        :data="userList"
        style="width: 100%">
        <el-table-column
         prop="id"
         label="ID">
        </el-table-column>
        <el-table-column
         prop="username"
         label="Userame">
        </el-table-column>
        <el-table-column
         prop="create_time"
         label="Create Time">
        </el-table-column>
        <el-table-column
          prop="last_login"
          label="Last Login">
        </el-table-column>
        <el-table-column
         prop="real_name"
         label="Real Name">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email">
        </el-table-column>
        <el-table-column
          prop="admin_type"
          label="User Type">
          <template scope="scope">
            {{ scope.row.admin_type }}
          </template>
        </el-table-column>
        <el-table-column
          inline-template
          fixed="right"
          label="Option">
          <el-button type="text" class="btn" size="small" @click="openUserDialog(row.id)">Edit</el-button>
        </el-table-column>
      </el-table>
      <div class="option">
        <el-pagination
         class="page"
         layout="prev, pager, next"
         @current-change="currentChange"
         :page-size="pageSize"
         :total="total">
       </el-pagination>
      </div>
    </Panel>
    <!--对话框-->
    <el-dialog title="User" v-model="showUserDialog">
      <el-form :model="user" label-width="120px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Username" required>
              <el-input v-model="user.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Real Name" required>
              <el-input v-model="user.real_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Email" required>
              <el-input v-model="user.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="User Type" required>
              <el-select v-model="user.admin_type">
                <el-option label="Regular User" value="Regular User"></el-option>
                <el-option label="Admin" value="Admin"></el-option>
                <el-option label="Super Admin" value="Super Admin"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="New Password">
              <el-input v-model="user.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="Two Factor Auth">
                <el-switch
                  v-model="user.two_factor_auth"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Open Api">
                <el-switch
                  v-model="user.open_api"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Is Disabled">
                <el-switch
                  v-model="user.is_disabled"
                  on-text=""
                  off-text="">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="showUserDialog = false">Cancel</el-button>
        <el-button type="primary" @click.native="saveUser()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../api.js'
import Panel from '../../components/Panel.vue'
export default{
  name: 'User',
  components: {
    Panel
  },
  data () {
    return {
      // 一页显示的用户数
      pageSize: 5,
      // 用户总数
      total: 0,
      // 用户列表
      userList: [],
      // 搜索关键字
      keyword: '',
      // 是否显示用户对话框
      showUserDialog: false,
      // 当前用户model
      user: {},
      // 是否显示loading
      loading: false,
      // 当前页码
      currentPage: 0
    }
  },
  mounted () {
    this.getUserList(1)
  },
  methods: {
    // 切换页码回调
    currentChange (page) {
      this.currentPage = page
      this.getUserList(page)
    },
    // 提交修改用户的信息
    saveUser () {
      api.editUser(this.user).then(res => {
        // 更新列表
        this.getUserList(this.currentPage)
      }).then(() => {
        this.showUserDialog = false
      }).catch(() => {})
    },
    // 打开用户对话框
    openUserDialog (id) {
      this.showUserDialog = true
      api.getUser(id).then(res => {
        this.user = res.data.data
        this.user.password = ''
      })
    },
    // 获取用户列表
    getUserList (page) {
      this.loading = true
      api.getUserList((page - 1) * this.pageSize, this.pageSize, this.keyword).then(res => {
        this.loading = false
        this.total = res.data.data.total
        this.userList = res.data.data.results
      }, res => {
        this.loading = false
      })
    }
  },
  watch: {
    'keyword' () {
      this.currentChange(1)
    }
  }
}
</script>

<style scoped lang="less">
.option{
  border: 1px solid #e0e6ed;
  border-top: none;
  padding: 8px;
  background-color: #fff;
  position: relative;
  height: 50px;
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
