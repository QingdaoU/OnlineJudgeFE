<template>
  <Row type="flex" justify="space-around">
    <Col :span="22">
    <Panel :padding="10">
      <div slot="title">ACM Ranklist</div>
      <div class="echarts">
        <ECharts :options="options" ref="chart" auto-resize></ECharts>
      </div>
    </Panel>
    <Table :data="dataRank" :columns="columns" size="large"></Table>
    <Pagination :total="total" :page-size="limit" @on-change="getRankData"></Pagination>
    </Col>
  </Row>
</template>

<script>
  import api from '@/api'
  import Pagination from '~/Pagination'
  import utils from '@/utils/utils'
  import {RULE_TYPE} from '@/utils/constants'

  const limit = 10

  export default {
    name: 'acm-rank',
    components: {
      Pagination
    },
    data () {
      return {
        page: 1,
        limit: limit,
        total: 0,
        dataRank: [],
        columns: [
          {
            type: 'index',
            align: 'center',
            width: 60
          },
          {
            title: 'user',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#57a3f3'
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
            title: 'mood',
            align: 'center',
            key: 'mood'
          },
          {
            title: 'AC',
            align: 'center',
            key: 'accepted_number'
          },
          {
            title: 'Total',
            align: 'center',
            key: 'submission_number'
          },
          {
            title: 'Rating',
            render: (h, params) => {
              return h('span', utils.getACRate(params.row.accepted_number, params.row.submission_number))
            }
          }
        ],
        options: {
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
      }
    },
    methods: {
      initData (res) {
        this.changeCharts(res.data.data.results)
        this.total = res.data.data.total
        this.dataRank = res.data.data.results
      },
      getRankData (page) {
        let offset = (page - 1) * this.limit
        let bar = this.$refs.chart
        bar.showLoading({maskColor: 'rgba(250, 250, 250, 0.8)'})
        api.getUserRank(offset, this.limit, RULE_TYPE.ACM).then(res => {
          this.initData(res)
          bar.hideLoading()
        })
      },
      changeCharts (rankData) {
        let [usernames, acData, totalData] = [[], [], []]
        rankData.forEach(ele => {
          usernames.push(ele.user.username)
          acData.push(ele.accepted_number)
          totalData.push(ele.submission_number)
        })
        this.options.xAxis[0].data = usernames
        this.options.series[0].data = acData
        this.options.series[1].data = totalData
      }
    },
    mounted () {
      this.getRankData(1)
    }
  }
</script>

<style scoped lang="less">
  .echarts {
    margin: 0 auto;
    width: 95%;
    height: 400px;
  }
</style>
