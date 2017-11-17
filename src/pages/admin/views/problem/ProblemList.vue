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
        @cell-dblclick="handleDblclick"
        style="width: 100%">
        <el-table-column
          width="100"
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          width="150"
          label="Display ID">
          <template slot-scope="{row}">
            <span v-show="!row.isEditing">{{row._id}}</span>
            <el-input v-show="row.isEditing" v-model="row._id" @keyup.enter.native="handleInlineEdit(row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="Title">
          <template slot-scope="{row}">
            <span v-show="!row.isEditing">{{row.title}}</span>
            <el-input v-show="row.isEditing" v-model="row.title" @keyup.enter.native="handleInlineEdit(row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_by.username"
          label="Author">
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
          width="100"
          prop="visible"
          label="Visible">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.visible"
                       on-text=""
                       off-text=""
                       @change="handleInlineEdit(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operation"
          width="180">
          <div slot-scope="scope">
            <icon-btn name="Edit" icon="edit" @click.native="goEdit(scope.row.id)"></icon-btn>
            <icon-btn v-if="contestId" name="Make Public" icon="clone"
                      @click.native="makeContestProblemPublic(scope.row.id)"></icon-btn>
            <icon-btn icon="download" name="Download TestCase"
                      @click.native="downloadTestCase(scope.row.id)"></icon-btn>
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
  import utils from '@/utils/utils'

  export default {
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
        contestId: '',
        // for make public use
        currentProblemID: '',
        makePublicDialogVisible: false
      }
    },
    mounted () {
      this.routeName = this.$route.name
      this.contestId = this.$route.params.contestId
      this.getProblemList(this.currentPage)
    },
    methods: {
      handleDblclick (row) {
        row.isEditing = true
      },
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
          for (let problem of res.data.data.results) {
            problem.isEditing = false
          }
          this.problemList = res.data.data.results
        }, res => {
          this.loading = false
        })
      },
      makeContestProblemPublic (problemID) {
        this.$prompt('Please input display id for the public problem', 'confirm').then(({value}) => {
          api.makeContestProblemPublic({id: problemID, display_id: value}).catch()
        }, () => {
        })
      },
      handleInlineEdit (row) {
        this.$confirm('Sure to update the problem?', '', {
          type: 'warning'
        }).then(() => {
          let data = Object.assign({}, row)
          let funcName = ''
          if (this.contestId) {
            data.contest_id = this.contestId
            funcName = 'editContestProblem'
          } else {
            funcName = 'editProblem'
          }
          api[funcName](data).then(res => {
            this.getProblemList(this.currentPage)
          }).catch()
        }).catch(() => {
          this.getProblemList(this.currentPage)
        })
      },
      downloadTestCase (problemID) {
        let url = '/admin/test_case?problem_id=' + problemID
        utils.downloadFile(url)
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
