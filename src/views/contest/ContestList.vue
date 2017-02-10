<template>
  <div class="view">
    <Panel title="Contest List">
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
        :data="contestList"
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <div>
              <el-tag :type="props.row.visible ? 'success' : 'danger'">{{props.row.visible ? 'Visible' : 'Invisible'}}</el-tag>
              <el-tag :type="props.row.contest_status === 'Public' ? 'success' : 'primary'">{{ props.row.contest_type}}</el-tag>
              <el-tag :type="props.row.status === 'Ended' ? 'gray' : props.row.status === 'Underway' ? 'success' : 'primary'">{{ props.row.status }}</el-tag>
            </div>
            <p>
              Create Time: {{ props.row.create_time }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="title"
          label="Title">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="Start Time">
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="End Time">
        </el-table-column>
        <el-table-column
          prop="created_by.username"
          label="Author">
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          fixed="right"
          label="Operation">
          <div>
            <icon-btn name="Edit" icon="edit"></icon-btn>
            <icon-btn name="Problem" icon="list-ol"></icon-btn>
            <icon-btn name="Announcement" icon="info-circle"></icon-btn>
          </div>
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
  </div>
</template>

<script>
  import api from '../../api.js'

  export default{
    name: 'ContestList',
    data () {
      return {
        pageSize: 5,
        total: 0,
        contestList: [],
        keyword: '',
        loading: false,
        currentPage: 0
      }
    },
    mounted () {
      this.getContestList(1)
    },
    activated () {
      if (this.$route.query.refresh !== undefined) {
        this.getContestList(this.currentPage)
      }
    },
    methods: {
      // 切换页码回调
      currentChange (page) {
        this.currentPage = page
        this.getContestList(page)
      },
      getContestList (page) {
        this.loading = true
        api.getContestList((page - 1) * this.pageSize, this.pageSize, this.keyword).then(res => {
          this.loading = false
          this.total = res.data.data.total
          this.contestList = res.data.data.results
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
