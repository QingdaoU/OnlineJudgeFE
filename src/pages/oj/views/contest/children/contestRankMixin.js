import api from '@oj/api'
import ScreenFull from '@admin/components/ScreenFull.vue'
import { mapGetters, mapState } from 'vuex'
import { types } from '@/store'
import { CONTEST_STATUS } from '@/utils/constants'

export default {
  components: {
    ScreenFull
  },
  methods: {
    getContestRankData (page = 1, refresh = false) {
      let offset = (page - 1) * this.limit
      if (this.showChart && !refresh) {
        this.$refs.chart.showLoading({maskColor: 'rgba(250, 250, 250, 0.8)'})
      }
      let params = {
        offset,
        limit: this.limit,
        contest_id: this.$route.params.contestID,
        force_refresh: this.forceUpdate ? '1' : '0'
      }
      api.getContestRank(params).then(res => {
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
    handleAutoRefresh (status) {
      if (status === true) {
        this.refreshFunc = setInterval(() => {
          this.page = 1
          this.getContestRankData(1, true)
        }, 10000)
      } else {
        clearInterval(this.refreshFunc)
      }
    }
  },
  computed: {
    ...mapGetters(['isContestAdmin']),
    ...mapState({
      'contest': state => state.contest.contest,
      'contestProblems': state => state.contest.contestProblems
    }),
    showChart: {
      get () {
        return this.$store.state.contest.itemVisible.chart
      },
      set (value) {
        this.$store.commit(types.CHANGE_CONTEST_ITEM_VISIBLE, {chart: value})
      }
    },
    showMenu: {
      get () {
        return this.$store.state.contest.itemVisible.menu
      },
      set (value) {
        this.$store.commit(types.CHANGE_CONTEST_ITEM_VISIBLE, {menu: value})
        this.$nextTick(() => {
          if (this.showChart) {
            this.$refs.chart.resize()
          }
          this.$refs.tableRank.handleResize()
        })
      }
    },
    showRealName: {
      get () {
        return this.$store.state.contest.itemVisible.realName
      },
      set (value) {
        this.$store.commit(types.CHANGE_CONTEST_ITEM_VISIBLE, {realName: value})
        if (value) {
          this.columns.splice(2, 0, {
            title: 'RealName',
            align: 'center',
            width: 150,
            render: (h, {row}) => {
              return h('span', row.user.real_name)
            }
          })
        } else {
          this.columns.splice(2, 1)
        }
      }
    },
    forceUpdate: {
      get () {
        return this.$store.state.contest.forceUpdate
      },
      set (value) {
        this.$store.commit(types.CHANGE_RANK_FORCE_UPDATE, {value: value})
      }
    },
    limit: {
      get () {
        return this.$store.state.contest.rankLimit
      },
      set (value) {
        this.$store.commit(types.CHANGE_CONTEST_RANK_LIMIT, {rankLimit: value})
      }
    },
    refreshDisabled () {
      return this.contest.status === CONTEST_STATUS.ENDED
    }
  },
  beforeDestroy () {
    clearInterval(this.refreshFunc)
  }
}
