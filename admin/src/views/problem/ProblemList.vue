<template>
  <div class="view">
    <Panel title="Problem List">
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
        :data="problemList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="_id"
          label="Display ID">
        </el-table-column>
        <el-table-column
          prop="title"
          label="Title">
        </el-table-column>
        <el-table-column
          prop="created_by.username"
          label="Author">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="Create Time">
        </el-table-column>
        <el-table-column
          label="Status">
          <template scope="props">
            <el-tag :type="props.row.visible ? 'success' : 'danger'">{{props.row.visible ? 'Visible' : 'Invisible'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          fixed="right"
          label="Operation"
          width="180">
          <div>
            <icon-btn name="Edit" icon="edit" @click.native="goEdit(row.id)"></icon-btn>
            <icon-btn name="Submission" icon="code"></icon-btn>
          </div>
        </el-table-column>
      </el-table>
      <div class="option">
        <el-button type="primary" size="small" @click.native="goCreateProblem" icon="plus">Create</el-button>
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
    name: 'ProblemList',
    data () {
      return {
        pageSize: 10,
        total: 0,
        problemList: [],
        keyword: '',
        loading: false,
        currentPage: 1,
        routeName: '',
        contestId: ''
      }
    },
    mounted () {
      this.routeName = this.$route.name
      this.contestId = this.$route.params.contestId
      this.getProblemList(this.currentPage)
    },
    methods: {
      goEdit (problemId) {
        if (this.routeName === 'problem-list') {
          this.$router.push({name: 'edit-problem', params: {problemId}})
        } else if (this.routeName === 'contest-problem-list') {
          this.$router.push({name: 'edit-contest-problem', params: {problemId: problemId, contestId: this.contestId}})
        }
      },
      goCreateProblem () {
        if (this.routeName === 'problem-list') {
          this.$router.push({name: 'create-problem'})
        } else if (this.routeName === 'contest-problem-list') {
          this.$router.push({name: 'create-contest-problem', params: {contestId: this.contestId}})
        }
      },
      // 切换页码回调
      currentChange (page) {
        this.currentPage = page
        this.getProblemList(page)
      },
      getProblemList (page = 1) {
        this.loading = true
        let funcName = this.routeName === 'problem-list' ? 'getProblemList' : 'getContestProblemList'
        api[funcName]((page - 1) * this.pageSize, this.pageSize, this.keyword, this.contestId).then(res => {
          this.loading = false
          this.total = res.data.data.total
          this.problemList = res.data.data.results
        }, res => {
          this.loading = false
        })
      }
    },
    watch: {
      '$route' (newVal, oldVal) {
        this.contestId = newVal.params.contestId
        this.routeName = newVal.name
        this.getProblemList(this.currentPage)
      },
      'keyword' () {
        this.currentChange()
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
