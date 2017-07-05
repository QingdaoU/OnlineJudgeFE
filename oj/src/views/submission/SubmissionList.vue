<template>
  <Row type="flex" justify="space-around">
    <Col :span="23">
    <Table stripe :disabled-hover="true" :columns="columns" :data="submissions"></Table>
    </Col>
  </Row>
</template>

<script>
  import api from '@/api'
  import bus from '@/utils/eventBus'
  import {STATUS} from '@/utils/consts'
  import utils from '@/utils/utils'
  export default {
    name: 'submissionList',
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
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: STATUS[params.row.result].color
                }
              }, STATUS[params.row.result].name)
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
              return h('span', params.row.statistic_info.time_cost + 'MS')
            }
          },
          {
            title: 'Memory',
            align: 'center',
            render: (h, params) => {
              return h('span', this.parseMemory(params.row.statistic_info.memory_cost))
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
        submissions: []
      }
    },
    created() {
      this.getSubmissions()
      this.getProblemName()
    },
    methods: {
      parseMemory(memory) {
        // 1048576 = 1024 * 1024
        let t = parseInt(memory) / 1048576
        return String(t.toFixed(0)) + 'MB'
      },
      getProblemName() {
        let _id = this.$route.params.id
        if (_id !== undefined) {
          api.getProblem(_id).then((res) => {
            bus.$emit('changeBread', res.data.data.title)
          })
        }
      },
      getSubmissions() {
        let params = {
          myself: true,
          problem_id: this.$route.params.id
        }
        api.getSubmissionList(params).then((res) => {
          console.log(res.data.data)
          this.submissions = res.data.data
        })
      }
    },
    watch: {
      '$route'() {
        this.getSubmissions()
        this.getProblemName()
      }
    }
  }
</script>

<style scoped lang="less">
  .ivu-btn-text {
    color: #57a3f3;
  }
</style>
