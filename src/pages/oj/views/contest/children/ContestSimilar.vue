<template>
  <Panel shadow>
    <div slot="title">Contest Similar</div>
    <div slot="extra">
      <ul class="filter">
        <li>
          <Button v-if="showgetSimilarListButton" type="warning" @click="getSimilarList">Run Similar</Button>
        </li>
      </ul>
    </div>
    <Table :data="DispSimilarInfo" :columns="columns" :loading="loadingTable" disabled-hover></Table>
    <pagination :total="total"
                :page-size.sync="limit"
                :current.sync="page"
                @on-change="handlePage"
                @on-page-size-change="handlePage(1)"
                show-sizer></pagination>
  </Panel>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {USER_TYPE} from '@/utils/constants'
  import Pagination from '@oj/components/Pagination.vue'
  import api from '@oj/api'
  import {types} from '../../../../../store'

  export default {
    name: 'ContestSimilar',
    components: {
      Pagination
    },
    data () {
      return {
        page: 1,
        total: 0,
        loadingTable: false,
        SimilarInfo: [],
        DispSimilarInfo: [],
        contestID: '',
        columns: [
          {
            renderHeader: (h) => {
              return h('a', {
                style: {
                  display: 'inline-block',
                  color: '#495060',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.sortByKey(this.SimilarInfo, 'problem_id', 0)
                    this.showSimilarList()
                  }
                }
              }, 'Problem')
            },
            align: 'center',
            render: (h, {row}) => {
              return h('a', {
                style: {
                  color: '#495060',
                  display: 'inline-block',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.$router.push(
                      {
                        name: 'contest-problem-details',
                        params: {problemID: row.problem_id, contestID: this.contestID}
                      })
                  }
                }
              }, row.problem_id)
            }
          },
          {
            renderHeader: (h) => {
              return h('a', {
                style: {
                  display: 'inline-block',
                  color: '#495060',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.sortByKey(this.SimilarInfo, 'user_a', 0)
                    this.showSimilarList()
                  }
                }
              }, 'Username A')
            },
            align: 'center',
            render: (h, {row}) => {
              return h('a', {
                style: {
                  display: 'inline-block',
                  color: '#495060',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'contest-submission-list',
                      query: {username: row.user_a}
                    })
                  }
                }
              }, row.user_a)
            }
          },
          {
            title: 'Submission A',
            align: 'center',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#57a3f3',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$router.push('/status/' + params.row.submission_a)
                  }
                }
              }, params.row.submission_a.slice(0, 12))
            }
          },
          {
            renderHeader: (h) => {
              return h('a', {
                style: {
                  display: 'inline-block',
                  color: '#495060',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.sortByKey(this.SimilarInfo, 'user_b', 0)
                    this.showSimilarList()
                  }
                }
              }, 'Username B')
            },
            align: 'center',
            render: (h, {row}) => {
              return h('a', {
                style: {
                  display: 'inline-block',
                  color: '#495060',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'contest-submission-list',
                      query: {username: row.user_b}
                    })
                  }
                }
              }, row.user_b)
            }
          },
          {
            title: 'Submission B',
            align: 'center',
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#57a3f3',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$router.push('/status/' + params.row.submission_b)
                  }
                }
              }, params.row.submission_b.slice(0, 12))
            }
          },
          {
            renderHeader: (h) => {
              return h('a', {
                style: {
                  display: 'inline-block',
                  color: '#495060',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.sortByKey(this.SimilarInfo, 'similarity', 1)
                    this.showSimilarList()
                  }
                }
              }, 'Similarity')
            },
            align: 'center',
            render: (h, {row}) => {
              return h('span', String(row.similarity) + '%')
            }
          }
        ]
      }
    },
    methods: {
      getSimilarList () {
        let params = this.$route.params.contestID
        api.ContestRunCheckSimilar(params).then(
          () => this.$success('Successful'),
          () => {}
        )
      },
      showSimilarList () {
        this.loadingTable = true
        this.handlePage()
        this.loadingTable = false
      },
      handlePage (page = 1) {
        if (page !== 1) {
          this.loadingTable = true
        }
        let pageInfo = this.SimilarInfo.slice((this.page - 1) * this.limit, this.page * this.limit)
        for (let v of pageInfo) {
          if (v.init) {
          } else {
            v.init = true
          }
        }
        this.DispSimilarInfo = pageInfo
        this.loadingTable = false
      },
      sortByKey (array, key, desc) {
        array.sort(function (a, b) {
          let x = a[key]
          let y = b[key]
          return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        })
        if (desc === 1) {
          array.reverse()
        }
        return array
      }
    },
    computed: {
      ...mapGetters(
        ['user']
      ),
      showgetSimilarListButton () {
        return this.user.admin_type === USER_TYPE.SUPER_ADMIN
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
    mounted () {
      this.contestID = this.$route.params.contestID
      api.ContestGetSimilarList(this.contestID).then(res => {
        let data = res.data.data
        let ranges = []
        for (let v of data.similarity_check_result) {
          if (v['user_a'][0] !== '*' && v['user_b'][0] !== '*' && v['user_a'] !== 'root' && v['user_b'] !== 'root') {
            ranges.push(v)
          }
        }
        this.sortByKey(ranges, 'similarity', 1)
        this.SimilarInfo = ranges
        this.total = ranges.length
        this.showSimilarList()
      }, () => {}
      )
    },
    beforeDestroy () {
      clearInterval(this.refreshFunc)
    }
  }
</script>

<style scoped>
</style>
