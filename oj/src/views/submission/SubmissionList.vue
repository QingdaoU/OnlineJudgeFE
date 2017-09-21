<template>
  <div class="flex-container">
    <div id="main">
      <Panel shadow>
        <div slot="title">{{title}}</div>
        <div slot="extra">
          <ul class="filter">
            <li>
              <Dropdown @on-click="handleResultChange">
                <span>{{status}}
                  <Icon type="arrow-down-b"></Icon>
                </span>
                <Dropdown-menu slot="list">
                  <Dropdown-item name="">All</Dropdown-item>
                  <Dropdown-item v-for="status in Object.keys(JUDGE_STATUS)" :key="status" :name="status">
                    {{JUDGE_STATUS[status].name}}
                  </Dropdown-item>
                </Dropdown-menu>
              </Dropdown>
            </li>

            <li>
              <i-switch size="large" v-model="myself" @on-change="handleSwitchChange">
                <span slot="open">Mine</span>
                <span slot="close">All</span>
              </i-switch>
            </li>
          </ul>
        </div>
        <Table stripe :disabled-hover="true" :columns="columns" :data="submissions"></Table>
        <Pagination :total="total" :page-size="limit" @on-change="changeRoute" :current.sync="page"></Pagination>
      </Panel>
    </div>
    <div id="contest-menu" v-if="contestID">
      <VerticalMenu @on-click="goRoute">
        <VerticalMenu-item :route="{name: 'contest-problem-list', params: {contestID: contestID}}">
          <Icon type="ios-photos"></Icon>
          Problems
        </VerticalMenu-item>

        <VerticalMenu-item :route="{name: 'contest-announcement-list', params: {contestID: contestID}}">
          <Icon type="chatbubble-working"></Icon>
          Announcements
        </VerticalMenu-item>

        <VerticalMenu-item :route="{name: 'submission-list' ,query: {contestID: contestID}}">
          <Icon type="navicon-round"></Icon>
          Submissions
        </VerticalMenu-item>

        <VerticalMenu-item :route="{name: 'contest-rank', params: {contestID: contestID}}">
          <Icon type="stats-bars"></Icon>
          Ranklist
        </VerticalMenu-item>

        <VerticalMenu-item :route="{name: 'contest-details', params: {contestID: contestID}}">
          <Icon type="home"></Icon>
          Overview
        </VerticalMenu-item>
      </VerticalMenu>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {JUDGE_STATUS} from '@/utils/consts'
  import utils from '@/utils/utils'
  import time from '@/utils/time'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'submissionList',
    components: {
      Pagination
    },
    data() {
      return {
        myself: false,
        result: '',
        columns: [
          {
            title: 'When',
            align: 'center',
            render: (h, params) => {
              return h('span', time.utcToLocal(params.row.create_time))
            }
          },
          {
            title: 'ID',
            align: 'center',
            render: (h, params) => {
              if (params.row.show_link) {
                return h('span', {
                  style: {
                    color: '#57a3f3',
                    cursor: 'pointer'
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
              return h('span',
                {
                  style: {
                    color: '#57a3f3',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      if (this.contestID) {
                        this.$router.push(
                          {
                            name: 'contest-problem-details',
                            params: {problemID: params.row.problem_id, contestID: this.contestID}
                          })
                      } else {
                        this.$router.push({name: 'problem-details', params: {problemID: params.row.problem_id}})
                      }
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
        limit: 10,
        page: 1,
        contestID: '',
        problemID: '',
        routeName: '',
        JUDGE_STATUS: ''
      }
    },
    mounted() {
      this.init()
      this.JUDGE_STATUS = Object.assign({}, JUDGE_STATUS)
      // 去除submitting的状态
      delete this.JUDGE_STATUS['9']
    },
    methods: {
      init() {
        let query = this.$route.query
        this.contestID = query.contestID
        this.problemID = query.problemID
        this.myself = query.myself === '1'
        this.result = query.result || ''
        this.page = parseInt(query.page) || 1
        this.routeName = this.$route.name
        this.getSubmissions()
      },
      getSubmissions() {
        this.$Loading.start()
        let params = {
          'result': this.result,
          'myself': this.myself === true ? '1' : '0',
          'problem_id': this.problemID,
          'contest_id': this.contestID
        }
        let offset = (this.page - 1) * this.limit
        api.getSubmissionList(offset, this.limit, params).then(res => {
          this.$Loading.finish()
          this.submissions = res.data.data.results
          this.total = res.data.data.total
        }, _ => {
          this.$Loading.error()
        })
      },
      // 改变route， 通过监听route变化请求数据，这样可以产生route history， 用户返回时就会保存之前的状态
      changeRoute() {
        let query = {
          contestID: this.contestID,
          problemID: this.problemID,
          myself: this.myself === true ? '1' : '0',
          result: this.result,
          page: this.page
        }
        this.$router.push({
          name: 'submission-list',
          query: utils.filterEmptyValue(query)
        })
      },
      goRoute(route) {
        this.$router.push(route)
      },
      handleResultChange(status) {
        this.result = status
        this.changeRoute()
      },
      handleSwitchChange() {
        this.page = 1
        this.changeRoute()
      }
    },
    computed: {
      title() {
        return this.contestID === undefined ? 'Status' : 'Submissions'
      },
      status() {
        return this.result === '' ? 'Status' : JUDGE_STATUS[this.result].name
      }
    },
    watch: {
      '$route'(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .ivu-btn-text {
    color: #57a3f3;
  }

  .flex-container {
    #main {
      flex: auto;
      margin-right: 18px;
    }
    #contest-menu {
      flex: none;
      width: 210px;
    }
  }
</style>
