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
            <icon-btn name="Edit" icon="edit" @click.native="goEdit(scope.row.id)"></icon-btn>
          </div>
        </el-table-column>
      </el-table>
      <div class="panel-options">
        <el-button type="primary" size="small"
                   @click="goCreateProblem" icon="el-icon-plus">Create
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
  </div>
</template>

<script>
  import api from '../../api.js'

  export default {
    name: 'groupList',
    data () {
      return {
        pageSize: 10,
        total: 0,
        groupList: [],
        keyword: '',
        loading: false,
        currentPage: 1,
        routeName: ''
      }
    },
    mounted () {
      this.routeName = this.$route.name
      this.getGroupList(this.currentPage)
    },
    methods: {
      goEdit (groupId) {
        this.$router.push({name: 'group-management', params: {groupId}})
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
