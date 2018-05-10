<template>
  <div class="view">
    <Panel title="Group List">
      <div slot="header">
        <el-input
          v-model="keyword"
          prefix-icon="el-icon-search"
          placeholder="Keywords">
        </el-input>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="loading"
        ref="table"
        :data="groupList"
        @row-dblclick="handleDblclick"
        style="width: 100%">
        <el-table-column
          width="100"
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name">
        </el-table-column>
        <el-table-column
          prop="created_by.username"
          label="Created by">
        </el-table-column>
        <el-table-column
          width="200"
          prop="create_time"
          label="Create Time">
          <template slot-scope="scope">
            {{scope.row.create_time | localtime }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operation"
          width="250">
          <div slot-scope="scope">
            <icon-btn name="Edit" icon="edit" @click.native="goEdit(scope.row)"></icon-btn>
          </div>
        </el-table-column>
      </el-table>
      <div class="panel-options">
        <el-button type="primary" size="small"
                   @click.native="showGroupDialog = true" icon="el-icon-plus">Create
        </el-button>
        <el-pagination
          class="page"
          layout="prev, pager, next"
          @current-change="currentChange"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </Panel>

    <el-dialog :title="groupDialogTitle" :visible.sync="showGroupDialog"
               @open="onOpenEditDialog" :close-on-click-modal="false">

      <el-form label-position="top">
        <el-form-item label="名称" required>
          <el-input
            v-model="group.name"
            placeholder="名称" class="title-input">
          </el-input>
        </el-form-item>
        <el-form-item label="描述" required>
          <Simditor v-model="group.description"></Simditor>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="group.password"
            placeholder="密码" class="title-input">
          </el-input>
        </el-form-item>
        <div class="visible-box">
          <span>可以加入</span>
          <el-switch
            v-model="group.allow_join"
            active-text=""
            inactive-text="">
          </el-switch>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <cancel @click.native="showGroupDialog = false"></cancel>
          <save type="primary" @click.native="submitGroup"></save>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../api.js'
  import Simditor from '../../components/Simditor.vue'

  export default {
    name: 'groupList',
    components: {
      Simditor
    },
    data () {
      return {
        pageSize: 10,
        total: 0,
        groupList: [],
        keyword: '',
        loading: false,
        currentPage: 1,
        routeName: '',
        groupDialogTitle: '创建小组',
        showGroupDialog: false,
        group: {
          name: '',
          description: '',
          password: '',
          allow_join: true
        }
      }
    },
    mounted () {
      this.routeName = this.$route.name
      this.getGroupList(this.currentPage)
    },
    methods: {
      goEdit (group) {
        this.group = group
        this.showGroupDialog = true
      },
      // 切换页码回调
      currentChange (page) {
        this.currentPage = page
        this.getGroupList(page)
      },
      getGroupList (page = 1) {
        this.loading = true
        api.getGroupList((page - 1) * this.pageSize, this.pageSize, this.keyword).then(res => {
          this.total = res.data.data.total
          this.groupList = res.data.data.results
          this.loading = false
        }, res => {
          this.loading = false
        })
      },
      submitGroup () {
        if (this.group.id) {
          api.editGroup(this.group).then(res => {
            this.showGroupDialog = false
            this.getGroupList(1)
          })
        } else {
          api.createGroup(this.group).then(res => {
            this.showGroupDialog = false
            this.getGroupList(1)
          })
        }
        this.group = {
          name: '',
          description: '',
          password: '',
          allow_join: true
        }
      }
    },
    watch: {
      '$route' (newVal, oldVal) {
        this.routeName = newVal.name
        this.getGroupList(this.currentPage)
      },
      'keyword' () {
        this.currentChange()
      }
    }
  }
</script>

<style scoped lang="less">
</style>
