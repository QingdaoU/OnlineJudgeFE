<template>
  <panel shadow>
    <div slot="title">ACM Helper</div>
    <div slot="extra">
      <ul class="filter">
        <li>
          Auto Refresh(10s)
          <i-switch style="margin-left: 5px;" @on-change="handleAutoRefresh"></i-switch>
        </li>
        <li>
          <Button type="info" @click="getACInfo">Refresh</Button>
        </li>
      </ul>
    </div>
    <Table :data="pagedAcInfo" :columns="columns" :loading="loadingTable" disabled-hover></Table>
    <pagination :total="total"
                :page-size.sync="limit"
                :current.sync="page"
                @on-change="handlePage"
                @on-page-size-change="handlePage(1)"
                show-sizer></pagination>
  </panel>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { types } from '../../../../../store'
  import moment from 'moment'
  import Pagination from '@oj/components/Pagination.vue'
  import api from '@oj/api'

  export default {
    name: 'acm-helper',
    components: {
      Pagination
    },
    data () {
      return {
        page: 1,
        total: 0,
        loadingTable: false,
        columns: [
          {
            title: 'AC Time',
            key: 'ac_time'
          },
          {
            title: 'ProblemID',
            align: 'center',
            key: 'problem_display_id'
          },
          {
            title: 'First Blood',
            align: 'center',
            render: (h, {row}) => {
              if (row.ac_info.is_first_ac) {
                return h('Tag', {
                  props: {
                    color: 'red'
                  }
                }, 'First Blood')
              } else {
                return h('span', '----')
              }
            }
          },
          {
            title: 'Username',
            align: 'center',
            render: (h, {row}) => {
              return h('a', {
                style: {
                  display: 'inline-block',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'contest-submission-list',
                      query: {username: row.username}
                    })
                  }
                }
              }, row.username)
            }
          },
          {
            title: 'RealName',
            align: 'center',
            render: (h, {row}) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  'max-width': '150px'
                }
              }, row.real_name)
            }
          },
          {
            title: 'Status',
            align: 'center',
            render: (h, {row}) => {
              return h('Tag', {
                props: {
                  color: row.checked ? 'green' : 'yellow'
                }
              }, row.checked ? 'Checked' : 'Not Checked')
            }
          },
          {
            title: 'Option',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (h, {row}) => {
              return h('Button', {
                props: {
                  type: 'ghost',
                  size: 'small',
                  icon: 'checkmark',
                  disabled: row.checked
                },
                on: {
                  click: () => {
                    this.updateCheckedStatus(row)
                  }
                }
              }, 'Check It')
            }
          }
        ],
        acInfo: [],
        pagedAcInfo: [],
        problemsMap: []
      }
    },
    mounted () {
      this.contestID = this.$route.params.contestID
      if (this.contestProblems.length === 0) {
        this.getContestProblems().then((res) => {
          this.mapProblemDisplayID()
          this.getACInfo()
        })
      } else {
        this.mapProblemDisplayID()
        this.getACInfo()
      }
    },
    methods: {
      ...mapActions(['getContestProblems']),
      mapProblemDisplayID () {
        let problemsMap = {}
        this.contestProblems.forEach(ele => {
          problemsMap[ele.id] = ele._id
        })
        this.problemsMap = problemsMap
      },
      getACInfo (page = 1) {
        this.loadingTable = true
        let params = {
          contest_id: this.$route.params.contestID
        }
        api.getACMACInfo(params).then(res => {
          this.loadingTable = false
          let data = res.data.data
          this.total = data.length
          this.acInfo = data
          this.handlePage()
        }).catch(() => {
          this.loadingTable = false
        })
      },
      updateCheckedStatus (row) {
        let data = {
          rank_id: row.id,
          contest_id: this.contestID,
          problem_id: row.problem_id,
          checked: true
        }
        api.updateACInfoCheckedStatus(data).then(res => {
          this.$success('Succeeded')
          this.getACInfo()
        }).catch(() => {
        })
      },
      handleAutoRefresh (value) {
        if (value) {
          this.refreshFunc = setInterval(() => {
            this.page = 1
            this.getACInfo()
          }, 10000)
        } else {
          clearInterval(this.refreshFunc)
        }
      },
      handlePage (page = 1) {
        if (page !== 1) {
          this.loadingTable = true
        }
        let pageInfo = this.acInfo.slice((this.page - 1) * this.limit, this.page * this.limit)
        for (let v of pageInfo) {
          if (v.init) {
            continue
          } else {
            v.init = true
            v.problem_display_id = this.problemsMap[v.problem_id]
            v.ac_time = moment(this.contest.start_time).add(v.ac_info.ac_time, 'seconds').local().format('YYYY-M-D  HH:mm:ss')
          }
        }
        this.pagedAcInfo = pageInfo
        this.loadingTable = false
      }
    },
    computed: {
      ...mapState({
        'contest': state => state.contest.contest,
        'contestProblems': state => state.contest.contestProblems
      }),
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
<style lang="less" scoped>

</style>
