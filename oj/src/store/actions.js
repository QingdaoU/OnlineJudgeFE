import api from '@/api'
import types from './types'

export default {
  getWebsiteConfig({commit}) {
    api.getWebsiteConf().then(res => {
      commit(types.UPDATE_WEBSITE_CONF, {
        websiteConfig: res.data.data
      })
    })
  },
  changeModalStatus({commit}, payload) {
    commit(types.CHANGE_MODAL_STATUS, payload)
  }
}
