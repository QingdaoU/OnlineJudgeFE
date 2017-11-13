<template>
  <Panel shadow>
    <div slot="title">{{ contest.title }}</div>
    <div slot="extra">
      <Poptip trigger="hover" placement="left-start">
        <Icon type="android-settings" size="20"></Icon>
        <div slot="content" id="switches">
          <p>
            <span>Menu</span>
            <i-switch v-model="showMenu"></i-switch>
            <span>Chart</span>
            <i-switch v-model="showChart"></i-switch>
          </p>
          <p style="margin-top: 10px">
            <span>Auto Refresh(10s)</span>
            <i-switch @on-change="handleAutoRefresh"></i-switch>
          </p>
        </div>
      </Poptip>
    </div>
    <div v-if="showChart" class="echarts">
      <ECharts :options="options" ref="chart" auto-resize></ECharts>
    </div>
    <Table ref="tableRank" :columns="columns" :data="dataRank" disabled-hover></Table>
    <Pagination :total="total"
                :page-size.sync="limit"
                :current.sync="page"
                @on-change="getContestRankData"
                @on-page-size-change="getContestRankData(1)"
                show-sizer></Pagination>
  </Panel>
</template>
<script>
  import Pagination from '@oj/components/Pagination'

  import { mapActions, mapState } from 'vuex'
  import { types } from '@oj/store'
  import api from '@oj/api'

  export default {
    name: 'acm-contest-rank',
    components: {
      Pagination
    },
    data () {
      return {
        total: 0,
        page: 1,
        contestID: '',
        columns: [
          {
            align: 'center',
            width: 60,
            render: (h, params) => {
              return h('span', {}, params.index + (this.page - 1) * this.limit + 1)
            }
          },
          {
            title: 'User',
            align: 'center',
            width: 250,
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text'
                },
                'class': {
                  'link-button': true
                },
                on: {
                  click: () => {
                    this.$router.push(
                      {
                        name: 'user-home',
                        query: {username: params.row.user.username}
                      })
                  }
                }
              }, params.row.user.username)
            }
          },
          {
            title: 'Total Score',
            align: 'center',
            width: 150,
            key: 'total_score'
          }
        ],
        dataRank: [],
        options: {
          title: {
            text: 'Top 10 Teams',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true, readOnly: true},
              magicType: {show: true, type: ['line', 'bar']},
              saveAsImage: {show: true}
            },
            right: '10%'
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['root'],
              boundaryGap: true,
              axisLabel: {
                interval: 0,
                showMinLabel: true,
                showMaxLabel: true,
                align: 'center',
                formatter: (value, index) => {
                  return value.replace(/(.{8})/g, '$1\n')
                }
              },
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Score',
              type: 'bar',
              barMaxWidth: '80',
              data: [0],
              markPoint: {
                data: [
                  {type: 'max', name: 'max'}
                ]
              }
            }
          ]
        }
      }
    },
    mounted () {
      this.contestID = this.$route.params.contestID
      this.getContestRankData(1)
      if (this.contestProblems.length === 0) {
        this.getContestProblems().then((res) => {
          this.addTableColumns(res.data.data)
        })
      } else {
        this.addTableColumns(this.contestProblems)
      }
    },
    methods: {
      ...mapActions(['getContestProblems']),
      getContestRankData (page = 1, refresh = false) {
        let offset = (page - 1) * this.limit
        if (this.showChart && !refresh) {
          this.$refs.chart.showLoading({maskColor: 'rgba(250, 250, 250, 0.8)'})
        }
        api.getContestRank(offset, this.limit, this.$route.params.contestID).then(res => {
          if (this.showChart && !refresh) {
            this.$refs.chart.hideLoading()
          }
          this.total = res.data.data.total
          if (page === 1) {
            this.applyToChart(res.data.data.results.slice(0, 10))
          }
          this.applyToTable(res.data.data.results)
        })
      },
      applyToChart (rankData) {
        let [usernames, scores] = [[], []]
        rankData.forEach(ele => {
          usernames.push(ele.user.username)
          scores.push(ele.total_score)
        })
        this.options.xAxis[0].data = usernames
        this.options.series[0].data = scores
      },
      applyToTable (data) {
        // deepcopy
        let dataRank = JSON.parse(JSON.stringify(data))
        // 从submission_info中取出相应的problem_id 放入到父object中,这么做主要是为了适应iview table的data格式
        // 见https://www.iviewui.com/components/table
        dataRank.forEach((rank, i) => {
          let info = rank.submission_info
          Object.keys(info).forEach(problemID => {
            dataRank[i][problemID] = info[problemID]
          })
        })
        this.dataRank = dataRank
      },
      addTableColumns (problems) {
        problems.forEach(problem => {
          this.columns.push({
            align: 'center',
            key: problem.id,
            renderHeader: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'contest-problem-details',
                      params: {
                        contestID: this.contestID,
                        problemID: problem._id
                      }
                    })
                  }
                }
              }, problem._id)
            },
            render: (h, params) => {
              return h('span', params.row[problem.id])
            }
          })
        })
      },
      handleAutoRefresh (status) {
        if (status === true) {
          this.refreshFunc = setInterval(() => {
            this.getContestRankData(1, true)
          }, 10000)
        } else {
          clearInterval(this.refreshFunc)
        }
      }
    },
    computed: {
      ...mapState({
        'contest': state => state.contest.contest,
        'contestProblems': state => state.contest.contestProblems
      }),
      showChart: {
        get () {
          return this.$store.state.contest.showChart
        },
        set (value) {
          this.$store.commit(types.CHANGE_CONTEST_CHART_VISIBLE, {visible: value})
        }
      },
      showMenu: {
        get () {
          return this.$store.state.contest.showMenu
        },
        set (value) {
          this.$store.commit(types.CHANGE_CONTEST_MENU_VISIBLE, {visible: value})
          this.$nextTick(() => {
            this.$refs.tableRank.handleResize()
            if (this.showChart) {
              this.$refs.chart.resize()
            }
          })
        }
      },
      limit: {
        get () {
          return this.$store.state.contest.rankLimit
        },
        set (value) {
          this.$store.commit(types.CHANGE_CONTEST_RANK_LIMIT, {rankLimit: value})
        }
      }
    },
    beforeDestroy () {
      clearInterval(this.refreshFunc)
    }
  }
</script>
<style scoped lang="less">
  .echarts {
    margin: 20px auto;
    height: 400px;
    width: 98%;
  }

  #switches {
    span {
      margin-left: 5px;
    }
  }
</style>
