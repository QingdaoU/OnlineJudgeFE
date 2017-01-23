<template>
  <div class="view">
    <Panel title="Judge Server Token">
      <el-input v-model="tokenToShow" style="width: 200px"></el-input>
    </Panel>
    <Panel title="Judge Server">
      <el-table
        :data="servers"
        border>
        <el-table-column
          prop="status"
          label="Status">
          <template scope="scope">
            <el-tag
              :type="scope.row.status === 'normal' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="last_heartbeat"
          label="Last Heartbeat">
        </el-table-column>
        <el-table-column
          prop="hostname"
          label="Hostname">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP">
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
            <el-button type="default" icon="delete" @click="deleteJudgeServer"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </Panel>
  </div>
</template>

<script>
  import api from '../api.js'
  import Panel from '../components/Panel.vue'
  export default{
    components: {
      Panel
    },
    data () {
      return {
        servers: [],
        token: ''
      }
    },
    mounted () {
      api.getJudgeServer().then(res => {
        this.servers = res.data.data.servers
        this.token = res.data.data.token
      })
    },
    methods: {
      deleteJudgeServer () {
      }
    }
  }
</script>

<style>
  #judge-server-token {
    margin-bottom: 10px;
    width: 200px;
  }
</style>
