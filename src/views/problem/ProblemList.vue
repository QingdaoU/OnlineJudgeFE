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
        <el-table-column type="expand">
          <template scope="props">
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
          prop="rule_type"
          label="Rule Type">
        </el-table-column>
        <el-table-column
          prop="source"
          label="Source">
        </el-table-column>
        <el-table-column
          label="difficulty">
          <template scope="props">
            <el-tag type="gray">{{props.row.difficulty}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_accepted_number"
          label="Accepted/Submit"
          width="180">
          <template scope="props">
            {{props.row.total_accepted_number + '/' + props.row.total_submit_number}}
          </template>
        </el-table-column>
        <el-table-column
          label="Submit Number">
          <template scope="props">
            <el-tag :type="props.row.visible ? 'success' : 'danger'">{{props.row.visible ? 'Visible' : 'Invisible'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          fixed="right"
          label="操作"
          width="120">
            <el-button-group>
              <el-button @click="goEdit(row.id)" size="mini" type="warning">编辑</el-button>
              <el-button size="mini" @click="delClient(row.id)" type="danger">删除</el-button>
            </el-button-group>
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
  import Panel from '../../components/Panel.vue'
  export default{
    name: 'ProblemList',
    components: {
      Panel
    },
    data () {
      return {
        pageSize: 5,
        total: 0,
        problemList: [],
        keyword: '',
        loading: false,
        currentPage: 0
      }
    },
    mounted () {
      this.getProblemList()
    },
    activated () {
      if (this.$route.query.refresh !== undefined) {
        this.getProblemList(this.currentPage)
      }
    },
    methods: {
      goEdit (id) {
        this.$router.push({name: 'edit-problem', params: {id}})
      },
      // 切换页码回调
      currentChange (page) {
        this.currentPage = page
        this.getProblemList(page)
      },
      getProblemList (page = 1) {
        this.loading = true
        api.getProblemList((page - 1) * this.pageSize, this.pageSize, this.keyword).then(res => {
          this.loading = false
          this.total = res.data.data.total
          this.problemList = res.data.data.results
        }, res => {
          this.loading = false
        })
      }
    },
    watch: {
      'keyword' () {
        this.currentChange()
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
