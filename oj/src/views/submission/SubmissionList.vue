<template>
  <Row type="flex" justify="space-around">
    <Col :span="23">
    <Table stripe :disabled-hover="true" :columns="columns" :data="submissions"></Table>
    <Pagination :total="total" :pageSize="pageSize" @on-change="changePage"></Pagination>
    </Col>
  </Row>
</template>

<script>
  import api from '@/api'
  import bus from '@/utils/eventBus'
  import {JUDGE_STATUS} from '@/utils/consts'
  import utils from '@/utils/utils'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'submissionList',
    components: {
      Pagination
    },
    data() {
      return {
        columns: [
          {
            title: 'When',
            align: 'center',
            render: (h, params) => {
              return h('span', utils.backendDatetimeFormat(params.row.created_time))
            }
          },
          {
            title: 'ID',
            align: 'center',
            render: (h, params) => {
              if (params.row.show_link) {
                return h('Button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#57a3f3'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/status/' + params.row.id)
                    }
                  }
                }, params.row.id.slice(0, 12))
              } else {
                return h('span', params.row.id.slice(0, 12))
              }
            }
          },
          {
            title: 'Status',
            align: 'center',
            width: 180,
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: JUDGE_STATUS[params.row.result].color
                }
              }, JUDGE_STATUS[params.row.result].name)
            }
          },
          {
            title: 'Problem ID',
            align: 'center',
            render: (h, params) => {
              return h('Button',
                {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#57a3f3'
                  },
                  on: {
                    click: () => {
                      this.$router.push('/problem/' + params.row.problem_id)
                    }
                  }
                },
                params.row.problem_id)
            }
          },
          {
            title: 'Time',
            align: 'center',
            render: (h, params) => {
              return h('span', utils.submissionTimeFormat(params.row.statistic_info.time_cost))
            }
          },
          {
            title: 'Memory',
            align: 'center',
            render: (h, params) => {
              return h('span', utils.submissionMemoryFormat(params.row.statistic_info.memory_cost))
            }
          },
          {
            title: 'Language',
            align: 'center',
            key: 'language'
          },
          {
            title: 'Author',
            align: 'center',
            key: 'username'
          }
        ],
        submissions: [],
        total: 30,
        pageSize: 10,
        contest_id: '',
        problem_id: '',
        route_name: ''
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.contestID = this.$route.query.contestID
        this.problemID = this.$route.query.problemID
        this.routeName = this.$route.name
        this.getSubmissions()
        this.getProblemName()
      },
      getProblemName() {
        let _id = this.problemID
        if (_id !== undefined) {
          api.getProblem(_id).then((res) => {
            bus.$emit('changeBread', res.data.data.title)
          })
        }
      },
      // TODO myself 添加切换按钮
      getSubmissions(offset = 0, limit = this.pageSize) {
        let funcName = this.contestID === undefined ? 'getSubmissionList' : 'getContestSubmissionList'
        let params = {
          myself: 0,
          problem_id: this.problemID,
          contest_id: this.contestID
        }
        api[funcName](offset, limit, params).then((res) => {
          this.submissions = res.data.data.results
          this.total = res.data.data.total
        })
      },
      changePage(page) {
        this.getSubmissions((page - 1) * this.pageSize, this.pageSize)
      }
    },
    watch: {
      '$route'() {
        this.init()
      }
    }
  }
</script>

<style scoped lang="less">
  .ivu-btn-text {
    color: #57a3f3;
  }
</style>
