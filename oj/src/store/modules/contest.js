import types from '../types'
import api from '@/api'

const state = {
  contest: {
    created_by: {}
  },
  contestProblems: [],
  contestMenuVisible: true
}

const getters = {
  contestMenuDisabled: (state, getters) => {
    return state.contest.status === '1' &&
      state.contest.created_by.id !== getters.user.id
  },
  problemSubmitDisabled: (state, getters) => {
    return state.contest.status &&
      state.contest.status !== '0' &&
      state.contest.created_by.id !== getters.user.id
  }
}

const mutations = {
  [types.CHANGE_CONTEST](state, payload) {
    state.contest = payload.contest
  },
  [types.CHANGE_CONTEST_MENU_VISIBLE](state, payload) {
    state.contestMenuVisible = payload.visible
  },
  [types.CHANGE_CONTEST_PROBLEMS](state, payload) {
    state.contestProblems = payload.contestProblems
  }
}

const actions = {
  getContest({commit, rootState}) {
    return new Promise((resolve, reject) => {
      api.getContest(rootState.route.params.contestID).then((res) => {
        commit(types.CHANGE_CONTEST, {contest: res.data.data})
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },
  getContestProblems({commit, rootState}) {
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
