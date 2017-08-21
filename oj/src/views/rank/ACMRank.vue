<template>
  <Row type="flex" justify="space-around">
    <Col :span="21">
    <Card :padding="10">
      <div slot="title">
        <span class="title">ACM Ranklist</span>
      </div>
      <div class="echarts">
        <ECharts :options="options" ref="bar" auto-resize></ECharts>
      </div>
    </Card>
    <Table :data="dataRank" :columns="columns" size="large"></Table>
    <Pagination :total="total" :page-size="pageSize" @on-change="getRankData"></Pagination>
    </Col>
  </Row>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts.vue'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/component/markPoint'
  //  import 'echarts/lib/component/axisPointer'
  //  import 'echarts/lib/component/title'

  import api from '@/api'
  import Pagination from '~/Pagination'
  import utils from '@/utils/utils'

  const limit = 10
  const columns = [
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
              console.log('push')
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
      title: 'Rate',
      render: (h, params) => {
        return h('span', utils.getACRate(params.row.accepted_number, params.row.submission_number))
      }
    }
  ]
  export default {
    name: 'acm-rank',
    components: {
      Pagination,
      ECharts
    },
    data() {
      return {
        page: 1,
        pageSize: limit,
        total: 0,
        dataRank: [],
        columns: columns,
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
              restore: {show: true},
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
      initData(res) {
        this.changeCharts(res.data.data.results)
        this.total = res.data.data.total
        this.dataRank = res.data.data.results
      },
      getRankData(page) {
        let offset = (page - 1) * this.pageSize
        let bar = this.$refs.bar
        bar.showLoading({maskColor: 'rgba(250, 250, 250, 0.8)'})
        api.getUserRank(offset, this.pageSize, 'acm').then(res => {
          this.initData(res)
          bar.hideLoading()
        })
      },
      changeCharts(rankData) {
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
    mounted() {
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

  .title {
    font-size: 20px;
    font-weight: 400;
  }
</style>
