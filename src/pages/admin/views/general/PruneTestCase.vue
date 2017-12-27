<template>
  <div>
    <panel>
      <span slot="title">Prune Test Case
        <el-popover placement="right" trigger="hover">
          These test cases are not owned by any problem, you can clean them safely.
          <i slot="reference" class="el-icon-fa-question-circle import-user-icon"></i>
        </el-popover>
      </span>
      <el-table :data="data">
        <el-table-column
          label="Last Modified">
          <template slot-scope="{row}">
            {{row.create_time | timestampFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="Test Case ID">
        </el-table-column>
        <el-table-column
          label="Option"
          fixed="right"
          width="200">
          <template slot-scope="{row}">
            <icon-btn name="Delete" icon="trash" @click.native="deleteTestCase(row.id)"></icon-btn>
          </template>
        </el-table-column>
      </el-table>
      <div class="panel-options" v-show="data.length > 0">
        <el-button type="warning" size="small"
                   :loading="loading"
                   icon="el-icon-fa-trash"
                   @click="deleteTestCase()">Delete All
        </el-button>
      </div>
    </panel>
  </div>
</template>

<script>
  import api from '@admin/api'
  import moment from 'moment'

  export default {
    name: 'prune-test-case',
    data () {
      return {
        data: [],
        loading: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        api.getInvalidTestCaseList().then(resp => {
          this.data = resp.data.data
        }, () => {
        })
      },
      deleteTestCase (id) {
        if (!id) {
          this.loading = true
        }
        api.pruneTestCase(id).then(resp => {
          this.loading = false
          this.init()
        })
      }
    },
    filters: {
      timestampFormat (value) {
        return moment.unix(value).format('YYYY-M-D  HH:mm:ss')
      }
    }
  }
</script>

<style>

</style>
