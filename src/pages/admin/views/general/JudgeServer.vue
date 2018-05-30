<template>
  <div class="view">
    <Panel :title="$t('m.Judge_Server_Token')">
      <code>{{ token }}</code>
    </Panel>
    <Panel :title="$t('m.Judge_Server_Info')">
      <el-table
        :data="servers"
        :default-expand-all="true"
        border>
        <el-table-column
          type="expand">
          <template slot-scope="props">
            <p>{{$t('m.IP')}}:
              <el-tag type="success">{{ props.row.ip }}</el-tag>&nbsp;&nbsp;
              {{$t('m.Judger_Version')}}:
              <el-tag type="success">{{ props.row.judger_version }}</el-tag>
            </p>
            <p>{{$t('m.Service_URL')}}: <code>{{ props.row.service_url }}</code></p>
            <p>{{$t('m.Last_Heartbeat')}}: {{ props.row.last_heartbeat | localtime}}</p>
            <p>{{$t('m.Create_Time')}}: {{ props.row.create_time | localtime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status">
          <template slot-scope="scope">
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
          <template slot-scope="scope">{{ scope.row.cpu_usage }}%</template>
        </el-table-column>
        <el-table-column
          prop="memory_usage"
          label="Memory Usage">
          <template slot-scope="scope">{{ scope.row.memory_usage }}%</template>
        </el-table-column>
        <el-table-column label="Disabled">
          <template slot-scope="{row}">
            <el-switch v-model="row.is_disabled" @change="handleDisabledSwitch(row.id, row.is_disabled)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Options">
          <template slot-scope="scope">
            <icon-btn name="Delete" icon="trash" @click.native="deleteJudgeServer(scope.row.hostname)"></icon-btn>
          </template>
        </el-table-column>
      </el-table>
    </Panel>
  </div>
</template>

<script>
  import api from '../../api.js'

  export default {
    name: 'JudgeServer',
    data () {
      return {
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
        api.getJudgeServer().then(res => {
          this.servers = res.data.data.servers
          this.token = res.data.data.token
        })
      },
      deleteJudgeServer (hostname) {
        this.$confirm('If you delete this judge server, it can\'t be used until next heartbeat', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          api.deleteJudgeServer(hostname).then(res =>
            this.refreshJudgeServerList()
          )
        }).catch(() => {
        })
      },
      handleDisabledSwitch (id, value) {
        let data = {
          id,
          is_disabled: value
        }
        api.updateJudgeServer(data).catch(() => {})
      }
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(this.intervalId)
      next()
    }
  }
</script>
