<template>
  <Row type="flex" justify="space-around">
    <Col :span="20" id="status">
    <Alert :type="status.type" showIcon>
      <span class="title">{{status.statusName}}</span>
      <div slot="desc" class="content">
        <template v-if="submission.result == -2">
          <pre>{{submission.statistic_info.err_info}}</pre>
        </template>
        <template v-else>
          <span>Time: {{submission.statistic_info.time_cost | submissionTime}}</span>
          <span>Memory: {{submission.statistic_info.memory_cost | submissionMemory}}</span>
          <span>Lang: {{submission.language}}</span>
          <span>Author: {{submission.username}}</span>
        </template>
      </div>
    </Alert>
    </Col>

    <!-- OI模式后台会返info -->
    <Col v-if="submission.info && submission.result != -2" :span="20">
    <Table stripe :disabled-hover="true" :columns="columns" :data="submission.info.data"></Table>
    </Col>

    <Col :span="20">
    <Highlight :code="submission.code" :language="submission.language" :border-color="status.color"></Highlight>
    </Col>
    <Col v-if="submission.can_unshare" :span="20">
    <div id="share-btn">
      <Button v-if="submission.shared"
              type="warning" size="large" @click="shareSubmission(false)">
        UnShare
      </Button>
      <Button v-else
              type="primary" size="large" @click="shareSubmission(true)">
        Share
      </Button>
    </div>
    </Col>
  </Row>

</template>

<script>
  import api from '@/api'
  import { JUDGE_STATUS } from '@/utils/constants'
  import utils from '@/utils/utils'
  import Highlight from '@/components/Highlight'

  export default {
    name: 'submissionDetails',
    components: {
      Highlight
    },
    data () {
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
                  color: JUDGE_STATUS[params.row.result].color
                }
              }, JUDGE_STATUS[params.row.result].name)
            }
          },
          {
            title: 'Time',
            align: 'center',
            render: (h, params) => {
              return h('span', utils.submissionTimeFormat(params.row.cpu_time))
            }
          },
          {
            title: 'Memory',
            align: 'center',
            render: (h, params) => {
              return h('span', utils.submissionMemoryFormat(params.row.memory))
            }
          },
          {
            title: 'Score',
            align: 'center',
            key: 'score'
          }
        ],
        submission: {
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
    mounted () {
      this.getSubmission()
    },
    methods: {
      getSubmission () {
        api.getSubmission(this.$route.params.id).then(res => {
          let data = res.data.data
          if (data.info && !data.info.data[0].score) {
            this.columns.splice(this.columns.length - 1, 1)
          }
          this.submission = data
        }, () => {
        })
      },
      shareSubmission (shared) {
        let data = {id: this.submission.id, shared: shared}
        api.updateSubmission(data).then(res => {
          this.getSubmission()
        }, () => {
        })
      }
    },
    computed: {
      status () {
        return {
          type: JUDGE_STATUS[this.submission.result].type,
          statusName: JUDGE_STATUS[this.submission.result].name,
          color: JUDGE_STATUS[this.submission.result].color
        }
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

  #share-btn {
    float: right;
    margin-top: 5px;
    margin-right: 10px;
  }
  pre {
    border: none;
    background: none;
  }
</style>
