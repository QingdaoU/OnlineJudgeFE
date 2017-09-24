import types from '../types'
import api from '@/api'

const state = {
  profile: {}
}

const getters = {
  user: state => state.profile.user || null,
  username: (state, getters) => {
    return getters.user && getters.user.username
  },
  isAuthenticated: (state, getters) => {
    return !!getters.user
  }
}

const mutations = {
  [types.CHANGE_PROFILE](state, {profile}) {
    state.profile = profile
  }
}

const actions = {
  getProfile({commit}) {
    api.getUserInfo().then(res => {
      commit(types.CHANGE_PROFILE, {
        profile: res.data.data
      })
    })
  },
  clearProfile({commit}) {
    commit(types.CHANGE_PROFILE, {
      profile: {}
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

