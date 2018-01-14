<template>
  <div>
    <panel title="Export Problems">
      <el-table :data="problems"
                v-loading="loadingProblems" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="60">
        </el-table-column>
        <el-table-column
          label="ID"
          width="100"
          prop="id">
        </el-table-column>
        <el-table-column
          label="DisplayID"
          width="200"
          prop="_id">
        </el-table-column>
        <el-table-column
          label="Title"
          prop="title">
        </el-table-column>
        <el-table-column
          prop="created_by.username"
          label="Author">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="Create Time">
          <template slot-scope="scope">
            {{scope.row.create_time | localtime }}
          </template>
        </el-table-column>
      </el-table>

      <div class="panel-options">
        <el-button type="primary" size="small" v-show="selected_problems.length"
                   @click="exportProblems" icon="el-icon-fa-arrow-down">Export
        </el-button>
        <el-pagination
          class="page"
          layout="prev, pager, next"
          @current-change="getProblems"
          :page-size="limit"
          :total="total">
        </el-pagination>
      </div>
    </panel>
    <panel title="Import Problems">
      <el-upload
        action="/api/admin/import_problem"
        name="file"
        :show-file-list="false"
        :with-credentials="true"
        :on-success="uploadSucceeded"
        :on-error="uploadFailed">
        <el-button size="small" type="primary" icon="el-icon-fa-upload">Choose File</el-button>
      </el-upload>
    </panel>
  </div>
</template>
<script>
  import api from '@admin/api'
  import utils from '@/utils/utils'

  export default {
    name: 'import_and_export',
    data () {
      return {
        page: 1,
        limit: 10,
        total: 0,
        loadingProblems: false,
        loadingImporting: false,
        problems: [],
        selected_problems: []
      }
    },
    mounted () {
      this.getProblems()
    },
    methods: {
      handleSelectionChange (val) {
        this.selected_problems = val
      },
      getProblems (page = 1) {
        let params = {
          offset: (page - 1) * this.limit,
          limit: this.limit
        }
        this.loadingProblems = true
        api.getProblemList(params).then(res => {
          this.problems = res.data.data.results
          this.loadingProblems = false
        })
      },
      exportProblems () {
        let params = []
        for (let p of this.selected_problems) {
          params.push('problem_id=' + p.id)
        }
        let url = '/admin/export_problem?' + params.join('&')
        utils.downloadFile(url)
      },
      uploadSucceeded (response) {
        if (response.error) {
          this.$error(response.data)
        } else {
          this.$success('Successfully imported ' + response.data.import_count + ' problems')
          this.getProblems()
        }
      },
      uploadFailed () {
        this.$error('Upload failed')
      }
    }
  }
</script>

<style scoped lang="less">

</style>
