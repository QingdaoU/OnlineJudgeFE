import { mapState } from 'vuex'
import { types } from '@oj/store/index'
import { CONTEST_STATUS } from '@/utils/constants'

export default {
  methods: {
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
    refreshDisabled () {
      return this.contest.status === CONTEST_STATUS.ENDED
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
