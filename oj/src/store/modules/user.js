import types from '../types'
import api from '@/api'
import storage from '@/utils/storage'
import {STORAGE_KEY} from '@/utils/constants'

const state = {
  profile: {}
}

const getters = {
  user: state => state.profile.user || {},
  profile: state => state.profile,
  isAuthenticated: (state, getters) => {
    return !!getters.user.id
  }
}

const mutations = {
  [types.CHANGE_PROFILE] (state, {profile}) {
    state.profile = profile
    storage.set(STORAGE_KEY.AUTHED, !!profile.user)
  }
}

const actions = {
  getProfile ({commit}) {
    api.getUserInfo().then(res => {
      commit(types.CHANGE_PROFILE, {
        profile: res.data.data || {}
      })
    })
  },
  clearProfile ({commit}) {
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
