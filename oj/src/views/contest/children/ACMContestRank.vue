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
                :page-size.sync=limit
                @on-change="getContestRankData"
                @on-page-size-change="getContestRankData(1)"
                show-sizer></Pagination>
  </Panel>
</template>
<script>
  import moment from 'moment'
  import Pagination from '~/Pagination'

  import { mapActions, mapState } from 'vuex'
  import { types } from '@/store'
  import api from '@/api'
  import time from '@/utils/time'

  export default {
    name: 'acm-contest-rank',
    components: {
      Pagination
    },
    data () {
      return {
        total: 0,
        contestID: '',
        columns: [
          {
            title: '#',
            type: 'index',
            width: 60
          },
          {
            title: 'User',
            align: 'center',
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
            title: 'AC / Total',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.accepted_number + ' / ' + params.row.submission_number)
            }
          },
          {
            title: 'TotalTime',
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.total_time)
            }
          }
        ],
        dataRank: [],
        options: {
          title: {
            text: 'Top 10 Teams',
            left: 'center',
            top: '0'
          },
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 0,
              end: 100
            }
          ],
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {show: true, title: 'save as image'}
            },
            right: '5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              axis: 'x'
            }
          },
          legend: {
            orient: 'vertical',
            y: 'center',
            right: 30,
            data: []
          },
          xAxis: [{
            type: 'time',
            splitLine: false,
            axisPointer: {
              show: true,
              snap: true
            }
          }],
          yAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [0]
            }],
          series: []
        }
      }
    },
    mounted () {
      this.contestID = this.$route.params.contestID
      this.getContestRankData(1)
      if (this.contestProblems.length === 0) {
        this.getContestProblems().then((res) => {
          this.addTableColumns(res.data.data)
          this.addChartCategory(res.data.data)
        })
      } else {
        this.addTableColumns(this.contestProblems)
        this.addChartCategory(this.contestProblems)
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
      addChartCategory (contestProblems) {
        let category = []
        for (let i = 0; i <= contestProblems.length; ++i) {
          category.push(i)
        }
        this.options.yAxis[0].data = category
      },
      applyToChart (rankData) {
        let [users, seriesData] = [[], []]
        rankData.forEach(rank => {
          users.push(rank.user.username)
          let info = rank.submission_info
          // 提取出已AC题目的时间
          let timeData = []
          Object.keys(info).forEach(problemID => {
            if (info[problemID].is_ac) {
              timeData.push(info[problemID].ac_time)
            }
          })
          timeData.sort((a, b) => {
            return a - b
          })

          let data = []
          data.push([this.contest.start_time, 0])
          // index here can be regarded as stacked accepted number count.
          for (let [index, value] of timeData.entries()) {
            let realTime = moment(this.contest.start_time).add(value, 'seconds').format()
            data.push([realTime, index + 1])
          }
          seriesData.push({
            name: rank.user.username,
            type: 'line',
            data
          })
        })
        this.options.legend.data = users
        this.options.series = seriesData
      },
      applyToTable (data) {
        // deepcopy
        let dataRank = JSON.parse(JSON.stringify(data))
        // 从submission_info中取出相应的problem_id 放入到父object中,这么做主要是为了适应iview table的data格式
        // 见https://www.iviewui.com/components/table
        dataRank.forEach((rank, i) => {
          let info = rank.submission_info
          let cellClass = {}
          Object.keys(info).forEach(problemID => {
            dataRank[i][problemID] = info[problemID]
            dataRank[i][problemID].ac_time = time.secondFormat(dataRank[i][problemID].ac_time)
            let status = info[problemID]
            if (status.is_first_ac) {
              cellClass[problemID] = 'first-ac'
            } else if (status.is_ac) {
              cellClass[problemID] = 'ac'
            } else {
              cellClass[problemID] = 'wa'
            }
          })
          dataRank[i].cellClassName = cellClass
        })
        this.dataRank = dataRank
      },
      addTableColumns (problems) {
        // 根据题目添加table column
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
              if (params.row[problem.id]) {
                let status = params.row[problem.id]
                let acTime, errorNumber
                if (status.is_ac) {
                  acTime = h('span', status.ac_time)
                }
                if (status.error_number !== 0) {
                  errorNumber = h('p', '(-' + status.error_number + ')')
                }
                return h('div', [acTime, errorNumber])
              }
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
    margin: 30px auto 0 auto;
    height: 350px;
    width: 95%;
  }

  #switches {
    span {
      margin-left: 5px;
    }
  }
</style>
