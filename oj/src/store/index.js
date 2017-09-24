import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import user from './modules/user'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user
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

export {types} from './types'

