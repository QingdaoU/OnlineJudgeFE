<template>
  <div class="view">
    <Panel title="User ">
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-button v-show="selectedUsers.length"
                       type="warning" icon="fa-trash"
                       @click="deleteUsers(selectedUserIDs)">Delete
            </el-button>
          </el-col>
          <el-col :span="selectedUsers.length ? 16: 24">
            <el-input v-model="keyword" icon="search" placeholder="Keywords"></el-input>
          </el-col>
        </el-row>
      </div>
      <el-table
        v-loading="loadingTable"
        element-loading-text="loading"
        @selection-change="handleSelectionChange"
        ref="table"
        :data="userList"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="Userame"></el-table-column>
        <el-table-column prop="create_time" label="Create Time">
          <template slot-scope="scope">
            {{scope.row.create_time | localtime }}
          </template>
        </el-table-column>
        <el-table-column prop="last_login" label="Last Login">
          <template slot-scope="scope">
            {{scope.row.last_login | localtime }}
          </template>
        </el-table-column>
        <el-table-column prop="real_name" label="Real Name"></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="admin_type" label="User Type">
          <template slot-scope="scope">
            {{ scope.row.admin_type }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Option">
          <template slot-scope="{row}">
            <icon-btn name="Edit" icon="edit" @click.native="openUserDialog(row.id)"></icon-btn>
            <icon-btn name="Delete" icon="trash" @click.native="deleteUsers([row.id])"></icon-btn>
          </template>
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

    <Panel title="Generate User">
      <el-form :model="formGenerateUser" ref="formGenerateUser">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="Prefix" prop="prefix">
              <el-input v-model="formGenerateUser.prefix" placeholder="Prefix"></el-input>
            </el-form-item>
            <el-form-item label="Start Number" prop="number_from" required>
              <el-input v-model="formGenerateUser.number_from" placeholder="Start Number"></el-input>
            </el-form-item>
            <el-form-item label="Default Email" prop="default_email" required>
              <el-input v-model="formGenerateUser.default_email"
                        placeholder="Default Email"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10" :offset="1">
            <el-form-item label="Suffix" prop="suffix">
              <el-input v-model="formGenerateUser.suffix" placeholder="Suffix"></el-input>
            </el-form-item>
            <el-form-item label="End Number" prop="number_to" required>
              <el-input v-model="formGenerateUser.number_to" placeholder="End Number"></el-input>
            </el-form-item>
            <el-form-item label="Password Length" prop="password_length" required>
              <el-input v-model="formGenerateUser.password_length"
                        placeholder="Password Length"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="generateUser" icon="fa-users" :loading="loadingGenerate">Generate
          </el-button>
          <el-button v-if="file_id" @click="downloadUserExcel" icon="fa-download">Download The Excel</el-button>
        </el-form-item>
      </el-form>
    </Panel>
    <!--对话框-->
    <el-dialog title="User" v-model="showUserDialog" :close-on-click-modal="false">
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
            <el-form-item label="New Password">
              <el-input v-model="user.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="User Type">
              <el-select v-model="user.admin_type">
                <el-option label="Regular User" value="Regular User"></el-option>
                <el-option label="Admin" value="Admin"></el-option>
                <el-option label="Super Admin" value="Super Admin"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Problem Permission">
              <el-select v-model="user.problem_permission" :disabled="user.admin_type!=='Admin'">
                <el-option label="None" value="None"></el-option>
                <el-option label="Own" value="Own"></el-option>
                <el-option label="All" value="All"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <cancel @click.native="showUserDialog = false">Cancel</cancel>
        <save @click.native="saveUser()"></save>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../api.js'
  import utils from '@/utils/utils'

  export default {
    name: 'User',
    data () {
      return {
        // 一页显示的用户数
        pageSize: 10,
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
        loadingTable: false,
        loadingGenerate: false,
        // 当前页码
        currentPage: 0,
        selectedUsers: [],
        file_id: '',
        formGenerateUser: {
          prefix: '',
          suffix: '',
          number_from: '',
          number_to: '',
          default_email: '',
          password_length: 8
        }
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
        }).catch(() => {
        })
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
        this.loadingTable = true
        api.getUserList((page - 1) * this.pageSize, this.pageSize, this.keyword).then(res => {
          this.loadingTable = false
          this.total = res.data.data.total
          this.userList = res.data.data.results
        }, res => {
          this.loadingTable = false
        })
      },
      deleteUsers (ids) {
        this.$confirm('Sure to delete the user?', 'confirm', {
          type: 'warning'
        }).then(() => {
          api.deleteUsers(ids.join(',')).then(res => {
            this.getUserList(this.currentPage)
          }).catch(() => {
            this.getUserList(this.currentPage)
          })
        }, () => {
        })
      },
      handleSelectionChange (val) {
        this.selectedUsers = val
      },
      generateUser () {
        this.$refs['formGenerateUser'].validate((valid) => {
          if (!valid) {
            this.$error('Please validate the error fields')
            return
          }
          this.loadingGenerate = true
          let data = Object.assign({}, this.formGenerateUser)
          api.generateUser(data).then(res => {
            this.loadingGenerate = false
            this.file_id = res.data.data
            this.getUserList(1)
          }).catch(() => {
            this.loadingGenerate = false
          })
        })
      },
      downloadUserExcel () {
        this.$msgbox({
          title: 'Download The File',
          message: 'The users excel can only be downloaded once, please save it carefully.',
          type: 'warning'
        }).then(() => {
          let url = '/admin/generate_user?file_id=' + this.file_id
          utils.downloadFile(url)
          this.file_id = ''
        })
      }
    },
    computed: {
      selectedUserIDs () {
        let ids = []
        for (let user of this.selectedUsers) {
          ids.push(user.id)
        }
        return ids
      }
    },
    watch: {
      'keyword' () {
        this.currentChange(1)
      },
      'user.admin_type' () {
        if (this.user.admin_type === 'Super Admin') {
          this.user.problem_permission = 'All'
        } else if (this.user.admin_type === 'Regular User') {
          this.user.problem_permission = 'None'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .option {
    border: 1px solid #e0e6ed;
    border-top: none;
    padding: 8px;
    background-color: #fff;
    position: relative;
    height: 50px;
    button {
      margin-right: 10px;
    }
    > .page {
      position: absolute;
      right: 20px;
      top: 10px;
    }
  }
</style>
