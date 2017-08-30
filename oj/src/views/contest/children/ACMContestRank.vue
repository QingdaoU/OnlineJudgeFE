<template>
  <Panel shadow>
    <div slot="title">{{ contest.title }}</div>
    <div slot="extra">
      <Poptip trigger="hover" placement="left-start">
        <Icon type="android-settings" size="20"></Icon>
        <div slot="content" id="switchs">
          <span>Menu</span>
          <i-switch v-model="showMenu" @on-change="handleMenuSwitch"></i-switch>
          <span>Chart</span>
          <i-switch v-model="showChart"></i-switch>
        </div>
      </Poptip>
    </div>
    <div v-if="showChart" class="echarts">
      <ECharts :options="options" ref="chart" auto-resize></ECharts>
    </div>
    <Table ref="tableRank" :columns="columns" :data="dataRank" disabled-hover></Table>
    <Pagination :total="total" :page-size=limit @on-change="getContestRankData" show-sizer></Pagination>
  </Panel>
</template>
<script>
  import Pagination from '~/Pagination'

  import api from '@/api'
  import bus from '@/utils/eventBus'
  import storage from '@/utils/storage'
  import {STORAGE_KEY} from '@/utils/consts'
  import time from '@/utils/time'
  import utils from '@/utils/utils'

  const limit = 10
  const chartData = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['AC', 'Total']
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
        data: ['root']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'AC',
        type: 'bar',
        data: [0],
        markPoint: {
          data: [
            {type: 'max', name: 'max'}
          ]
        }
      },
      {
        name: 'Total',
        type: 'bar',
        data: [0],
        markPoint: {
          data: [
            {type: 'max', name: 'max'}
          ]
        }
      }
    ]
  }

  export default {
    name: 'acm-contest-rank',
    components: {
      Pagination
    },
    data() {
      return {
        limit: limit,
        total: 0,
        showMenu: true,
        showChart: true,
        contestID: '',
        contest: '',
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
              return h('span', params.row.user.username)
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
        options: chartData
      }
    },
    mounted() {
      this.contestID = this.$route.params.contestID
      this.getContestAndProblems(this.contestID)
      this.getContestRankData(1)
    },
    methods: {
      handleMenuSwitch() {
        bus.$emit('update:menuVisible', this.showMenu)
      },
      getContestRankData(page) {
        let offset = (page - 1) * limit
        this.$refs.chart.showLoading({maskColor: 'rgba(250, 250, 250, 0.8)'})
        api.getContestRank(offset, limit, this.$route.params.contestID).then(res => {
          this.$refs.chart.hideLoading()
          this.total = res.data.data.total
          if (page === 1) {
            this.applyToChart(res.data.data.results.slice(0, 10))
          }
          this.applyToTable(res.data.data.results)
        })
      },
      getContestAndProblems(contestID) {
        // 优先从localStorage中读取
        this.contest = utils.loadContest(this.contestID)
        let problems = storage.get(STORAGE_KEY.contestProblems + this.contestID)
        if (problems === null) {
          api.getContestProblemList(this.contestID).then(res => {
            problems = res.data.data
            this.addTableColumns(problems)
          }, _ => {
          })
        } else {
          this.addTableColumns(problems)
        }
      },
      applyToChart(data) {
        let [usernames, acData, totalData] = [[], [], []]
        data.forEach(rank => {
          usernames.push(rank.user.username)
          acData.push(rank.accepted_number)
          totalData.push(rank.submission_number)
        })
        this.options.xAxis[0].data = usernames
        this.options.series[0].data = acData
        this.options.series[1].data = totalData
      },
      applyToTable(data) {
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
      addTableColumns(problems) {
        let alphaCode = 65
        problems.forEach(ele => {
          // 生成problem对应的字母 并以此为title作为一个column添加到table中
          let problemChar = String.fromCharCode(alphaCode)
          alphaCode += 1
          this.columns.push({
            title: ele._id,
            align: 'center',
            key: ele._id,
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
                        problemID: ele._id
                      }
                    })
                  }
                }
              }, problemChar)
            },
            render: (h, params) => {
              if (params.row[ele._id]) {
                let status = params.row[ele._id]
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
      }
    },
    watch: {
      'showMenu'(newVal) {
        if (this.showChart) {
          this.$refs.chart.resize()
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .echarts {
    margin: 30px auto 0 auto;
    height: 300px;
    width: 100%;
  }

  .pannel-extra {
    #switchs {
      span {
        margin-left: 8px;
      }
    }
  }
</style>
