<template>
  <Table :columns="columns" :data="dataRank" disabled-hover></Table>
</template>
<script>
  import api from '@/api'
  import storage from '@/utils/storage'
  import {STORAGE_KEY} from '@/utils/consts'
  import time from '@/utils/time'

  const limit = 10

  export default {
    name: 'acm-contest-rank',
    data() {
      return {
        limit: limit,
        page: 0,
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
        dataRank: []
      }
    },
    mounted() {
      this.contestID = this.$route.params.contestID
      this.getContestProblems(this.contestID)
      this.getContestRankData(1)
    },
    methods: {
      getContestRankData(page) {
        let offset = (page - 1) * limit
        api.getContestRank(offset, limit, this.$route.params.contestID).then(res => {
          console.log(res.data.data)
          this.total = res.data.data.total
          this.applyToTable(res.data.data)
        })
      },
      getContestProblems(contestID) {
        // 优先从localStorage中读取problems
        let problems = storage.get(STORAGE_KEY.contestProblems + this.contestID)
        if (problems === null) {
          api.getContestProblemList(this.contestID).then(res => {
            problems = res.data.data
            this.addProblemColumns(problems)
          }, _ => {
          })
        } else {
          this.addProblemColumns(problems)
        }
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
        console.log(dataRank)
        this.dataRank = dataRank
      },
      addProblemColumns(problems) {
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
    }
  }
</script>

<style lang="less">
  .ivu-table td {
    border-bottom-color: #dadada;
  }
  .ivu-table .first-ac {
    background-color: #33CC99;
    color: #3c763d;
  }

  .ivu-table .ac {
    background-color: #dff0d8;;
    color: #3c763d;
  }

  .ivu-table .wa {
    color: #a94442;
    background-color: #f2dede;
  }
</style>
