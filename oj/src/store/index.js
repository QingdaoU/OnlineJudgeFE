import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import user from './modules/user'
import contest from './modules/contest'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    contest
  },
  state: {
    website: {},
    modalStatus: {
      mode: 'login', // or register,
      visible: false
    }
  },
  getters,
  mutations,
  actions,
  strict: debug
})

// import types from './types'
// export
// {
//   types
// }

export {default as types} from './types'
