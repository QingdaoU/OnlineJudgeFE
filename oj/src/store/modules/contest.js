import moment from 'moment'
import types from '../types'
import api from '@/api'
import { CONTEST_STATUS_REVERSE, USER_TYPE } from '@/utils/consts'

const state = {
  now: new Date(),
  contest: {
    created_by: {}
  },
  contestProblems: [],
  contestMenuVisible: true
}

const getters = {
  // contest 是否加载完成
  contestLoaded: (state) => {
    return !!state.contest.status
  },
  contestStatus: (state, getters) => {
    if (!getters.contestLoaded) return null
    let startTime = Date.parse(state.contest.start_time)
    let endTime = Date.parse(state.contest.end_time)
    let now = state.now

    if (startTime > now) {
      return CONTEST_STATUS_REVERSE.NOT_START
    } else if (endTime < now) {
      return CONTEST_STATUS_REVERSE.ENDED
    } else {
      return CONTEST_STATUS_REVERSE.UNDERWAY
    }
  },
  contestRuleType: (state) => {
    return state.contest.rule_type || null
  },
  isContestAdmin: (state, getters, _, rootGetters) => {
    return rootGetters.isAuthenticated &&
      (state.contest.created_by.id === rootGetters.user.id || rootGetters.user.admin_type === USER_TYPE.SUPER_ADMIN)
  },
  contestMenuDisabled: (state, getters) => {
    return getters.contestStatus === CONTEST_STATUS_REVERSE.NOT_START &&
      getters.isContestAdmin
  },
  OIContestRealTimePermission: (state, getters, _, rootGetters) => {
    if (getters.contestRuleType === 'ACM' || getters.contestStatus === CONTEST_STATUS_REVERSE.ENDED) {
      return true
    }
    return state.contest.real_time === true || getters.isContestAdmin
  },
  problemSubmitDisabled: (state, getters, _, rootGetters) => {
    if (getters.contestStatus === CONTEST_STATUS_REVERSE.ENDED) {
      return true
    } else if (getters.contestStatus === CONTEST_STATUS_REVERSE.NOT_START) {
      return getters.isContestAdmin
    }
    return !rootGetters.isAuthenticated
  },
  contestStartTime: (state) => {
    return moment(state.contest.start_time)
  },
  contestEndTime: (state) => {
    return moment(state.contest.end_time)
  },
  countdown: (state, getters) => {
    if (getters.contestStatus === CONTEST_STATUS_REVERSE.NOT_START) {
      let duration = moment.duration(getters.contestStartTime.diff(state.now, 'seconds'), 'seconds')
      // time is too long
      if (duration.weeks() > 0) {
        return 'Start At ' + duration.humanize()
      }
      let texts = [duration.hours(), duration.minutes(), duration.seconds()]
      return '-' + texts.join(':')
    } else if (getters.contestStatus === CONTEST_STATUS_REVERSE.UNDERWAY) {
      let duration = moment.duration(getters.contestEndTime.diff(state.now, 'seconds'), 'seconds')
      let texts = [duration.hours(), duration.minutes(), duration.seconds()]
      return '-' + texts.join(':')
    } else {
      return 'Ended'
    }
  }
}

const mutations = {
  [types.CHANGE_CONTEST] (state, payload) {
    state.contest = payload.contest
  },
  [types.CHANGE_CONTEST_MENU_VISIBLE] (state, payload) {
    state.contestMenuVisible = payload.visible
  },
  [types.CHANGE_CONTEST_PROBLEMS] (state, payload) {
    state.contestProblems = payload.contestProblems
  },
  [types.CLEAR_CONTEST] (state) {
    state.contest = {created_by: {}}
    state.contestProblems = []
  },
  [types.NOW] (state, payload) {
    state.now = payload.now
  }
}

const actions = {
  getContest ({commit, rootState}) {
    return new Promise((resolve, reject) => {
      api.getContest(rootState.route.params.contestID).then((res) => {
        commit(types.CHANGE_CONTEST, {contest: res.data.data})
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },
  getContestProblems ({commit, rootState}) {
    return new Promise((resolve, reject) => {
      api.getContestProblemList(rootState.route.params.contestID).then(res => {
        commit(types.CHANGE_CONTEST_PROBLEMS, {contestProblems: res.data.data})
        resolve(res)
      }, () => {
        commit(types.CHANGE_CONTEST_PROBLEMS, {contestProblems: []})
      })
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
