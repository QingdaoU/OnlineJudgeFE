<template>
  <Row type="flex" justify="space-around">
    <Col :span="20" id="status">
    <Alert :type="type" showIcon>
      <span class="title">{{statusName}}</span>
      <div slot="desc" class="content">
        <template v-if="data.result == -2">
          {{data.statistic_info.err_info}}
        </template>
        <template v-else>
          <span>Time: {{data.statistic_info.time_cost}}MS</span>
          <span>Memory: {{parseMemory(data.statistic_info.memory_cost)}}MB</span>
          <span>Lang: {{data.language}}</span>
        </template>
      </div>
    </Alert>
    </Col>

    <!-- OI模式后台会返info -->
    <Col v-if="data.info && data.result != -2" :span="20">
    <Table stripe :disabled-hover="true" :columns="columns" :data="data.info.data"></Table>
    </Col>

    <Col :span="20">
    <Highlight :code="data.code" :language="data.language" :border-color="color"></Highlight>
    </Col>
  </Row>

</template>

<script>
  import api from '@/api'
  import {STATUS} from '@/utils/consts'
  import utils from '@/utils/utils'
  import Highlight from '@/components/Highlight'
  export default {
    name: 'submissionDetails',
    components: {
      Highlight
    },
    data() {
      return {
        columns: [
          {
            title: 'ID',
            align: 'center',
            type: 'index'
          },
          {
            title: 'Status',
            align: 'center',
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: STATUS[params.row.result].color
                }
              }, STATUS[params.row.result].name)
            }
          },
          {
            title: 'Time',
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.cpu_time + 'MS')
            }
          },
          {
            title: 'Memory',
            align: 'center',
            render: (h, params) => {
              return h('span', utils.backendMemoryFormat(params.row.memory) + 'MB')
            }
          }
        ],
        data: {
          result: '0',
          code: '',
          info: {
            data: []
          },
          statistic_info: {
            time_cost: '',
            memory_cost: ''
          }
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      api.getSubmission(to.params.id).then((res) => {
        console.log(res.data.data)
        next((vm) => {
          vm.data = res.data.data
        })
      }, (res) => {
        next()
      })
    },
    methods: {
      parseMemory(memory) {
        return utils.backendMemoryFormat(memory)
      }
    },
    computed: {
      type() {
        return STATUS[this.data.result].type
      },
      statusName() {
        return STATUS[this.data.result].name
      },
      color() {
        return STATUS[this.data.result].color
      }
    }
  }
</script>

<style scoped lang="less">
  #status {
    .title {
      font-size: 20px;
    }
    .content {
      margin-top: 10px;
      font-size: 14px;
      span {
        margin-right: 10px;
      }
    }
  }
</style>
