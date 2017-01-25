<template>
  <div class="view">
    <Panel title="Judge Server Token">
      <el-input v-model="token" style="width: 200px"></el-input>
    </Panel>
    <Panel title="Judge Server">
      <el-table
        :data="servers"
        :default-expand-all="true"
        v-loading="loading"
        border>
        <el-table-column
          type="expand">
          <template scope="props">
            <p>IP: <el-tag type="success">{{ props.row.ip }}</el-tag>&nbsp;&nbsp;
              Judger Version: <el-tag type="success">{{ props.row.judger_version }}</el-tag>
            </p>
            <p>Service URL: <code>{{ props.row.service_url }}</code></p>
            <p>Last Heartbeat: {{ props.row.last_heartbeat}}&nbsp;&nbsp;Create Time: {{ props.row.create_time }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status">
          <template scope="scope">
            <el-tag
              :type="scope.row.status === 'normal' ? 'success' : 'danger'">
              {{ scope.row.status === 'normal' ? 'Normal' : 'Abnormal' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="hostname"
          label="Hostname">
        </el-table-column>
        <el-table-column
          prop="task_number"
          label="Task Number">
        </el-table-column>
        <el-table-column
          prop="cpu_core"
          label="CPU Core">
        </el-table-column>
        <el-table-column
          prop="cpu_usage"
          label="CPU Usage">
          <template scope="scope">{{ scope.row.cpu_usage }}%</template>
        </el-table-column>
        <el-table-column
          prop="memory_usage"
          label="Memory Usage">
          <template scope="scope">{{ scope.row.memory_usage }}%</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="option">
          <template scope="scope">
            <el-button type="text" class="btn" size="small" @click="deleteJudgeServer(scope.row.hostname)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Panel>
  </div>
</template>

<script>
  import api from '../../api.js'
  import Panel from '../../components/Panel.vue'
  export default{
    components: {
      Panel
    },
    data () {
      return {
        loading: true,
        servers: [],
        token: '',
        intervalId: -1
      }
    },
    mounted () {
      this.refreshJudgeServerList()
      this.intervalId = setInterval(() => {
        this.refreshJudgeServerList()
      }, 5000)
    },
    methods: {
      refreshJudgeServerList () {
        this.loading = true
        api.getJudgeServer().then(res => {
          this.servers = res.data.data.servers
          this.token = res.data.data.token
          this.loading = false
        })
      },
      deleteJudgeServer (hostname) {
        this.$confirm('If you delete this judge server, it can\'t be used until next heartbeat', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.loading = true
          api.deleteJudgeServer(hostname).then(res =>
            this.refreshJudgeServerList()
          )
        }).catch(() => {})
      }
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(this.intervalId)
      next()
    }
  }
</script>
