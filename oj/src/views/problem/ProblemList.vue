<template>
  <el-row>
    <!--problemList-->
    <el-col :span=17 :offset=1>
      <el-card>
        <div slot="header">
          <span style="line-height: 20px"><strong>Filter</strong></span>
          <el-button type="primary" icon="search" size="small" class="float_right" @click="getProblemList(1)">Search</el-button>
          <el-button type="primary" size="small" class="float_right" @click="onReset">
            <i class="fa fa-refresh"></i> Reset</el-button>
        </div>
        <el-form :inline="true">
          <el-form-item label="Keyword">
            <el-input v-model="searchForm.keyword" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="Tag">
            <el-select v-model="searchForm.tag" placeholder="All">
              <el-option v-for="tagName in tagList" :label="tagName.name" :value="tagName.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="Difficulty">
            <el-select v-model="searchForm.difficulty" placeholder="All">
              <el-option label="Low" value="Low"></el-option>
              <el-option label="Mid" value="Mid"></el-option>
              <el-option label="High" value="High"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
      <el-table v-loading="problemLoading" element-loading-text="loading" :data="problemList" style="width: 100%" stripe>
        <!--<el-table-column prop="id" label="ID" width="100">-->
        <!--</el-table-column>-->
        <el-table-column prop="_id" label="ID" width="100">
        </el-table-column>
        <el-table-column label="Title">
          <template scope="scope">
            <router-link :to="{name: 'problem-details', params: {problemId: scope.row.id}}">{{ scope.row.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="Difficulty" width="100">
        </el-table-column>
        <el-table-column label="AC/Total" width="200">
          <template scope="scope">
            {{ scope.row.total_accepted_number}} / {{ scope.row.total_submit_number}}
          </template>
        </el-table-column>
        <el-table-column label="Rate" width="100">
          <template scope="scope">
            {{ getACRate(scope.row.total_accepted_number, scope.row.total_submit_number) }} %
          </template>
        </el-table-column>
      </el-table>
      <div v-if="total > 0">
        <div class="pagination">
          <el-pagination layout="prev, pager, next, jumper" @current-change="currentChange" :page-size="pageSize" :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>
  
    <!--Tag List-->
    <el-col :span=4 :offset=1>
      <el-table v-loading="tagLoading" element-loading-text="loading" :data="tagList" style="width: 100%">
        <el-table-column label="Tags">
          <template scope="scope">
            {{scope.row.name}}
            <el-tag class="float_right" type="gray">12121</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import api from '../../api.js'

export default {
  name: 'ProblemList',
  data() {
    return {
      pageSize: 4,
      total: 0,
      problemList: [],
      problemLoading: false,
      tagLoading: false,
      currentPage: 1,
      routeName: '',
      contestId: '',
      tagList: [],
      searchForm: {
        keyword: '',
        difficulty: '',
        tag: ''
      }
    }
  },
  mounted() {
    // TODO: Remove devLogin
    api.devLogin('root', 'rootroot').then(res => { })
    this.routeName = this.$route.name
    this.contestId = this.$route.params.contestId
    this.getTagList()
    this.getProblemList(this.currentPage)
  },
  methods: {
    getACRate(acCount, totalCount) {
      return totalCount === 0 ? 0.00 : (acCount / totalCount * 100).toFixed(2)
    },
    // 切换页码回调
    currentChange(page) {
      this.currentPage = page
      this.getProblemList(page)
    },
    getProblemList(page = 1) {
      this.problemLoading = true
      let funcName = this.routeName === 'problem-list' ? 'getProblemList' : 'getContestProblemList'
      let offset = (page - 1) * this.pageSize
      api[funcName](offset, this.pageSize, this.searchForm, this.contestId).then(res => {
        this.problemLoading = false
        this.total = res.data.data.total
        this.problemList = res.data.data.results
      }, res => {
        this.problemLoading = false
      })
    },
    getTagList() {
      api.getProblemTagList().then(res => {
        this.tagList = res.data.data
      })
    },
    onReset() {
      this.searchForm = {
        keyword: '',
        difficulty: 'Low',
        tag: ''
      }
      this.getProblemList(1)
    },
    toDetail(problemId) {
      this.$router.push({name: 'problem-details', params: {problemId}})
    }
  }
}
</script>

<style scoped lang="less">
.float_right {
  float: right;
  margin: 0px 5px 0px 5px;
}
a {
  text-decoration: None;
  color: #4187d6;
}
.pagination {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
